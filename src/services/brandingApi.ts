import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponseType } from '../types/api/apiResponses';
import { BrandingConfig } from '../types/branding';
import baseQueryWithReauth from './baseQueryWithReauth';

export const brandingApi = createApi({
  reducerPath: 'brandingApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Branding'],
  endpoints: (builder) => ({
    getBranding: builder.query<ApiResponseType<BrandingConfig>, void>({
      query: () => '/branding',
      providesTags: ['Branding'],
    }),
    updateBranding: builder.mutation<
      ApiResponseType<BrandingConfig>,
      Partial<BrandingConfig>
    >({
      query: (body) => ({
        url: '/branding',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Branding'],
    }),
    uploadAsset: builder.mutation<
      ApiResponseType<BrandingConfig>,
      {
        type:
          | 'logo'
          | 'icon'
          | 'splash'
          | 'favicon'
          | 'defaultImage'
          | 'slider';
        file: FormData;
      }
    >({
      query: ({ type, file }) => ({
        url: `/branding/assets/${type}`,
        method: 'POST',
        body: file,
      }),
      invalidatesTags: ['Branding'],
    }),
    removeSliderImage: builder.mutation<
      ApiResponseType<BrandingConfig>,
      number
    >({
      query: (index) => ({
        url: `/branding/slider/${index}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Branding'],
    }),
  }),
});

export const {
  useGetBrandingQuery,
  useUpdateBrandingMutation,
  useUploadAssetMutation,
  useRemoveSliderImageMutation,
} = brandingApi;
