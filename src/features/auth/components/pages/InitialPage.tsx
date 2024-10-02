import TextAtom from '@/features/components/atoms/TextAtom';
import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Login from '../organisms/Login';
import Signup from '../organisms/Signup';
import personImageApp from './../../../../assets/images/Main_screen_img_bg.svg';

interface InitialPageProps {
  onLogin: () => void;
}

const InitialPage: React.FC<InitialPageProps> = ({ onLogin }) => {
  const { t } = useTranslation();
  const [view, setView] = useState<'login' | 'signup'>('login');

  return (
    <Grid container sx={{ height: '100vh', width: '100vw' }}>
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          backgroundColor: '#F4F4F4',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '500px',
            mx: 'auto',
            textAlign: 'center',
          }}
        >
          <TextAtom
            variant="headline"
            size="small"
            sx={{
              mb: 2,
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              letterSpacing: '0.5px',
              fontWeight: 'bold',
            }}
          >
            {t('initialScreen.initialTitle')}
          </TextAtom>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <img
            src={personImageApp}
            alt="Initial screen"
            style={{
              width: '416px',
              height: '518px',
              borderRadius: '5%',
            }}
          />
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        md={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          backgroundColor: '#fff',
          position: 'relative',
        }}
      >
        {view === 'login' ? (
          <Login onSwitchToSignup={() => setView('signup')} onLogin={onLogin} />
        ) : (
          <Signup onSwitchToLogin={() => setView('login')} />
        )}
      </Grid>
    </Grid>
  );
};

export default InitialPage;
