import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthData = {
  __typename?: 'AuthData';
  citizenId: Scalars['ID'];
  token: Scalars['String'];
  tokenExpiration: Scalars['Int'];
};

export type Citizen = {
  __typename?: 'Citizen';
  currentName: Name;
  email: Scalars['String'];
  id: Scalars['ID'];
  password?: Maybe<Scalars['String']>;
  pastNames: Array<Name>;
};

export type CitizenInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Name = {
  __typename?: 'Name';
  citizen: Citizen;
  endDate?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  startDate?: Maybe<Scalars['String']>;
};

export type NameInput = {
  name: Scalars['String'];
};

export type NamesOutputResponse = {
  __typename?: 'NamesOutputResponse';
  endDate?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  startDate: Scalars['String'];
};

export type RootMutation = {
  __typename?: 'RootMutation';
  createCitizen: Citizen;
  createName: Name;
  deleteCitizens?: Maybe<Scalars['Boolean']>;
  deleteNames?: Maybe<Scalars['Boolean']>;
  login: AuthData;
  logout?: Maybe<Scalars['Boolean']>;
};


export type RootMutationCreateCitizenArgs = {
  citizenInput: CitizenInput;
};


export type RootMutationCreateNameArgs = {
  nameInput: NameInput;
};


export type RootMutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RootQuery = {
  __typename?: 'RootQuery';
  citizens: Array<Citizen>;
  expiringNames: Array<NamesOutputResponse>;
  getCitizen: Citizen;
};


export type RootQueryGetCitizenArgs = {
  id: Scalars['ID'];
};

export type CitizensQueryVariables = Exact<{ [key: string]: never; }>;


export type CitizensQuery = { __typename?: 'RootQuery', citizens: Array<{ __typename?: 'Citizen', id: string, currentName: { __typename?: 'Name', id: string, name: string } }> };

export type CreateNameMutationVariables = Exact<{
  nameInput: NameInput;
}>;


export type CreateNameMutation = { __typename?: 'RootMutation', createName: { __typename?: 'Name', id: string, name: string, startDate?: Maybe<string>, endDate?: Maybe<string>, citizen: { __typename?: 'Citizen', id: string, email: string, currentName: { __typename?: 'Name', name: string, id: string }, pastNames: Array<{ __typename?: 'Name', id: string, name: string, endDate?: Maybe<string>, startDate?: Maybe<string> }> } } };

export type ExpiringNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type ExpiringNamesQuery = { __typename?: 'RootQuery', expiringNames: Array<{ __typename?: 'NamesOutputResponse', id: string, name: string, startDate: string, endDate?: Maybe<string> }> };

