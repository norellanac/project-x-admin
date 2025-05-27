import { ReactNode } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import ButtonTab from '../organisms/ButtonTab';
import ResponsiveAppBar from '../../features/landing/components/organisms/AppBar';
import Footer from '../organisms/Footer';

interface Props {
  children: ReactNode;
}

export const UserLayout = ({ children }: Props) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      {isLargeScreen ? (
        <>
          <ResponsiveAppBar />
          {children}
        </>
      ) : (
        <ButtonTab children={children} />
      )}
      <Footer />
    </>
  );
};
