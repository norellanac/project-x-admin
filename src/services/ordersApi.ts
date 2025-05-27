import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './baseQueryWithReauth';
import { ApiResponseType } from '../types/api/apiResponses';

// order status constants
// 1: requested, 2: in progress, 3: completed, 4: cancelled, 5: refunded, 6: failed, 7: reviewed

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getOrders: builder.query<ApiResponseType<[]>, void>({
      query: () => 'orders/',
    }),
    createOrder: builder.mutation({
        query: (body) => ({
          url: 'orders/',
          method: 'POST',
          body,
        }),
      }),
    updateOrder: builder.mutation({
      query: ({ orderId, status }: { orderId: number; status: number }) => ({
        url: `orders/${orderId}/`,
        method: 'PUT',
        body: { status }, // Ensure the status is sent in the body
      }),
    }),
  }),
});

export const {
    useGetOrdersQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
} = ordersApi;