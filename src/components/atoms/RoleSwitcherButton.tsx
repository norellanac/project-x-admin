import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMode, selectMode } from '../../redux/slices/roleSwitcherSlice';

const RoleSwitcherButton = () => {
  const dispatch = useDispatch();
  const currentMode = useSelector(selectMode); // Lee el modo actual del store

  const handleToggle = () => {
    dispatch(toggleMode()); // Cambia el modo
  };

  return (
    <Button color="inherit" onClick={handleToggle}>
      Switch to {currentMode === 'user' ? 'Merchant' : 'User'} Mode
    </Button>
  );
};

export default RoleSwitcherButton;
