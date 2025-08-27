import { useTheme } from 'app/providers/ThemeProvider';
import React, { ReactChild, useCallback, useEffect, useRef, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Portal } from '../Portal/Portal';
import styles from './Modal.module.scss';

interface ModalProps {
	className?: string;
	isOpen?: boolean;
	onClose?: () => void;
	children: ReactChild;
}
const ANIMATION_DELAY = 300;

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
	const { className, isOpen, onClose, children } = props;
	const [isClosing, setIsClosing] = useState(false);
	const timeRef = useRef<ReturnType<typeof setTimeout>>();
	const { theme } = useTheme();

	const mods: Record<string, boolean> = {
		[styles.opened]: isOpen,
		[styles.isClosing]: isClosing
	};

	const handlerClose = useCallback(() => {
		if (onClose) {
			setIsClosing(true);
			timeRef.current = setTimeout(() => {
				onClose();
				setIsClosing(false);
			}, ANIMATION_DELAY);
		}
	}, [onClose]);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				handlerClose();
			}
		},
		[handlerClose]
	);

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyDown);
		}

		return () => {
			removeEventListener('keydown', onKeyDown);
			clearInterval(timeRef.current);
		};
	}, [isOpen, onKeyDown]);

	const stopProp = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<Portal>
			<div className={classNames(styles.Modal, mods, [className, theme])}>
				<div onClick={handlerClose} className={styles.overlay}>
					<div onClick={stopProp} className={styles.content}>
						{children}
					</div>
				</div>
			</div>
		</Portal>
	);
};