export type GetCitizenQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetCitizenQuery = { __typename?: 'RootQuery', getCitizen: { __typename?: 'Citizen', id: string, email: string, currentName: { __typename?: 'Name', name: string, id: string }, pastNames: Array<{ __typename?: 'Name', id: string, name: string, endDate?: Maybe<string>, startDate?: Maybe<string> }> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'RootMutation', login: { __typename?: 'AuthData', citizenId: string, tokenExpiration: number, token: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'RootMutation', logout?: Maybe<boolean> };

export type CreateCitizenMutationVariables = Exact<{
  citizenInput: CitizenInput;
}>;


export type CreateCitizenMutation = { __typename?: 'RootMutation', createCitizen: { __typename?: 'Citizen', id: string, email: string, currentName: { __typename?: 'Name', id: string, name: string, startDate?: Maybe<string>, endDate?: Maybe<string> } } };


export const CitizensDocument = gql`
    query Citizens {
  citizens {
    id
    currentName {
      id
      name
    }
  }
}
    `;

/**
 * __useCitizensQuery__
 *
 * To run a query within a React component, call `useCitizensQuery` and pass it any options that fit your needs.
 * When your component renders, `useCitizensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCitizensQuery({
 *   variables: {
 *   },
 * });
 */
export function useCitizensQuery(baseOptions?: Apollo.QueryHookOptions<CitizensQuery, CitizensQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CitizensQuery, CitizensQueryVariables>(CitizensDocument, options);
      }
export function useCitizensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CitizensQuery, CitizensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CitizensQuery, CitizensQueryVariables>(CitizensDocument, options);
        }
export type CitizensQueryHookResult = ReturnType<typeof useCitizensQuery>;
export type CitizensLazyQueryHookResult = ReturnType<typeof useCitizensLazyQuery>;
export type CitizensQueryResult = Apollo.QueryResult<CitizensQuery, CitizensQueryVariables>;
export const CreateNameDocument = gql`
    mutation CreateName($nameInput: NameInput!) {
  createName(nameInput: $nameInput) {
    id
    name
    startDate
    endDate
    citizen {
      id
      email
      currentName {
        name
        id
      }
      pastNames {
        id
        name
        endDate
        startDate
      }
    }
  }
}
    `;
export type CreateNameMutationFn = Apollo.MutationFunction<CreateNameMutation, CreateNameMutationVariables>;

/**
 * __useCreateNameMutation__
 *
 * To run a mutation, you first call `useCreateNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNameMutation, { data, loading, error }] = useCreateNameMutation({
 *   variables: {
 *      nameInput: // value for 'nameInput'
 *   },
 * });
 */
export function useCreateNameMutation(baseOptions?: Apollo.MutationHookOptions<CreateNameMutation, CreateNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNameMutation, CreateNameMutationVariables>(CreateNameDocument, options);
      }
export type CreateNameMutationHookResult = ReturnType<typeof useCreateNameMutation>;
export type CreateNameMutationResult = Apollo.MutationResult<CreateNameMutation>;
export type CreateNameMutationOptions = Apollo.BaseMutationOptions<CreateNameMutation, CreateNameMutationVariables>;
export const ExpiringNamesDocument = gql`
    query ExpiringNames {
  expiringNames {
    id
    name
    startDate
    endDate
  }
}
    `;

/**
 * __useExpiringNamesQuery__
 *
 * To run a query within a React component, call `useExpiringNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExpiringNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExpiringNamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useExpiringNamesQuery(baseOptions?: Apollo.QueryHookOptions<ExpiringNamesQuery, ExpiringNamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExpiringNamesQuery, ExpiringNamesQueryVariables>(ExpiringNamesDocument, options);
      }
export function useExpiringNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExpiringNamesQuery, ExpiringNamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExpiringNamesQuery, ExpiringNamesQueryVariables>(ExpiringNamesDocument, options);
        }
export type ExpiringNamesQueryHookResult = ReturnType<typeof useExpiringNamesQuery>;
export type ExpiringNamesLazyQueryHookResult = ReturnType<typeof useExpiringNamesLazyQuery>;
export type ExpiringNamesQueryResult = Apollo.QueryResult<ExpiringNamesQuery, ExpiringNamesQueryVariables>;
export const GetCitizenDocument = gql`
    query GetCitizen($id: ID!) {
  getCitizen(id: $id) {
    id
    email
    currentName {
      name
      id
    }
    pastNames {
      id
      name
      endDate
      startDate
    }
  }
}
    `;

/**
 * __useGetCitizenQuery__
 *
 * To run a query within a React component, call `useGetCitizenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCitizenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCitizenQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCitizenQuery(baseOptions: Apollo.QueryHookOptions<GetCitizenQuery, GetCitizenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCitizenQuery, GetCitizenQueryVariables>(GetCitizenDocument, options);
      }
export function useGetCitizenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCitizenQuery, GetCitizenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCitizenQuery, GetCitizenQueryVariables>(GetCitizenDocument, options);
        }
export type GetCitizenQueryHookResult = ReturnType<typeof useGetCitizenQuery>;
export type GetCitizenLazyQueryHookResult = ReturnType<typeof useGetCitizenLazyQuery>;
export type GetCitizenQueryResult = Apollo.QueryResult<GetCitizenQuery, GetCitizenQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    citizenId
    tokenExpiration
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const CreateCitizenDocument = gql`
    mutation CreateCitizen($citizenInput: CitizenInput!) {
  createCitizen(citizenInput: $citizenInput) {
    id
    email
    currentName {
      id
      name
      startDate
      endDate
    }
  }
}
    `;
export type CreateCitizenMutationFn = Apollo.MutationFunction<CreateCitizenMutation, CreateCitizenMutationVariables>;

/**
 * __useCreateCitizenMutation__
 *
 * To run a mutation, you first call `useCreateCitizenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCitizenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCitizenMutation, { data, loading, error }] = useCreateCitizenMutation({
 *   variables: {
 *      citizenInput: // value for 'citizenInput'
 *   },
 * });
 */
export function useCreateCitizenMutation(baseOptions?: Apollo.MutationHookOptions<CreateCitizenMutation, CreateCitizenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCitizenMutation, CreateCitizenMutationVariables>(CreateCitizenDocument, options);
      }
export type CreateCitizenMutationHookResult = ReturnType<typeof useCreateCitizenMutation>;
export type CreateCitizenMutationResult = Apollo.MutationResult<CreateCitizenMutation>;
export type CreateCitizenMutationOptions = Apollo.BaseMutationOptions<CreateCitizenMutation, CreateCitizenMutationVariables>;