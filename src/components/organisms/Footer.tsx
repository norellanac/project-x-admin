import React from 'react';
import { Grid, Box, Typography, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { useTranslation } from 'react-i18next';
import AppLogo from '../molecules/AppLogo';
import packageJson from '../../../package.json';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { version } = packageJson;

  return (
    <>
      <Box>
        <Grid item xs={12} textAlign="center">
          <Box padding={8}>
            <AppLogo maxWidth="250px" />
          </Box>

          <Box>
            <IconButton
              href="https://www.instagram.com"
              target="_blank"
              style={{ color: '#0A142F', zIndex: -1 }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              href="https://www.pinterest.com"
              target="_blank"
              style={{ color: '#0A142F', zIndex: -1 }}
            >
              <PinterestIcon />
            </IconButton>
            <IconButton
              href="https://www.facebook.com"
              target="_blank"
              style={{ color: '#0A142F', zIndex: -1 }}
            >
              <FacebookIcon />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12} textAlign="center" mt={3} marginBottom="80px">
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} -
            <a
              href="https://www.bytecodelatam.com"
              target="_blank"
              style={{ textDecoration: 'none' }}
            >
              byteCode
            </a>
            : {t('footer.copyright')}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Version: {version}
          </Typography>
        </Grid>
      </Box>
    </>
  );
};

export default Footer;
