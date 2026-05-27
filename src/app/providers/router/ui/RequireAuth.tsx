import { getUserAuthData, getUserRoles, UserRole } from '@/entities/User';
import { getRouteForbiden, getRouteMain } from '@/shared/const/router';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

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
		return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
	}
	if (!hasRequiredRoles) {
		return <Navigate to={getRouteForbiden()} state={{ from: location }} replace />;
	}

	return children;
};
