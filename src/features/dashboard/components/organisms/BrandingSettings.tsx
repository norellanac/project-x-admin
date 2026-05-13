import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectBranding, setBranding } from '@/redux/slices/brandingSlice';
import { useUpdateBrandingMutation, useUploadAssetMutation } from '@/services/brandingApi';
import TextAtom from '@/features/components/atoms/TextAtom';
import { AppDispatch } from '@/redux/store/store';
import { useNavigate } from 'react-router-dom';

const BASE_API_URL = (import.meta.env.VITE_BASE_API_URL || '').replace(/\/$/, '');

const BrandingSettings: React.FC = () => {
  const { config, isLoading } = useSelector(selectBranding);
  const dispatch = useDispatch<AppDispatch>();
  const [updateBranding, { isLoading: isUpdating }] = useUpdateBrandingMutation();
  const [uploadAsset, { isLoading: isUploading }] = useUploadAssetMutation();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  const logoSrc = config?.logoUrl
    ? config.logoUrl.startsWith('http')
      ? config.logoUrl
      : `${BASE_API_URL}${config.logoUrl}`
    : null;

  const handleLogoUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const result = await uploadAsset({ type: 'logo', file: formData }).unwrap();
      if (result.data) dispatch(setBranding(result.data));
    } catch {
      // handled silently — full editing in BrandingPage
    }
  };

  const handleColorSave = async (key: 'primary' | 'secondary', value: string) => {
    if (!config) return;
    const updated = {
      colorsLight: { ...config.colorsLight, [key]: value },
    };
    try {
      const result = await updateBranding(updated).unwrap();
      if (result.data) dispatch(setBranding(result.data));
    } catch {
      // handled silently
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <TextAtom variant="headline" size="medium">Branding Overview</TextAtom>
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate('/app/branding')}
          sx={{ textTransform: 'none' }}
        >
          Open full editor
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {/* Logo */}
        <Paper sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Logo</Typography>
          {logoSrc ? (
            <img src={logoSrc} alt="logo" style={{ maxWidth: 160, maxHeight: 80, objectFit: 'contain' }} />
          ) : (
            <Typography variant="body2" color="text.secondary">No logo uploaded</Typography>
          )}
          <Button
            component="label"
            size="small"
            variant="outlined"
            disabled={isUploading}
            sx={{ mt: 1, textTransform: 'none', display: 'block' }}
          >
            {isUploading ? <CircularProgress size={16} /> : 'Change logo'}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.currentTarget.files?.[0];
                if (file) handleLogoUpload(file);
              }}
            />
          </Button>
        </Paper>

        {/* Colors */}
        <Paper sx={{ p: 2, minWidth: 240 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Colors (light theme)</Typography>
          <Divider sx={{ mb: 2 }} />
          {(['primary', 'secondary'] as const).map((key) => (
            <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Box
                component="label"
                sx={{ width: 32, height: 32, borderRadius: 1, border: '1px solid', borderColor: 'divider', overflow: 'hidden', cursor: 'pointer' }}
              >
                <Box
                  component="input"
                  type="color"
                  value={config?.colorsLight?.[key] || '#6750A4'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleColorSave(key, e.target.value)
                  }
                  sx={{ width: '100%', height: '100%', border: 'none', padding: 0, cursor: 'pointer' }}
                />
              </Box>
              <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>{key}</Typography>
              <Typography variant="caption" color="text.secondary">
                {config?.colorsLight?.[key] || '—'}
              </Typography>
            </Box>
          ))}
          {isUpdating && <CircularProgress size={16} sx={{ mt: 1 }} />}
        </Paper>

        {/* App Info */}
        <Paper sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>App Identity</Typography>
          <Divider sx={{ mb: 1 }} />
          <Typography variant="body2"><strong>Name:</strong> {config?.appName || '—'}</Typography>
          <Typography variant="body2"><strong>Tagline:</strong> {config?.tagline || '—'}</Typography>
          <Typography variant="body2"><strong>Font:</strong> {config?.fontFamily || '—'}</Typography>
        </Paper>

        {/* Feature Flags */}
        <Paper sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Feature Flags</Typography>
          <Divider sx={{ mb: 1 }} />
          {config?.features
            ? Object.entries(config.features).map(([flag, enabled]) => (
                <Box key={flag} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">{flag}</Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: enabled ? 'success.main' : 'text.disabled', fontWeight: 600 }}
                  >
                    {enabled ? 'ON' : 'OFF'}
                  </Typography>
                </Box>
              ))
            : <Typography variant="body2" color="text.secondary">Not loaded</Typography>}
        </Paper>
      </Box>
    </Box>
  );
};

export default BrandingSettings;
