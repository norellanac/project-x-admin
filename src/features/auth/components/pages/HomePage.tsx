import TextAtom from '@/features/components/atoms/TextAtom';
import { Box } from '@mui/material';
import React from 'react';
import AuthButton from '../atoms/AuthButton';
import { useAppSelector } from '@/hooks/useAppSelector';
import { loginSuccess, logout, selectAuth } from '@/redux/slices/authSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { ButtonAtom } from '@/components/atoms';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);

  return (
    <Box
      sx={{
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <TextAtom variant="headline" size="medium" sx={{ mb: 2 }}>
        Welcome to the Home Page
      </TextAtom>
      <TextAtom variant="body" size="small">
       {JSON.stringify(authState)}
      </TextAtom>
      <ButtonAtom
        title='LogOut'
        fullWidth
        variant="filled"
        onClick={() => dispatch(logout())}
        sx={{ mt: 2, height: '40px', maxWidth: '328px', textTransform: 'none' }}
      >
        {t('auth.logout.title')}
      </ButtonAtom>
      <TextAtom variant="body" size="small">
        You can navigate to other sections using the sidebar or click on the
        `Workoo` text to return to `home`.
      </TextAtom>
      <br />
    </Box>
  );
};

export default HomePage;
