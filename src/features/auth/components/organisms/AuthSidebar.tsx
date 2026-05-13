import TextAtom from '@/features/components/atoms/TextAtom';
import BarChartIcon from '@mui/icons-material/BarChart';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import GradeIcon from '@mui/icons-material/Grade';
import HomeIcon from '@mui/icons-material/Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import StoreIcon from '@mui/icons-material/Store';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBranding } from '@/redux/slices/brandingSlice';

const AuthSidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const { config } = useSelector(selectBranding);

  const getColor = (path: string): string => {
    return location.pathname === path
      ? theme.palette.primary.main
      : theme.palette.text.secondary;
  };

  const getTabColor = (path: string): string => {
    return location.pathname === path
      ? theme.palette.primary.main
      : 'transparent';
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '240px',
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
          zIndex: theme.zIndex.drawer,
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItemButton
            component={Link}
            to="/app/home"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              width: '100%',
            }}
          >
            <TextAtom
              variant="headline"
              size="large"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
              }}
            >
              {config?.appName || 'Admin Panel'}
            </TextAtom>
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/app/dashboard"
            sx={{ position: 'relative' }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '8px',
                backgroundColor: getTabColor('/app/dashboard'),
                borderRadius: '0 4px 4px 0',
              }}
            />
            <ListItemIcon sx={{ color: getColor('/app/dashboard') }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/app/suppliers"
            sx={{ position: 'relative' }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '8px',
                backgroundColor: getTabColor('/app/suppliers'),
                borderRadius: '0 4px 4px 0',
              }}
            />
            <ListItemIcon sx={{ color: getColor('/app/suppliers') }}>
              <LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary="Suppliers" />
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/app/users"
            sx={{ position: 'relative' }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '8px',
                backgroundColor: getTabColor('/app/users'),
                borderRadius: '0 4px 4px 0',
              }}
            />
            <ListItemIcon sx={{ color: getColor('/app/users') }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/app/services"
            sx={{ position: 'relative' }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '8px',
                backgroundColor: getTabColor('/app/services'),
                borderRadius: '0 4px 4px 0',
              }}
            />
            <ListItemIcon sx={{ color: getColor('/app/services') }}>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Services" />
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/app/qualifications"
            sx={{ position: 'relative' }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '8px',
                backgroundColor: getTabColor('/app/qualifications'),
                borderRadius: '0 4px 4px 0',
              }}
            />
            <ListItemIcon sx={{ color: getColor('/app/qualifications') }}>
              <GradeIcon />
            </ListItemIcon>
            <ListItemText primary="Qualifications" />
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/app/payments"
            sx={{ position: 'relative' }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '8px',
                backgroundColor: getTabColor('/app/payments'),
                borderRadius: '0 4px 4px 0',
              }}
            />
            <ListItemIcon sx={{ color: getColor('/app/payments') }}>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary="Payments" />
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/app/support"
            sx={{ position: 'relative' }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '8px',
                backgroundColor: getTabColor('/app/support'),
                borderRadius: '0 4px 4px 0',
              }}
            />
            <ListItemIcon sx={{ color: getColor('/app/support') }}>
              <SupportAgentIcon />
            </ListItemIcon>
            <ListItemText primary="Support" />
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/app/analysis"
            sx={{ position: 'relative' }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '8px',
                backgroundColor: getTabColor('/app/analysis'),
                borderRadius: '0 4px 4px 0',
              }}
            />
            <ListItemIcon sx={{ color: getColor('/app/analysis') }}>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Analysis" />
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/app/settings"
            sx={{ position: 'relative' }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '8px',
                backgroundColor: getTabColor('/app/settings'),
                borderRadius: '0 4px 4px 0',
              }}
            />
            <ListItemIcon sx={{ color: getColor('/app/settings') }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/app/branding"
            sx={{ position: 'relative' }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '8px',
                backgroundColor: getTabColor('/app/branding'),
                borderRadius: '0 4px 4px 0',
              }}
            />
            <ListItemIcon sx={{ color: getColor('/app/branding') }}>
              <BrushOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Branding" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
};

export default AuthSidebar;
