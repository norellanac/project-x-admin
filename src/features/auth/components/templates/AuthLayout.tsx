import { Grid } from '@mui/material';
import IntroSlider from '../organisms/IntroSlider';

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Grid container>
      <IntroSlider />

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
        {children}
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
