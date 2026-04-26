import React, { memo, ReactNode } from 'react';
import styles from './Drawer.module.scss';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Portal } from '@headlessui/react';
import { Overlay } from '../Overlay/Overlay';

interface DrawerProps {
	className?: string;
	children: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
}

export const Drawer: React.FC<DrawerProps> = memo(props => {
	const { children, className, isOpen, onClose } = props;
	const { theme } = useTheme();

	const mods: Mods = {
		[styles.opened]: isOpen
	};

	return (
		<Portal>
			<div className={classNames(styles.Drawer, mods, [className, theme, 'app_drawer'])}>
				<Overlay onClick={onClose}>
					<div className={styles.content}>{children}</div>
				</Overlay>
			</div>
		</Portal>
	);
});
