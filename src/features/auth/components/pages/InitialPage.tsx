import TextAtom from '@/features/components/atoms/TextAtom';
import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Login from '../organisms/Login';
import Signup from '../organisms/Signup';
import personImageApp from './../../../../assets/images/Main_screen_img_bg.svg';
import AuthLayout from '../templates/AuthLayout';

interface InitialPageProps {
  onLogin: () => void;
}

const InitialPage: React.FC<InitialPageProps> = ({ onLogin }) => {
  const { t } = useTranslation();
  const [view, setView] = useState<'login' | 'signup'>('login');

  const AUTH_PAGES = {
    login: <Login onLogin={onLogin} />,
    signup: <Signup onLogin={onLogin} />,
  };

  return (<AuthLayout>{AUTH_PAGES[view]}</AuthLayout>); 
}

export default InitialPage;
