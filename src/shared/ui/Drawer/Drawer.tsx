import React, { memo, ReactNode, useCallback, useEffect } from 'react';
import styles from './Drawer.module.scss';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { Portal } from '@headlessui/react';
import { Overlay } from '../Overlay/Overlay';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { useAnimationLibs } from '@/shared/lib/components/AnimationProvider';

interface DrawerProps {
	className?: string;
	children: ReactNode;
	isOpen?: boolean;
	onClose?: () => void;
	lazy?: boolean;
}

const height = window.innerHeight - 100;

const DrawerContent: React.FC<DrawerProps> = memo(props => {
	const { children, className, isOpen, onClose, lazy } = props;
	const { theme } = useTheme();

	const { Spring, Gesture } = useAnimationLibs();

	const { isClosing, close, isMounted } = useModal({
		animationDelay: 300,
		isOpen,
		onClose
	});

	const [{ y }, api] = Spring.useSpring(() => ({ y: height }));

	const openDrawer = useCallback(() => {
		api.start({ y: 0, immediate: false });
	}, [api]);

	useEffect(() => {
		if (isOpen) {
			openDrawer();
		}
	}, [api, isOpen, openDrawer]);

	const closeDrawer = (velocity = 0) => {
		api.start({
			y: height,
			immediate: false,
			config: { ...Spring.config.stiff, velocity },
			onResolve: onClose
		});
	};

	const bind = Gesture.useDrag(
		({ last, velocity: [, vy], direction: [, dy], offset: [, oy], cancel }) => {
			if (oy < -70) cancel();
			if (last) {
				oy > height * 0.5 || (vy > 0.5 && dy > 0) ? closeDrawer() : openDrawer();
			} else api.start({ y: oy, immediate: true });
		},
		{ from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true }
	);

	if (!isOpen) {
		return null;
	}

	const display = y.to(py => (py < height ? 'block' : 'none'));

	return (
		<Portal>
			<div className={classNames(styles.Drawer, {}, [className, theme, 'app_drawer'])}>
				<Overlay onClick={close} />
				<Spring.a.div
					className={styles.sheet}
					style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
					{...bind()}
				>
					{children}
				</Spring.a.div>
			</div>
		</Portal>
	);
});

export const Drawer = memo((props: DrawerProps) => {
	const { isLoaded } = useAnimationLibs();

	if (!isLoaded) {
		return null;
	}

	return <DrawerContent {...props} />;
});
