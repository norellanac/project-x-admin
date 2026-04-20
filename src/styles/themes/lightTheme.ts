import { createTheme } from '@mui/material/styles';
import { textTheme } from './textTheme';


export const lightTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
    primary: {
      main: '#6750A4',
      light: '#F7F2FA',
      dark: '#6750A4',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#625B71',
      light: '#E8DEF8',
      dark: '#1D192B',
      contrastText: '#FFFFFF',
    },
    tertiary: {
      main: '#7D5260',
      light: '#EFB8C8',
      dark: '#31111D',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#B3261E',
      light: '#F2B8B5',
      dark: '#601410',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F4F4F4',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#49454F',
    },
    action: {
      disabledBackground: '#E3E0E3',
      disabled: '#979598',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '100px', 
        },
        contained: {
          '&.Mui-disabled': {
            backgroundColor: '#E3E0E3',
            color: '#979598',
          },
        },
      },
    },
  },
  typography: {
    ...textTheme,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  
});
  
