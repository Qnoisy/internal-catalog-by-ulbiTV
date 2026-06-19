import React, { useCallback } from 'react';
import styles from './AvatarDropdow.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar';

import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, isUserAdmin, isUserManager, UserActions } from '@/entities/User';
import { useTranslation } from 'react-i18next';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';
import { Dropdown } from '@/shared/ui/Popups';

interface AvatarDropdowProps {
	className?: string;
}

export const AvatarDropdow: React.FC<AvatarDropdowProps> = ({ className }) => {
	const isAdmin = useSelector(isUserAdmin);
	const isManager = useSelector(isUserManager);
	const authData = useSelector(getUserAuthData);
	const dispatch = useDispatch();

	const onLogout = useCallback(() => {
		dispatch(UserActions.logout());
	}, [dispatch]);

	const isAdminPanelAvailable = isAdmin || isManager;

	const { t } = useTranslation();
	if (!authData) {
		return null;
	}

	return (
		<div>
			<Dropdown
				className={classNames(styles.AvatarDropdow, {}, [className])}
				items={[
					...(isAdminPanelAvailable
						? [
								{
									href: getRouteAdminPanel(),
									content: t('Admin'),
									id: '1'
								}
						  ]
						: []),
					{
						href: getRouteProfile(authData.id),
						content: t('profile'),
						id: '2'
					},
					{
						onClick: onLogout,
						content: t('Logout'),
						id: '3'
					}
				]}
				trigger={<Avatar fallbackInverted={true} src={authData.avatar} size={30} />}
			/>
		</div>
	);
};
