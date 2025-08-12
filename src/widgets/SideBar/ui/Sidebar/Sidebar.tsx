import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';

import { LanguageSwitcher } from 'widgets/LanguageSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import styles from './Sidebar.module.scss';

interface SidebarProps {
	className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false);
	const { t } = useTranslation();

	const onToggle = () => {
		setCollapsed(prev => !prev);
	};

	return (
		<div
			data-testid='sidebar'
			className={classNames(styles.Sidebar, { [styles.collapsed]: collapsed }, [className])}
		>
			<Button
				data-testid='sidebar-toggle'
				onClick={onToggle}
				className={styles.collapseBtn}
				theme={ButtonTheme.BACKGROUND_INVERTED}
				size={ButtonSize.L}
				square
			>
				{collapsed ? '>' : '<'}
			</Button>
			<div className={styles.items}>
				<AppLink theme={AppLinkTheme.SECONDARY} to={RoutePath.main} className={styles.item}>
					<MainIcon className={styles.icon} />
					<span className={styles.link}>{t('main')}</span>
				</AppLink>
				<AppLink theme={AppLinkTheme.SECONDARY} to={RoutePath.about} className={styles.item}>
					<AboutIcon className={styles.icon} />
					<span className={styles.link}>{t('about')}</span>
				</AppLink>
			</div>
			<div className={styles.switchers}>
				<ThemeSwitcher />
				<LanguageSwitcher short={collapsed} className={styles.lang} />
			</div>
		</div>
	);
};
