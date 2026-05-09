import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { BrandingConfig } from '../../types/branding';

interface BrandingState {
  config: BrandingConfig | null;
}

const initialState: BrandingState = {
  config: null,
};

const brandingSlice = createSlice({
  name: 'branding',
  initialState,
  reducers: {
    setBranding(state, action: PayloadAction<BrandingConfig>) {
      state.config = action.payload;
    },
    clearBranding(state) {
      state.config = null;
    },
  },
});

export const { setBranding, clearBranding } = brandingSlice.actions;
export const selectBranding = (state: RootState) => state.branding;
export default brandingSlice.reducer;
