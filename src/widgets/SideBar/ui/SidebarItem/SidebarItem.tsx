import { getUserAuthData } from 'entities/User';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { SideBarItemTyoe } from 'widgets/SideBar/model/items';
import styles from './Sidebartem.module.scss';

interface SidebartemProps {
	item: SideBarItemTyoe;
	collapsed: boolean;
}

export const SidebarItem: React.FC<SidebartemProps> = ({ item, collapsed }) => {
	const { t } = useTranslation([item.text]);
	const isAuth = useSelector(getUserAuthData);

	if (item.authOnly && !isAuth) {
		return null;
	}

	return (
		<AppLink
			theme={AppLinkTheme.SECONDARY}
			to={item.path}
			className={classNames(styles.item, { [styles.collapsed]: collapsed })}
		>
			<item.Icon className={styles.icon} />
			<span className={styles.link}>{t(item.text)}</span>
		</AppLink>
	);
};
