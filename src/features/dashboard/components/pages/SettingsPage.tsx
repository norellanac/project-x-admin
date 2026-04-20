import AuthButton from '@/features/auth/components/atoms/AuthButton';
import AuthInputField from '@/features/components/atoms/AuthInputField';
import TextAtom from '@/features/components/atoms/TextAtom';
import { Edit as EditIcon } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Tab,
  Tabs,
  useTheme,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    userName: Yup.string().required('User name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    dateOfBirth: Yup.string(),
    presentAddress: Yup.string(),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),
    city: Yup.string(),
    postalCode: Yup.string(),
    country: Yup.string(),
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        m: '40px',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: '16px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={value} onChange={handleChange} aria-label="Settings tabs">
          <Tab label="Edit Profile" {...a11yProps(0)} />
          <Tab label="Preferences" {...a11yProps(1)} />
          <Tab label="Security" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Formik
          initialValues={{
            name: '',
            userName: '',
            email: '',
            password: '',
            dateOfBirth: '',
            presentAddress: '',
            phone: '',
            city: '',
            postalCode: '',
            country: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log('Form data:', values);
          }}
        >
          {({ handleChange, values, errors, touched }) => (
            <Form>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ ml: 2 }}>
                  <Grid
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                    size={{ xs: 12, md: 5, lg: 2 }}
                  >
                    <Avatar
                      alt="User Profile"
                      src="/path-to-avatar"
                      sx={{ width: 150, height: 150 }}
                    />
                    <IconButton
                      aria-label="edit picture"
                      component="label"
                      sx={{
                        mt: -6,
                        ml: 12,
                        bgcolor: '#9b76ff',
                        color: '#fff',
                        '&:hover': {
                          bgcolor: '#6750a4',
                        },
                        width: 35,
                        height: 35,
                        borderRadius: '50%',
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Grid>
                  <Grid
                    container
                    spacing={3}
                    size={{ xs: 12, md: 7, lg: 10 }}
                    alignContent={'center'}
                    justifyContent={'center'}
                  >
                    <Grid size={{ xs: 6, lg: 5 }}>
                      <TextAtom variant={'display'} size={'small'}>
                        <Field
                          fullWidth
                          name="name"
                          as={AuthInputField}
                          variant="outlined"
                          label="Your Name"
                          placeholder="Enter your name"
                          value={values.name}
                          onChange={handleChange}
                          error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </TextAtom>
                    </Grid>
                    <Grid size={{ xs: 6, lg: 5 }}>
                      <TextAtom variant={'display'} size={'small'}>
                        <Field
                          fullWidth
                          name="userName"
                          as={AuthInputField}
                          variant="outlined"
                          label="User Name"
                          placeholder="Enter your user name"
                          value={values.userName}
                          onChange={handleChange}
                          error={touched.userName && Boolean(errors.userName)}
                          helperText={touched.userName && errors.userName}
                        />
                      </TextAtom>
                    </Grid>
                    <Grid size={{ xs: 6, lg: 5 }}>
                      <TextAtom variant={'display'} size={'small'}>
                        <Field
                          fullWidth
                          name="email"
                          as={AuthInputField}
                          variant="outlined"
                          label="Email"
                          placeholder="Enter your email"
                          value={values.email}
                          onChange={handleChange}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </TextAtom>
                    </Grid>
                    <Grid size={{ xs: 6, lg: 5 }}>
                      <TextAtom variant={'display'} size={'small'}>
                        <Field
                          fullWidth
                          name="password"
                          as={AuthInputField}
                          variant="outlined"
                          label="Password"
                          placeholder="Enter your password"
                          value={values.password}
                          onChange={handleChange}
                          error={touched.password && Boolean(errors.password)}
                          helperText={touched.password && errors.password}
                        />
                      </TextAtom>
                    </Grid>

                    <Grid size={{ xs: 6, lg: 5 }}>
                      <TextAtom variant={'display'} size={'small'}>
                        <Field
                          fullWidth
                          name="dateOfBirth"
                          as={AuthInputField}
                          variant="outlined"
                          label="Date of birth"
                          placeholder="Enter your date of birth"
                          value={values.dateOfBirth}
                          onChange={handleChange}
                          error={
                            touched.dateOfBirth && Boolean(errors.dateOfBirth)
                          }
                          helperText={touched.dateOfBirth && errors.dateOfBirth}
                        />
                      </TextAtom>
                    </Grid>
                    <Grid size={{ xs: 6, lg: 5 }}>
                      <TextAtom variant={'display'} size={'small'}>
                        <Field
                          fullWidth
                          name="presentAddress"
                          as={AuthInputField}
                          variant="outlined"
                          label="Present Address"
                          placeholder="Enter your address"
                          value={values.presentAddress}
                          onChange={handleChange}
                          error={
                            touched.presentAddress &&
                            Boolean(errors.presentAddress)
                          }
                          helperText={
                            touched.presentAddress && errors.presentAddress
                          }
                        />
                      </TextAtom>
                    </Grid>
                    <Grid size={{ xs: 6, lg: 5 }}>
                      <TextAtom variant={'display'} size={'small'}>
                        <Field
                          fullWidth
                          name="phone"
                          as={AuthInputField}
                          variant="outlined"
                          label="Phone number"
                          placeholder="Enter your phone number"
                          value={values.phone}
                          onChange={handleChange}
                          error={touched.phone && Boolean(errors.phone)}
                          helperText={touched.phone && errors.phone}
                        />
                      </TextAtom>
                    </Grid>
                    <Grid size={{ xs: 6, lg: 5 }}>
                      <TextAtom variant={'display'} size={'small'}>
                        <Field
                          fullWidth
                          name="city"
                          as={AuthInputField}
                          variant="outlined"
                          label="City"
                          placeholder="Enter your city name"
                          value={values.city}
                          onChange={handleChange}
                          error={touched.city && Boolean(errors.city)}
                          helperText={touched.city && errors.city}
                        />
                      </TextAtom>
                    </Grid>
                    <Grid size={{ xs: 6, lg: 5 }}>
                      <TextAtom variant={'display'} size={'small'}>
                        <Field
                          fullWidth
                          name="postalCode"
                          as={AuthInputField}
                          variant="outlined"
                          label="Postal code"
                          placeholder="Enter your Postal code"
                          value={values.postalCode}
                          onChange={handleChange}
                          error={
                            touched.postalCode && Boolean(errors.postalCode)
                          }
                          helperText={touched.postalCode && errors.postalCode}
                        />
                      </TextAtom>
                    </Grid>
                    <Grid size={{ xs: 6, lg: 5 }}>
                      <TextAtom variant={'display'} size={'small'}>
                        <Field
                          fullWidth
                          name="country"
                          as={AuthInputField}
                          variant="outlined"
                          label="Country"
                          placeholder="Enter your country name"
                          value={values.country}
                          onChange={handleChange}
                          error={touched.country && Boolean(errors.country)}
                          helperText={touched.country && errors.country}
                        />
                      </TextAtom>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="right"
                  alignItems="center"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  sx={{ fontSize: '17px', mt: 3 }}
                  size={12}
                >
                  <Grid sx={{ order: { xs: 2, sm: 1 } }}>
                    <AuthButton
                      type="submit"
                      variant="filled"
                      onClick={() => {}}
                      sx={{
                        ml: 1,
                        textTransform: 'none',
                        fontSize: 'inherit',
                        width: '150px',
                        height: '50px',
                      }}
                    >
                      {t('settingsScreen.save_title_button')}
                    </AuthButton>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
        </Formik>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        Preferences Section
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Security Section
      </CustomTabPanel>
    </Box>
  );
};

export default SettingsPage;
