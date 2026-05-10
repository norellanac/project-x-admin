import { CssBaseline } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider, useDispatch, useSelector } from 'react-redux';
import AppRouter from './routes/AppRouter';
import { store, AppDispatch } from './redux/store/store';
import './styles/App.css';
import { ThemeProvider } from './styles/contexts/ThemeProvider';
import i18n from './utils/i18n';
import { fetchBranding, selectBranding } from './redux/slices/brandingSlice';

function BrandingBootstrap() {
  const dispatch = useDispatch<AppDispatch>();
  const { config } = useSelector(selectBranding);

  useEffect(() => {
    dispatch(fetchBranding());
  }, [dispatch]);

  useEffect(() => {
    if (config?.appName) {
      document.title = config.tagline
        ? `${config.appName} | Admin`
        : `${config.appName} Admin`;
    }
    if (config?.copyOverrides) {
      Object.entries(config.copyOverrides).forEach(([lang, keys]) => {
        i18n.addResourceBundle(lang, 'translation', keys, true, true);
      });
    }
  }, [config]);

  return null;
}

const App: React.FC = () => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const handleLogin = () => {};

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <BrandingBootstrap />
        <ThemeProvider themeMode={themeMode} toggleTheme={toggleTheme}>
          <CssBaseline />
          <AppRouter onLogin={handleLogin} />
        </ThemeProvider>
      </Provider>
    </I18nextProvider>
  );
};

export default App;
