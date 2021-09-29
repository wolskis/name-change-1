import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error';
import { ApolloLink, Observable } from 'apollo-link'
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from 'jwt-decode';
import { getAccessToken, setAccessToken, getCitizenId } from './context';
import { customHistory  } from './history';

const useClient =  () => {
const citizenId = getCitizenId()
    const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable((observer) => {
        let handle: any;
        Promise.resolve(operation)
          .then(operation => {
            const token = getAccessToken()
            if (token) {
              operation.setContext({
                headers: {
                  authorization: `bearer ${token}`
                }
              });
            }
          })
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer)
            });
          })
          .catch(observer.error.bind(observer));
  
        return () => {
          if (handle) handle.unsubscribe();
        }
      })
  )
  
  const tokenRefreshLink: any = new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
      const token = getAccessToken();
      if (!token) {
        return true;
      }
      try {
        const { expiration }: any = jwtDecode(token);
        if (Date.now() >= expiration * 1000) {
          return false;
        } else {
          return true;
        }
      } catch (error) {
        return false;
      }
    },
    fetchAccessToken: () => {
      return fetch('http://localhost:4000/refresh_token', {
        credentials: 'include',
        method: 'POST',
      });
    },
    handleFetch: accessToken => {
      // set the access token
      setAccessToken(accessToken);
    },
    handleError: err => {
      console.warn('Your refresh token is invalid. Try to re-login');
      console.error(err);
    }
  })
  
  const client = new ApolloClient({
    link: ((ApolloLink.from([
      tokenRefreshLink,
      onError(({ graphQLErrors, networkError, operation }) => {
        graphQLErrors?.map(error => {
          if (error.message) {
           alert(error.message)
           return null
          }
          return null
        })
        if (networkError) {
          if (operation.operationName === 'CreateName')
          customHistory.push(`/my-name/${citizenId}`)

          if (operation.operationName === 'CreateCitizen')
          customHistory.push(`/register`)
        }
        console.log('graphql',graphQLErrors);
        console.log('network',networkError);
      }),
      requestLink,
      new HttpLink({
        uri: "http://localhost:4000/graphql",
        credentials: "include"
      })
    ])) as any),
    cache: new InMemoryCache({})
  })
  
  return [client]
}

export { useClient }
