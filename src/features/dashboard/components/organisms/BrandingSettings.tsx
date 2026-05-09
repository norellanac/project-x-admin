import React, { useState } from 'react';
import { Box, Grid, Button, Typography, CircularProgress, Paper, Divider } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useGetBrandingQuery, useUpdateBrandingMutation } from '@/services/brandingApi';
import TextAtom from '@/features/components/atoms/TextAtom';
import AuthInputField from '@/features/components/atoms/AuthInputField';

const validationSchema = Yup.object().shape({
  projectName: Yup.string().required('Project Name is required'),
  primaryColor: Yup.string()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color')
    .required('Primary Color is required'),
  secondaryColor: Yup.string()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color')
    .required('Secondary Color is required'),
});

const BrandingSettings: React.FC = () => {
  const { data: branding, isLoading, isError } = useGetBrandingQuery();
  const [updateBranding, { isLoading: isUpdating }] = useUpdateBrandingMutation();
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  const initialValues = {
    projectName: branding?.projectName || '',
    primaryColor: branding?.primaryColor || '#000000',
    secondaryColor: branding?.secondaryColor || '#ffffff',
    logo: null as File | null,
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const formData = new FormData();
    formData.append('projectName', values.projectName);
    formData.append('primaryColor', values.primaryColor);
    formData.append('secondaryColor', values.secondaryColor);
    if (values.logo) {
      formData.append('logo', values.logo);
    }

    try {
      await updateBranding(formData).unwrap();
      alert('Branding updated successfully!');
    } catch (err) {
      console.error('Failed to update branding:', err);
      alert('Failed to update branding.');
    }
  };

  return (
    <Box>
      <TextAtom variant="headline" size="medium" sx={{ mb: 3 }}>
        Branding Settings
      </TextAtom>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 2 }}>
                  <Field
                    as={AuthInputField}
                    name="projectName"
                    label="Project Name"
                    placeholder="Enter Project Name"
                    variant="outlined"
                    error={touched.projectName && !!errors.projectName}
                    errorMsg={touched.projectName ? (errors.projectName as string) : ''}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Field
                    as={AuthInputField}
                    name="primaryColor"
                    label="Primary Color"
                    placeholder="#000000"
                    variant="outlined"
                    error={touched.primaryColor && !!errors.primaryColor}
                    errorMsg={touched.primaryColor ? (errors.primaryColor as string) : ''}
                  />
                  <Box
                    sx={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: values.primaryColor,
                      mt: 1,
                      border: '1px solid #ccc',
                      borderRadius: '4px'
                    }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Field
                    as={AuthInputField}
                    name="secondaryColor"
                    label="Secondary Color"
                    placeholder="#ffffff"
                    variant="outlined"
                    error={touched.secondaryColor && !!errors.secondaryColor}
                    errorMsg={touched.secondaryColor ? (errors.secondaryColor as string) : ''}
                  />
                  <Box
                    sx={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: values.secondaryColor,
                      mt: 1,
                      border: '1px solid #ccc',
                      borderRadius: '4px'
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>Logo</Typography>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    if (file) {
                      setFieldValue('logo', file);
                      setPreviewLogo(URL.createObjectURL(file));
                    }
                  }}
                  style={{ marginBottom: '16px', display: 'block' }}
                />
                {(previewLogo || branding?.logoUrl) && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" display="block">Logo Preview:</Typography>
                    <img 
                      src={previewLogo || branding?.logoUrl} 
                      alt="Logo Preview" 
                      style={{ maxWidth: '200px', maxHeight: '100px', objectFit: 'contain', border: '1px dashed #ccc', padding: '8px' }} 
                    />
                  </Box>
                )}

                <Paper sx={{ p: 2, bgcolor: '#f5f5f5', border: '1px solid #ddd' }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>UI Elements Preview</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Button 
                      variant="contained" 
                      sx={{ bgcolor: values.primaryColor, '&:hover': { bgcolor: values.primaryColor, opacity: 0.9 } }}
                    >
                      Primary Button
                    </Button>
                    <Button 
                      variant="outlined" 
                      sx={{ color: values.secondaryColor, borderColor: values.secondaryColor, '&:hover': { borderColor: values.secondaryColor, opacity: 0.9 } }}
                    >
                      Secondary Button
                    </Button>
                  </Box>
                  <Box sx={{ mt: 2, p: 1, borderLeft: `4px solid ${values.primaryColor}` }}>
                    <TextAtom variant="body" size="medium">
                      Sample text with primary accent border.
                    </TextAtom>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isUpdating}
                  sx={{
                    bgcolor: '#9b76ff',
                    color: '#fff',
                    '&:hover': { bgcolor: '#6750a4' },
                    textTransform: 'none',
                    px: 4,
                    py: 1.5,
                  }}
                >
                  {isUpdating ? <CircularProgress size={24} color="inherit" /> : 'Save Branding Changes'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default BrandingSettings;
