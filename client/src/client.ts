import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error';
import { ApolloLink, Observable } from 'apollo-link'
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from 'jwt-decode';
import { getAccessToken, setAccessToken } from './context';

const useClient =  () => {

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
      // appContext?.setToken(accessToken)
    },
    handleError: err => {
      console.warn('Your refresh token is invalid. Try to re-login');
      console.error(err);
    }
  })
  
  const client = new ApolloClient({
    link: ((ApolloLink.from([
      tokenRefreshLink,
      onError(({ graphQLErrors, networkError }) => {
        graphQLErrors?.map(error => {
          if (error.message) {
            return null
          }
        })
        console.log(graphQLErrors);
        console.log(networkError);
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
// const useClient =  () => {

//   const requestLink = new ApolloLink(
//     (operation, forward) =>
//       new Observable((observer) => {
//         let handle: any;
//         Promise.resolve(operation)
//           .then(operation => {
//             const token = getAccessToken()
//             if (token.token) {
//               operation.setContext({
//                 headers: {
//                   authorization: `bearer ${token.token}`
//                 }
//               });
//             }
//           })
//           .then(() => {
//             handle = forward(operation).subscribe({
//               next: observer.next.bind(observer),
//               error: observer.error.bind(observer),
//               complete: observer.complete.bind(observer)
//             });
//           })
//           .catch(observer.error.bind(observer));
  
//         return () => {
//           if (handle) handle.unsubscribe();
//         }
//       })
//   )
  
//   const tokenRefreshLink: any = new TokenRefreshLink({
//     accessTokenField: "accessToken",
//     isTokenValidOrUndefined: () => {
//       const token = getAccessToken();
//       if (!token.token) {
//         return true;
//       }
//       try {
//         const { expiration }: any = jwtDecode(token.token);
//         if (Date.now() >= expiration * 1000) {
//           return false;
//         } else {
//           return true;
//         }
//       } catch (error) {
//         return false;
//       }
//     },
//     fetchAccessToken: () => {
//       return fetch('http://localhost:4000/refresh_token', {
//         credentials: 'include',
//         method: 'POST',
//       });
//     },
//     handleFetch: accessToken => {
//       // set the access token
//       setAccessToken(accessToken);
//       // appContext?.setToken(accessToken)
//     },
//     handleError: err => {
//       console.warn('Your refresh token is invalid. Try to re-login');
//       console.error(err);
//     }
//   })
  
//   const client = new ApolloClient({
//     link: ((ApolloLink.from([
//       tokenRefreshLink,
//       onError(({ graphQLErrors, networkError }) => {
//         graphQLErrors?.map(error => {
//           if (error.message !== '') {
//             return alert(error.message)
//           }
//         })
//         console.log(graphQLErrors);
//         console.log(networkError);
//       }),
//       requestLink,
//       new HttpLink({
//         uri: "http://localhost:4000/graphql",
//         credentials: "include"
//       })
//     ])) as any),
//     cache: new InMemoryCache({})
//   })
  
//   return [client]
// }

// export { useClient }

// export const requestLink = new ApolloLink(
//   (operation, forward) =>
//     new Observable((observer) => {
//       let handle: any;
//       Promise.resolve(operation)
//         .then(operation => {
//           const accessToken = getAccessToken();
//           if (accessToken) {
//             operation.setContext({
//               headers: {
//                 authorization: `bearer ${accessToken}`
//               }
//             });
//           }
//         })
//         .then(() => {
//           handle = forward(operation).subscribe({
//             next: observer.next.bind(observer),
//             error: observer.error.bind(observer),
//             complete: observer.complete.bind(observer)
//           });
//         })
//         .catch(observer.error.bind(observer));

//       return () => {
//         if (handle) handle.unsubscribe();
//       }
//     })
// )

// const tokenRefreshLink: any = new TokenRefreshLink({
//   accessTokenField: "accessToken",
//   isTokenValidOrUndefined: () => {
//     const token = getAccessToken();
//     if (!token) {
//       return true;
//     }

//     try {
//       const { expiration }: any = jwtDecode(token);
//       if (Date.now() >= expiration * 1000) {
//         return false;
//       } else {
//         return true;
//       }
//     } catch (error) {
//       return false;
//     }
//   },
//   fetchAccessToken: () => {
//     return fetch('http://localhost:4000/refresh_token', {
//       credentials: 'include',
//       method: 'POST',
//     });
//   },
//   handleFetch: accessToken => {
//     // set the access token
//     setAccessToken(accessToken);
//   },
//   handleError: err => {
//     console.warn('Your refresh token is invalid. Try to re-login');
//     console.error(err);
//   }
// })

// export const client = new ApolloClient({
//   link: ((ApolloLink.from([
//     tokenRefreshLink,
//     onError(({ graphQLErrors, networkError }) => {
//       graphQLErrors?.map(error => {
//         if (error.message !== '') {
//           return alert(error.message)
//         }
//       })
//       console.log(graphQLErrors);
//       console.log(networkError);
//     }),
//     requestLink,
//     new HttpLink({
//       uri: "http://localhost:4000/graphql",
//       credentials: "include"
//     })
//   ])) as any),
//   cache: new InMemoryCache({})
// })

