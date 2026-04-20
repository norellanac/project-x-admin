import { createTheme } from '@mui/material/styles';
import { textTheme } from './textTheme';


export const darkTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark',
    primary: {
      main: '#D0BCFF',
      light: '#25232A',
      dark: '#D0BCFF',
      contrastText: '#000000',
    },
    secondary: {
      main: '#CCC2DC',
      light: '#4A4458',
      dark: '#49454F',
      contrastText: '#000000',
    },
    tertiary: {
      main: '#EFB8C8',
      light: '#FFD8E4',
      dark: '#633B48',
      contrastText: '#000000',
    },
    error: {
      main: '#F2B8B5',
      light: '#FFDAD6',
      dark: '#8C1D18',
      contrastText: '#000000',
    },
    background: {
      default: '#1C1B1F',
      paper: '#121212',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CAC4D0',
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