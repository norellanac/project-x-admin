import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SxProps, Theme } from '@mui/material/styles';
import RecoLogo from './../../assets/images/Reco_logo.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBranding } from '@/redux/slices/brandingSlice';

type AppLogoProps = {
  maxWidth?: string;
  sx?: SxProps<Theme>;
};

const BASE_API_URL = (import.meta.env.VITE_BASE_API_URL || '').replace(/\/$/, '');

function buildLogoUrl(logoUrl: string | null | undefined): string | null {
  if (!logoUrl) return null;
  return logoUrl.startsWith('http') ? logoUrl : `${BASE_API_URL}${logoUrl}`;
}

const AppLogo = ({ maxWidth = '150px', sx }: AppLogoProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { config } = useSelector(selectBranding);
  const logoSrc = buildLogoUrl(config?.logoUrl) || RecoLogo;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        ...sx,
      }}
      onClick={() => navigate('/')}
    >
      <img
        src={logoSrc}
        alt={config?.appName || t('app_name')}
        style={{ width: '100%', maxWidth }}
      />
    </Box>
  );
};

export default AppLogo;
