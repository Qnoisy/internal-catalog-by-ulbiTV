import React, { memo, ReactNode } from 'react';
import styles from './Drawer.module.scss';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Portal } from '@headlessui/react';
import { Overlay } from '../Overlay/Overlay';
import { useModal } from 'shared/lib/hooks/useModal/useModal';

interface DrawerProps {
	className?: string;
	children: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
	lazy?: boolean;
}

export const Drawer: React.FC<DrawerProps> = memo(props => {
	const { children, className, isOpen, onClose, lazy } = props;
	const { theme } = useTheme();

	const { isClosing, close, isMounted } = useModal({
		animationDelay: 300,
		isOpen,
		onClose
	});

	const mods: Mods = {
		[styles.opened]: isOpen,
		[styles.isClosing]: isClosing
	};
	if (lazy && !isMounted) {
		return null;
	}

	return (
		<Portal>
			<div className={classNames(styles.Drawer, mods, [className, theme, 'app_drawer'])}>
				<Overlay onClick={close}>
					<div className={styles.content}>{children}</div>
				</Overlay>
			</div>
		</Portal>
	);
});
