import React, { ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Portal } from '../Portal/Portal';
import styles from './Modal.module.scss';
import { Overlay } from '../Overlay/Overlay';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';

interface ModalProps {
	className?: string;
	isOpen?: boolean;
	onClose?: () => void;
	children: ReactNode;
	lazy?: boolean;
}
const ANIMATION_DELAY = 300;

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
	const { onClose, isOpen, lazy, children, className } = props;

	const { isClosing, close, isMounted } = useModal({
		animationDelay: ANIMATION_DELAY,
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

	const stopProp = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<Portal>
			<div className={classNames(styles.Modal, mods, [className])}>
				<Overlay onClick={close} />
				<div onClick={stopProp} className={styles.content}>
					{children}
				</div>
			</div>
		</Portal>
	);
};
