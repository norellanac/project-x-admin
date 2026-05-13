import { Navigate } from 'react-router-dom';

// Admin does not allow self-registration. All admin users must be created by a super-admin.
const RegisterPage = () => <Navigate to="/login" replace />;

export default RegisterPage;
