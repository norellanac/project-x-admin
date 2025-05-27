import InitialPage from '@/features/auth/components/pages/InitialPage';

import { Navigate, Route, Routes } from 'react-router-dom';
import AuthenticatedApp from './AuthenticatedApp';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectAuth } from '@/redux/slices/authSlice';

const PrivateRoute = ({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean;
  children: JSX.Element;
}) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

const AppRouter: React.FC<{
  onLogin: () => void;
}> = ({  onLogin }) => {
  const { isAuthenticated } = useAppSelector(selectAuth);
  console.error('AppRouter isAuthenticated:', isAuthenticated);
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? '/app/home' : '/login'} />}
      />
      <Route path="/login" element={<InitialPage onLogin={onLogin} />} />
      <Route
        path="/app/*"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <AuthenticatedApp />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
