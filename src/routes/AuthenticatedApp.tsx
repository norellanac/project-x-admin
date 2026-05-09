// Librerías externas
import { Box, CssBaseline } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';

// Componentes globales
import AuthHeader from '../features/auth/components/organisms/AuthHeader';
import AuthSidebar from '../features/auth/components/organisms/AuthSidebar';

// Páginas de características específicas
import HomePage from '@/features/auth/components/pages/HomePage';
import DashboardPage from '@/features/dashboard/components/pages/DashboardPage';
import SettingsPage from '@/features/dashboard/components/pages/SettingsPage';

// Páginas internas
import AnalysisPage from '../features/auth/components/pages/AnalysisPage';
import PaymentsPage from '../features/auth/components/pages/PaymentsPage';
import QualificationsPage from '../features/auth/components/pages/QualificationsPage';
import ServicesPage from '../features/auth/components/pages/ServicesPage';
import SuppliersPage from '../features/auth/components/pages/SuppliersPage';
import SupportPage from '../features/auth/components/pages/SupportPage';
import UsersPage from '../features/users/pages/UsersPage';
import BrandingPage from '@/features/branding/pages/BrandingPage';

//Estilos
import { useThemeContext } from '@/styles/contexts/ThemeProvider';

const AuthenticatedApp: React.FC = () => {
  const { toggleTheme, themeMode } = useThemeContext();
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <AuthHeader toggleTheme={toggleTheme} themeMode={themeMode} />
      <AuthSidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: { xs: '0', md: '240px' },
          marginTop: { xs: '56px', md: '64px' },
          position: 'relative',
        }}
      >
        <Routes>
          <Route path="home" element={<HomePage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="suppliers" element={<SuppliersPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="qualifications" element={<QualificationsPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="analysis" element={<AnalysisPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="branding" element={<BrandingPage />} />
          <Route path="*" element={<Navigate to="/app/home" />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AuthenticatedApp;
