import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponseType } from '../types/api/apiResponses';
import { BrandingConfig, FieldLabels, IntroSlide, PresetKey } from '../types/branding';
import baseQueryWithReauth from './baseQueryWithReauth';

export const brandingApi = createApi({
  reducerPath: 'brandingApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    updateBranding: builder.mutation<ApiResponseType<BrandingConfig>, Partial<BrandingConfig>>({
      query: (body) => ({ url: '/branding', method: 'PUT', body }),
    }),
    uploadAsset: builder.mutation<
      ApiResponseType<BrandingConfig>,
      { type: 'logo' | 'icon' | 'splash' | 'favicon' | 'defaultImage' | 'slider'; file: FormData }
    >({
      query: ({ type, file }) => ({ url: `/branding/assets/${type}`, method: 'POST', body: file }),
    }),
    uploadIntroSlide: builder.mutation<ApiResponseType<BrandingConfig>, { file: FormData }>({
      query: ({ file }) => ({ url: '/branding/assets/introSlide', method: 'POST', body: file }),
    }),
    updateIntroSlide: builder.mutation<ApiResponseType<BrandingConfig>, { introSlides: IntroSlide[] }>({
      query: (body) => ({ url: '/branding', method: 'PUT', body }),
    }),
    removeSliderImage: builder.mutation<ApiResponseType<BrandingConfig>, number>({
      query: (index) => ({ url: `/branding/slider/${index}`, method: 'DELETE' }),
    }),
    removeIntroSlide: builder.mutation<ApiResponseType<BrandingConfig>, number>({
      query: (index) => ({ url: `/branding/intro-slides/${index}`, method: 'DELETE' }),
    }),
    applyPreset: builder.mutation<ApiResponseType<BrandingConfig>, { preset: PresetKey }>({
      query: (body) => ({ url: '/branding/preset', method: 'POST', body }),
    }),
    updateFieldLabels: builder.mutation<ApiResponseType<BrandingConfig>, { fieldLabels: FieldLabels }>({
      query: (body) => ({ url: '/branding', method: 'PUT', body }),
    }),
  }),
});

export const {
  useUpdateBrandingMutation,
  useUploadAssetMutation,
  useUploadIntroSlideMutation,
  useUpdateIntroSlideMutation,
  useRemoveSliderImageMutation,
  useRemoveIntroSlideMutation,
  useApplyPresetMutation,
  useUpdateFieldLabelsMutation,
} = brandingApi;
