import { memo, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';

import { LanguageSwitcher } from 'widgets/LanguageSwitcher';

import { useSelector } from 'react-redux';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import styles from './Sidebar.module.scss';
import { VStack } from 'shared/ui/Stack';

interface SidebarProps {
	className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false);
	const SideBarItemsList = useSelector(getSidebarItems);

	const onToggle = () => {
		setCollapsed(prev => !prev);
	};

	const itemList = useMemo(() => {
		return SideBarItemsList.map(item => (
			<SidebarItem key={item.path} item={item} collapsed={collapsed} />
		));
	}, [collapsed, SideBarItemsList]);

	return (
		<aside
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
			<VStack role='navigation' gap='8' className={styles.items}>
				{itemList}
			</VStack>
			<div className={styles.switchers}>
				<ThemeSwitcher />
				<LanguageSwitcher short={collapsed} className={styles.lang} />
			</div>
		</aside>
	);
});
