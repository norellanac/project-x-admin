import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import HomeIcon from '../../assets/images/ButtonTab/HomeIcon.svg';
import TaskIcon from '../../assets/images/ButtonTab/TaskIcon.svg';
import FavoriteIcon from '../../assets/images/ButtonTab/FavoriteIcon.svg';
import HomeIconSelected from '../../assets/images/ButtonTab/HomeIconSelected.svg';
import TaskIconSelected from '../../assets/images/ButtonTab/TaskIconSelected.svg';
import FavoriteIconSelected from '../../assets/images/ButtonTab/FavoriteIconSelected.svg';
import ProfileIconSelected from '../../assets/images/ButtonTab/ProfileIconSelected.svg';
import { useTranslation } from 'react-i18next';
import TextAtom from '../atoms/TextAtom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectAuth } from '../../redux/slices/authSlice';
import { getApiImageUrl } from '../../utils/baseEnvironment';

interface Props {
  children: React.ReactNode;
}

export default function ButtonTab({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { t } = useTranslation();
  const {user} = useAppSelector(selectAuth);

  const navItems = [
    {
      label: t('buttonTab.home'),
      icon: <img src={HomeIcon} alt="Home" style={{ width: 24, height: 24 }} />,
      selectedIcon: (
        <img
          src={HomeIconSelected}
          alt="Home"
          style={{ width: 24, height: 24 }}
        />
      ),
      url: '/home',
    },
    {
      label: t('buttonTab.task'),
      icon: <img src={TaskIcon} alt="Task" style={{ width: 24, height: 24 }} />,
      selectedIcon: (
        <img
          src={TaskIconSelected}
          alt="Task"
          style={{ width: 24, height: 24 }}
        />
      ),
      url: '/tasks',
    },
    {
      label: t('buttonTab.favorites'),
      icon: (
        <img
          src={FavoriteIcon}
          alt="Favorites"
          style={{ width: 24, height: 24 }}
        />
      ),
      selectedIcon: (
        <img
          src={FavoriteIconSelected}
          alt="Favorites"
          style={{ width: 24, height: 24 }}
        />
      ),
      url: '/favorites',
    },
    {
      label: t('buttonTab.profile'),
      icon: (
        <img
          src={getApiImageUrl(user?.avatarUrl)}
          alt="Profile"
          style={{ width: 24, height: 24, borderRadius: 50 }}
        />
      ),
      selectedIcon: (
        <img
          src={getApiImageUrl(user?.avatarUrl)}
          alt="Profile"
          style={{ width: 24, height: 24, borderRadius: 50}}
        />
      ),
      url: '/profile',
    },
  ];

  const currentIndex = navItems.findIndex(
    (item) => item.url === location.pathname,
  );
  const [value, setValue] = React.useState(
    currentIndex >= 0 ? currentIndex : 0,
  );

  React.useEffect(() => {
    if (currentIndex !== value) {
      setValue(currentIndex);
    }
  }, [currentIndex, value]);

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      {children}
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            navigate(navItems[newValue].url);
          }}
        >
          {navItems.map((item, index) => (
            <BottomNavigationAction
              key={index}
              label={
                <TextAtom variant="body" size="small">
                  {item.label}
                </TextAtom>
              }
              icon={
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:
                      value === index
                        ? theme.palette.secondary.light
                        : 'transparent',
                    borderRadius: value === index ? '12px' : '0%',
                    padding: value === index ? '0 16px' : '0',
                  }}
                >
                  {value === index ? item.selectedIcon : item.icon}
                </div>
              }
            />
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
