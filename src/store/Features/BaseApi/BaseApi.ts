import { createApi } from '@reduxjs/toolkit/query/react'
import { logout, setUser } from '@/store/Slices/AuthSlice/authSlice'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
const baseQuery = fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
    })

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery('/refreshToken', api, extraOptions)
    if (refreshResult.data) {
      // store the new token
      api.dispatch(setUser(refreshResult.data))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }
  return result
}

const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery : baseQueryWithReauth,
    endpoints: () => ({})
})

export default baseApi