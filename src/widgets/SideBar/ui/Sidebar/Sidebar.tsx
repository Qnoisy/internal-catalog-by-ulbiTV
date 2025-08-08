import { useState } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { LanguageSwitcher } from 'widgets/LanguageSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import styles from './Sidebar.module.scss';

interface SidebarProps {
	className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
	const [collapsed, setCollapsed] = useState(false);

	const onToggle = () => {
		setCollapsed(prev => !prev);
	};

	return (
		<div
			data-testid={'sidebar'}
			className={classNames(styles.Sidebar, { [styles.collapsed]: collapsed }, [
				className,
			])}
		>
			<button data-testid={'sidebar-toggle'} onClick={onToggle}>
				toggle
			</button>
			<div className={styles.switchers}>
				<ThemeSwitcher />
				<LanguageSwitcher className={styles.language} />
			</div>
		</div>
	);
};
