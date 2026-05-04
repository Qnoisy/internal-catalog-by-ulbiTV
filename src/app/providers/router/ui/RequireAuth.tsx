import { getUserAuthData, getUserRoles, UserRole } from '@/entities/User';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';

interface RequireAuthProps {
	children: JSX.Element;
	roles?: UserRole[];
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children, roles }) => {
	const auth = useSelector(getUserAuthData);
	const location = useLocation();
	const userRoles = useSelector(getUserRoles);

	const hasRequiredRoles = useMemo(() => {
		if (!roles) {
			return true;
		}

		return roles.some(requiredRole => {
			const hasRole = userRoles?.includes(requiredRole);
			return hasRole;
		});
	}, []);
	if (!auth) {
		return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
	}
	if (!hasRequiredRoles) {
		return <Navigate to={RoutePath.forbbiden} state={{ from: location }} replace />;
	}

	return children;
};
