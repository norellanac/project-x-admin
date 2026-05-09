import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Skeleton,
  Snackbar,
  Switch,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import {
  useGetBrandingQuery,
  useUpdateBrandingMutation,
  useUploadAssetMutation,
  useRemoveSliderImageMutation,
} from '@/services/brandingApi';
import { BrandingColors, BrandingConfig, BrandingFeatures } from '@/types/branding';

// ─── Helpers ────────────────────────────────────────────────────────────────

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL ?? '';

function buildImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${BASE_API_URL}${url}`;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <Box role="tabpanel" hidden={value !== index} sx={{ pt: 3 }}>
    {value === index && children}
  </Box>
);

// ─── Color Section ────────────────────────────────────────────────────────────

const COLOR_GROUPS: Array<{ label: string; keys: (keyof BrandingColors)[] }> = [
  { label: 'Primary', keys: ['primary', 'primaryContainer', 'onPrimary'] },
  { label: 'Secondary', keys: ['secondary', 'secondaryContainer', 'onSecondary'] },
  { label: 'Tertiary', keys: ['tertiary', 'tertiaryContainer', 'onTertiary'] },
  { label: 'Error', keys: ['error', 'errorContainer'] },
  { label: 'Surface & Background', keys: ['background', 'surface'] },
  { label: 'Text', keys: ['textPrimary', 'textSecondary'] },
];

const COLOR_KEY_LABELS: Record<keyof BrandingColors, string> = {
  primary: 'Primary',
  primaryContainer: 'Primary Container',
  secondary: 'Secondary',
  secondaryContainer: 'Secondary Container',
  tertiary: 'Tertiary',
  tertiaryContainer: 'Tertiary Container',
  error: 'Error',
  errorContainer: 'Error Container',
  background: 'Background',
  surface: 'Surface',
  textPrimary: 'Text Primary',
  textSecondary: 'Text Secondary',
  onPrimary: 'On Primary',
  onSecondary: 'On Secondary',
  onTertiary: 'On Tertiary',
};

interface ColorEditorProps {
  colors: BrandingColors;
  onChange: (updated: BrandingColors) => void;
}

const ColorEditor: React.FC<ColorEditorProps> = ({ colors, onChange }) => {
  const handleChange = (key: keyof BrandingColors, value: string) => {
    onChange({ ...colors, [key]: value });
  };

  return (
    <Box>
      {COLOR_GROUPS.map((group) => (
        <Box key={group.label} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
            {group.label}
          </Typography>
          <Grid container spacing={2}>
            {group.keys.map((key) => (
              <Grid key={key} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Tooltip title="Pick color">
                    <Box
                      component="label"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        border: '2px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        overflow: 'hidden',
                        width: 40,
                        height: 40,
                        flexShrink: 0,
                      }}
                    >
                      <Box
                        component="input"
                        type="color"
                        value={colors[key] || '#000000'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange(key, e.target.value)
                        }
                        sx={{
                          width: '100%',
                          height: '100%',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                        }}
                      />
                    </Box>
                  </Tooltip>
                  <TextField
                    size="small"
                    label={COLOR_KEY_LABELS[key]}
                    value={colors[key] || ''}
                    onChange={(e) => handleChange(key, e.target.value)}
                    sx={{ flex: 1 }}
                    inputProps={{ maxLength: 9 }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

// ─── Asset Uploader ────────────────────────────────────────────────────────────

interface AssetUploaderProps {
  label: string;
  currentUrl: string | null | undefined;
  assetType: 'logo' | 'icon' | 'splash' | 'favicon' | 'defaultImage';
  onUpload: (type: AssetUploaderProps['assetType'], file: File) => void;
  uploading: boolean;
}

const AssetUploader: React.FC<AssetUploaderProps> = ({
  label,
  currentUrl,
  assetType,
  onUpload,
  uploading,
}) => {
  const inputId = `asset-upload-${assetType}`;
  const previewUrl = buildImageUrl(currentUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(assetType, file);
    e.target.value = '';
  };

  return (
    <Paper variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Typography variant="subtitle2" fontWeight={600}>
        {label}
      </Typography>
      {previewUrl ? (
        <Box
          component="img"
          src={previewUrl}
          alt={label}
          sx={{
            width: '100%',
            maxHeight: 120,
            objectFit: 'contain',
            borderRadius: 1,
            backgroundColor: 'action.hover',
          }}
        />
      ) : (
        <Box
          sx={{
            width: '100%',
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'action.hover',
            borderRadius: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            No image
          </Typography>
        </Box>
      )}
      <Box component="label" htmlFor={inputId}>
        <Box component="input" type="file" id={inputId} accept="image/*" sx={{ display: 'none' }} onChange={handleFileChange} />
        <Button
          component="span"
          variant="outlined"
          startIcon={uploading ? <CircularProgress size={16} /> : <AddPhotoAlternateIcon />}
          disabled={uploading}
          size="small"
          fullWidth
        >
          {uploading ? 'Uploading…' : 'Upload'}
        </Button>
      </Box>
    </Paper>
  );
};

// ─── Copy Overrides Section ────────────────────────────────────────────────────

interface CopyOverridesEditorProps {
  overrides: Record<string, Record<string, string>>;
  onChange: (updated: Record<string, Record<string, string>>) => void;
}

const CopyOverridesEditor: React.FC<CopyOverridesEditorProps> = ({ overrides, onChange }) => {
  const [expandedLang, setExpandedLang] = useState<string | null>(null);

  const langs = ['en', 'es'];

  const handleKeyChange = (lang: string, oldKey: string, newKey: string) => {
    const langObj = { ...(overrides[lang] ?? {}) };
    const value = langObj[oldKey];
    delete langObj[oldKey];
    langObj[newKey] = value;
    onChange({ ...overrides, [lang]: langObj });
  };

  const handleValueChange = (lang: string, key: string, value: string) => {
    const langObj = { ...(overrides[lang] ?? {}) };
    langObj[key] = value;
    onChange({ ...overrides, [lang]: langObj });
  };

  const handleAddRow = (lang: string) => {
    const langObj = { ...(overrides[lang] ?? {}) };
    const newKey = `key_${Date.now()}`;
    langObj[newKey] = '';
    onChange({ ...overrides, [lang]: langObj });
  };

  const handleRemoveRow = (lang: string, key: string) => {
    const langObj = { ...(overrides[lang] ?? {}) };
    delete langObj[key];
    onChange({ ...overrides, [lang]: langObj });
  };

  return (
    <Box>
      {langs.map((lang) => {
        const isExpanded = expandedLang === lang;
        const langEntries = Object.entries(overrides[lang] ?? {});

        return (
          <Paper key={lang} variant="outlined" sx={{ mb: 2, overflow: 'hidden' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                py: 1.5,
                cursor: 'pointer',
                bgcolor: 'action.hover',
              }}
              onClick={() => setExpandedLang(isExpanded ? null : lang)}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {lang === 'en' ? 'English (en)' : 'Spanish (es)'}
              </Typography>
              <IconButton size="small">
                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>

            {isExpanded && (
              <Box sx={{ p: 2 }}>
                {langEntries.length === 0 && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    No overrides yet.
                  </Typography>
                )}
                {langEntries.map(([key, value]) => (
                  <Box key={key} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                    <TextField
                      size="small"
                      label="Key"
                      defaultValue={key}
                      onBlur={(e) => {
                        if (e.target.value !== key) handleKeyChange(lang, key, e.target.value);
                      }}
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      size="small"
                      label="Value"
                      value={value}
                      onChange={(e) => handleValueChange(lang, key, e.target.value)}
                      sx={{ flex: 2 }}
                    />
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleRemoveRow(lang, key)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  startIcon={<AddIcon />}
                  size="small"
                  variant="outlined"
                  onClick={() => handleAddRow(lang)}
                  sx={{ mt: 1 }}
                >
                  Add row
                </Button>
              </Box>
            )}
          </Paper>
        );
      })}
    </Box>
  );
};

// ─── Default empty color set ─────────────────────────────────────────────────

const EMPTY_COLORS: BrandingColors = {
  primary: '#000000',
  primaryContainer: '#000000',
  secondary: '#000000',
  secondaryContainer: '#000000',
  tertiary: '#000000',
  tertiaryContainer: '#000000',
  error: '#000000',
  errorContainer: '#000000',
  background: '#ffffff',
  surface: '#ffffff',
  textPrimary: '#000000',
  textSecondary: '#000000',
  onPrimary: '#ffffff',
  onSecondary: '#ffffff',
  onTertiary: '#ffffff',
};

const EMPTY_FEATURES: BrandingFeatures = {
  chatEnabled: false,
  tasksEnabled: false,
  newsletterEnabled: false,
  socialAuthEnabled: false,
  darkModeEnabled: false,
  biometricsEnabled: false,
};

// ─── BrandingPage ─────────────────────────────────────────────────────────────

const BrandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const { data: brandingResponse, isLoading } = useGetBrandingQuery();
  const [updateBranding] = useUpdateBrandingMutation();
  const [uploadAsset, { isLoading: isUploading }] = useUploadAssetMutation();
  const [removeSliderImage] = useRemoveSliderImageMutation();

  const config = brandingResponse?.data ?? null;

  // ── Tab 1: Identity ──────────────────────────────────────────────────────
  const [identity, setIdentity] = useState({
    appName: '',
    tagline: '',
    legalName: '',
    fontFamily: '',
    buttonBorderRadius: 8,
  });

  // ── Tab 3/4: Colors ──────────────────────────────────────────────────────
  const [colorsLight, setColorsLight] = useState<BrandingColors>(EMPTY_COLORS);
  const [colorsDark, setColorsDark] = useState<BrandingColors>(EMPTY_COLORS);

  // ── Tab 5: Links & Legal ─────────────────────────────────────────────────
  const [legal, setLegal] = useState({
    termsUrl: '',
    privacyUrl: '',
    supportUrl: '',
    privacyEmail: '',
    legalEmail: '',
    companyAddress: '',
    mailchimpApiUrl: '',
  });

  // ── Tab 6: Feature Flags ─────────────────────────────────────────────────
  const [features, setFeatures] = useState<BrandingFeatures>(EMPTY_FEATURES);

  // ── Tab 7: Copy Overrides ────────────────────────────────────────────────
  const [copyOverrides, setCopyOverrides] = useState<
    Record<string, Record<string, string>>
  >({});

  // Sync state when data arrives
  useEffect(() => {
    if (!config) return;
    setIdentity({
      appName: config.appName ?? '',
      tagline: config.tagline ?? '',
      legalName: config.legalName ?? '',
      fontFamily: config.fontFamily ?? '',
      buttonBorderRadius: config.buttonBorderRadius ?? 8,
    });
    setColorsLight(config.colorsLight ?? EMPTY_COLORS);
    setColorsDark(config.colorsDark ?? EMPTY_COLORS);
    setLegal({
      termsUrl: config.termsUrl ?? '',
      privacyUrl: config.privacyUrl ?? '',
      supportUrl: config.supportUrl ?? '',
      privacyEmail: config.privacyEmail ?? '',
      legalEmail: config.legalEmail ?? '',
      companyAddress: config.companyAddress ?? '',
      mailchimpApiUrl: config.mailchimpApiUrl ?? '',
    });
    setFeatures(config.features ?? EMPTY_FEATURES);
    setCopyOverrides(config.copyOverrides ?? {});
  }, [config]);

  // ── Shared save handler ──────────────────────────────────────────────────
  const handleSave = async (payload: Partial<BrandingConfig>) => {
    try {
      await updateBranding(payload).unwrap();
      setSnackbar({ open: true, message: 'Saved successfully', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to save. Please try again.', severity: 'error' });
    }
  };

  // ── Asset upload handler ─────────────────────────────────────────────────
  const handleAssetUpload = async (
    type: 'logo' | 'icon' | 'splash' | 'favicon' | 'defaultImage',
    file: File,
  ) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await uploadAsset({ type, file: formData }).unwrap();
      setSnackbar({ open: true, message: `${type} uploaded successfully`, severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: `Failed to upload ${type}`, severity: 'error' });
    }
  };

  // ── Slider handlers ──────────────────────────────────────────────────────
  const handleSliderUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await uploadAsset({ type: 'slider', file: formData }).unwrap();
      setSnackbar({ open: true, message: 'Slide added', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to upload slide', severity: 'error' });
    }
  };

  const handleRemoveSlide = async (index: number) => {
    try {
      await removeSliderImage(index).unwrap();
      setSnackbar({ open: true, message: 'Slide removed', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to remove slide', severity: 'error' });
    }
  };

  // ── Loading skeleton ─────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Skeleton variant="text" width={240} height={40} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={48} sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          {[...Array(4)].map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6 }}>
              <Skeleton variant="rectangular" height={56} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Branding
      </Typography>

      <Paper variant="outlined" sx={{ borderRadius: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
        >
          <Tab label="Identity" />
          <Tab label="Logos & Images" />
          <Tab label="Colors: Light" />
          <Tab label="Colors: Dark" />
          <Tab label="Links & Legal" />
          <Tab label="Feature Flags" />
          <Tab label="Copy Overrides" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {/* ── Tab 0: Identity ─────────────────────────────────────────── */}
          <TabPanel value={activeTab} index={0}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="App Name"
                  value={identity.appName}
                  onChange={(e) => setIdentity({ ...identity, appName: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Tagline"
                  value={identity.tagline}
                  onChange={(e) => setIdentity({ ...identity, tagline: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Legal Name"
                  value={identity.legalName}
                  onChange={(e) => setIdentity({ ...identity, legalName: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Font Family"
                  value={identity.fontFamily}
                  onChange={(e) => setIdentity({ ...identity, fontFamily: e.target.value })}
                  placeholder="e.g. Inter, Roboto"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Button Border Radius (px)"
                  value={identity.buttonBorderRadius}
                  onChange={(e) =>
                    setIdentity({
                      ...identity,
                      buttonBorderRadius: Number(e.target.value),
                    })
                  }
                  inputProps={{ min: 0, max: 50 }}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                onClick={() =>
                  handleSave({
                    appName: identity.appName,
                    tagline: identity.tagline,
                    legalName: identity.legalName,
                    fontFamily: identity.fontFamily,
                    buttonBorderRadius: identity.buttonBorderRadius,
                  })
                }
              >
                Save Identity
              </Button>
            </Box>
          </TabPanel>

          {/* ── Tab 1: Logos & Images ──────────────────────────────────── */}
          <TabPanel value={activeTab} index={1}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {(
                [
                  { type: 'logo', label: 'Logo', url: config?.logoUrl },
                  { type: 'icon', label: 'App Icon', url: config?.iconUrl },
                  { type: 'splash', label: 'Splash Screen', url: config?.splashUrl },
                  { type: 'favicon', label: 'Favicon', url: config?.faviconUrl },
                  { type: 'defaultImage', label: 'Default Image', url: config?.defaultImageUrl },
                ] as const
              ).map(({ type, label, url }) => (
                <Grid key={type} size={{ xs: 12, sm: 6, md: 4 }}>
                  <AssetUploader
                    label={label}
                    currentUrl={url}
                    assetType={type}
                    onUpload={handleAssetUpload}
                    uploading={isUploading}
                  />
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
              Slider Images
            </Typography>

            {config?.sliderImages && config.sliderImages.length > 0 ? (
              <Grid container spacing={2} sx={{ mb: 2 }}>
                {config.sliderImages.map((url, idx) => {
                  const previewUrl = buildImageUrl(url);
                  return (
                    <Grid key={idx} size={{ xs: 12, sm: 6, md: 4 }}>
                      <Paper variant="outlined" sx={{ p: 1, position: 'relative' }}>
                        {previewUrl && (
                          <Box
                            component="img"
                            src={previewUrl}
                            alt={`Slide ${idx + 1}`}
                            sx={{
                              width: '100%',
                              height: 140,
                              objectFit: 'cover',
                              borderRadius: 1,
                            }}
                          />
                        )}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            Slide {idx + 1}
                          </Typography>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleRemoveSlide(idx)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                No slider images yet.
              </Typography>
            )}

            <Box component="label">
              <Box
                component="input"
                type="file"
                accept="image/*"
                sx={{ display: 'none' }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) handleSliderUpload(file);
                  e.target.value = '';
                }}
              />
              <Button
                component="span"
                variant="outlined"
                startIcon={isUploading ? <CircularProgress size={16} /> : <AddIcon />}
                disabled={isUploading}
              >
                Add Slide
              </Button>
            </Box>
          </TabPanel>

          {/* ── Tab 2: Colors Light ────────────────────────────────────── */}
          <TabPanel value={activeTab} index={2}>
            <ColorEditor colors={colorsLight} onChange={setColorsLight} />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={() => handleSave({ colorsLight })}>
                Save Light Colors
              </Button>
            </Box>
          </TabPanel>

          {/* ── Tab 3: Colors Dark ─────────────────────────────────────── */}
          <TabPanel value={activeTab} index={3}>
            <ColorEditor colors={colorsDark} onChange={setColorsDark} />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={() => handleSave({ colorsDark })}>
                Save Dark Colors
              </Button>
            </Box>
          </TabPanel>

          {/* ── Tab 4: Links & Legal ──────────────────────────────────── */}
          <TabPanel value={activeTab} index={4}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Terms URL"
                  value={legal.termsUrl}
                  onChange={(e) => setLegal({ ...legal, termsUrl: e.target.value })}
                  placeholder="https://"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Privacy URL"
                  value={legal.privacyUrl}
                  onChange={(e) => setLegal({ ...legal, privacyUrl: e.target.value })}
                  placeholder="https://"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Support URL"
                  value={legal.supportUrl}
                  onChange={(e) => setLegal({ ...legal, supportUrl: e.target.value })}
                  placeholder="https://"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Privacy Email"
                  type="email"
                  value={legal.privacyEmail}
                  onChange={(e) => setLegal({ ...legal, privacyEmail: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Legal Email"
                  type="email"
                  value={legal.legalEmail}
                  onChange={(e) => setLegal({ ...legal, legalEmail: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Mailchimp API URL"
                  value={legal.mailchimpApiUrl}
                  onChange={(e) => setLegal({ ...legal, mailchimpApiUrl: e.target.value })}
                  placeholder="https://"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  label="Company Address"
                  value={legal.companyAddress}
                  onChange={(e) => setLegal({ ...legal, companyAddress: e.target.value })}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={() => handleSave(legal)}>
                Save Links & Legal
              </Button>
            </Box>
          </TabPanel>

          {/* ── Tab 5: Feature Flags ───────────────────────────────────── */}
          <TabPanel value={activeTab} index={5}>
            <Grid container spacing={2}>
              {(
                [
                  { key: 'chatEnabled', label: 'Chat enabled' },
                  { key: 'tasksEnabled', label: 'Tasks enabled' },
                  { key: 'newsletterEnabled', label: 'Newsletter enabled' },
                  { key: 'socialAuthEnabled', label: 'Social auth enabled' },
                  { key: 'darkModeEnabled', label: 'Dark mode enabled' },
                  { key: 'biometricsEnabled', label: 'Biometrics enabled (mobile)' },
                ] as { key: keyof BrandingFeatures; label: string }[]
              ).map(({ key, label }) => (
                <Grid key={key} size={{ xs: 12, sm: 6 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={features[key]}
                        onChange={(e) =>
                          setFeatures({ ...features, [key]: e.target.checked })
                        }
                      />
                    }
                    label={label}
                  />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={() => handleSave({ features })}>
                Save Feature Flags
              </Button>
            </Box>
          </TabPanel>

          {/* ── Tab 6: Copy Overrides ──────────────────────────────────── */}
          <TabPanel value={activeTab} index={6}>
            <CopyOverridesEditor overrides={copyOverrides} onChange={setCopyOverrides} />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={() => handleSave({ copyOverrides })}>
                Save Copy Overrides
              </Button>
            </Box>
          </TabPanel>
        </Box>
      </Paper>

      {/* ── Snackbar ─────────────────────────────────────────────────────── */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BrandingPage;
