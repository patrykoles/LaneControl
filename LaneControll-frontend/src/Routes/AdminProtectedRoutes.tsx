import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/UseAuth';

type Props = { children: React.ReactNode };

function AdminProtectedRoutes({ children }: Props) {
    const location = useLocation();
    const { isAdmin } = useAuth();
  return isAdmin ? (
    <>{children}</>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default AdminProtectedRoutes