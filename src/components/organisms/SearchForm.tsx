import { useTranslation } from 'react-i18next';
import {
  Grid2 as Grid,
  FormControl,
  IconButton,
  useTheme,
  Box,
  Divider,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchServicesFormData } from '../../context/SearchContext';
import { useGetProductsQuery } from '../../services/productApi';
import { Search } from '@mui/icons-material';
import { ButtonAtom, InputAtom } from '../atoms';
import { ModalComponent } from '../molecules';

const SearchForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const palette = theme.palette;
  const { searchData, updateSearchData } = useSearchServicesFormData();
  const { data: products } = useGetProductsQuery();

  const [showSearchModal, setShowSearchModal] = useState(false);

  const services = useMemo(() => (
    Array.from(
      new Set(
        products?.data?.items?.flatMap(
          (product) => product.categories?.map((cat) => cat.name) || [],
        ),
      ),
    )
  ), [products]);

  const locations = useMemo(() => (
    Array.from(new Set(products?.data?.items.map((product) => product.location)))
  ), [products]);

  const validationSchema = Yup.object().shape({
    textSearch: Yup.string().max(50, t('validation.maxLength')),
    service: Yup.array().of(Yup.string()).min(1, t('validation.required')),
    location: Yup.array().of(Yup.string()).min(1, t('validation.required')),
  });

  const initialValues = {
    textSearch: searchData.textSearch || '',
    service: searchData.categories || [],
    location: searchData.location || [],
  };

  const handleSubmit = (values: typeof initialValues) => {
    updateSearchData('textSearch', values.textSearch);
    updateSearchData('categories', values.service);
    updateSearchData('location', values.location);
    navigate('/search-services');
  };

  const handleClearFilters = () => {
    updateSearchData('textSearch', '');
    updateSearchData('categories', []);
    updateSearchData('location', []);
    setShowSearchModal(false);
  };
  const handleModalConfirm = () => {
    handleSubmit(initialValues);
    setShowSearchModal(false);
  };

  const FormSection = () => (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, setFieldValue, errors, touched }) => (
        <Form sx={{ my: 2 }}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{
              borderRadius: { xs: 5, md: 25 },
              boxShadow: 5,
              width: { md: '70%' },
              mx: 'auto',
              py: 1,
              my: 2,
              backgroundColor: 'background.paper',
            }}
          >
            <Grid size={{ xs: 12, sm: 12, md: 4 }} mx={{ xs: 2, sm: 2, md: 1 }}>
              <FormControl fullWidth>
                <InputAtom
                  name="textSearch"
                  value={values.textSearch}
                  onChange={handleChange}
                  placeholder={t('landing.searchForm.title')}
                  aria-label={t('landing.searchForm.textPlaceholder')}
                  error={touched.textSearch && Boolean(errors.textSearch)}
                  helperText={touched.textSearch && errors.textSearch}
                  variant="rounded"
                  label={t('landing.searchForm.textPlaceholder')}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 3 }} mx={{ xs: 2, sm: 2, md: 1 }}>
              <FormControl fullWidth>
                <InputAtom
                  name="service"
                  value={values.service}
                  onChange={(e) => setFieldValue('service', e.target.value)}
                  placeholder={t('landing.searchForm.serviceInput')}
                  error={touched.service && Boolean(errors.service)}
                  helperText={errors.service}
                  variant="rounded"
                  label={t('landing.searchForm.serviceInput')}
                  isSelect
                  multiple
                  options={services.map((service) => ({
                    value: service,
                    label: service,
                  }))}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 3 }} mx={{ xs: 2, sm: 2, md: 1 }}>
              <FormControl fullWidth>
                <InputAtom
                  name="location"
                  multiple
                  value={values.location}
                  onChange={(e) => setFieldValue('location', e.target.value)}
                  renderValue={(selected) => selected.join(', ')}
                  aria-label={t('landing.searchForm.location')}
                  variant="rounded"
                  label={t('landing.searchForm.location')}
                  placeholder={t('landing.searchForm.location')}
                  isSelect
                  options={locations.map((location) => ({
                    value: location,
                    label: location,
                  }))}
                  error={touched.location && errors.location}
                  helperText={errors.location}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 1 }} sx={{display: {xs: 'none', sm: 'none', md: 'block'} }} >
              <IconButton
                type="submit"
                sx={{
                  backgroundColor: palette.primary.main,
                  color: palette.common.white,
                  '&:hover': {
                    backgroundColor: palette.primary.main,
                  },
                  ml: 5,
                }}
              >
                <Search />
              </IconButton>
            </Grid>
          </Grid>
          <Divider sx={{ pt: 1 }} />
        </Form>
      )}
    </Formik>
  );


  return (
    <>
      {/* Desktop */}
      <Box sx={{ display: { md: 'block', sm: 'none', xs: 'none' } }}>
        <FormSection />
      </Box>
      {/* Mobile/Tablet */}
      <Box sx={{ display: { md: 'none', sm: 'block', xs: 'block' } }}>
        <Grid container spacing={2} sx={{ width: '100%', mx: 0 }}>
          <Grid size={{ xs: 12, sm: 12 }} mx={6} my={1}>
            <ButtonAtom
              fullWidth
              variant="elevated"
              sx={{ width: "100%", height: 50 }}
              onClick={() => setShowSearchModal(true)}
              startIcon={<Search />}
            >
              {t('landing.searchForm.startSearch', 'Start your search')}
            </ButtonAtom>
          </Grid>
        </Grid>
        <ModalComponent
          open={showSearchModal}
          onClose={handleClearFilters}
          onConfirm={handleModalConfirm}
          confirmButtonEndIcon={<Search />}
          title={t('landing.searchForm.modalTitle', 'Search Services')}
          cancelButtonText={t('landing.searchForm.clearFilters', 'Clear Filters')}
          confirmButtonText={t('landing.searchForm.search', 'Search')}
          isConfirmButtonDisabled={false}
          sx={{ width: '95%', height: 'auto', maxWidth: '100%' }}
        >
          <FormSection />
        </ModalComponent>
      </Box>
    </>
  );
};

export default SearchForm;