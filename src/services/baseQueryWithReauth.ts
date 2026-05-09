import { fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux/store/store';
import { selectAuth, logout, updateTokens } from '../redux/slices/authSlice';
import { ApiResponseType, LoginResponse } from '../types/api/apiResponses';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const authState = selectAuth(getState() as RootState);
    const token = authState.accessToken;
    if (token) headers.set('Authorization', `${token}`);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const authState = selectAuth(api.getState() as RootState);
    const refreshToken = authState.refreshToken;

    if (refreshToken) {
      // try to get a new token
      const refreshResult = await baseQuery(
        {
          url: 'refresh-token/',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const data = refreshResult.data as ApiResponseType<LoginResponse>;
        if (data.success && data.data) {
          // store the new token
          api.dispatch(updateTokens({
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken
          }));
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } else {
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export default baseQueryWithReauth;