import React, { ReactChild, useCallback, useEffect, useRef, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Portal } from '../Portal/Portal';
import styles from './Modal.module.scss';

interface ModalProps {
	className?: string;
	isOpen?: boolean;
	onClose?: () => void;
	children: ReactChild;
	lazy?: boolean;
}
const ANIMATION_DELAY = 300;

export const Modal: React.FC<ModalProps> = (props: ModalProps) => {
	const { className, isOpen, onClose, children, lazy } = props;
	const [isMount, setIsMount] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const timeRef = useRef<ReturnType<typeof setTimeout>>();

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
			setIsMount(true);
		}
	}, [isOpen]);

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

	if (lazy && !isMount) {
		return null;
	}

	return (
		<Portal>
			<div className={classNames(styles.Modal, mods, [className])}>
				<div onClick={handlerClose} className={styles.overlay}>
					<div onClick={stopProp} className={styles.content}>
						{children}
					</div>
				</div>
			</div>
		</Portal>
	);
};
