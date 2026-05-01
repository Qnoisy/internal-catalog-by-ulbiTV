import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

interface useModalProps {
	onClose?: () => void;
	isOpen?: boolean;
	animationDelay?: number;
}

export function useModal(props: useModalProps) {
	const { onClose, isOpen, animationDelay } = props;

	const [isMounted, setIsMount] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

	const close = useCallback(() => {
		if (onClose) {
			setIsClosing(true);
			timerRef.current = setTimeout(() => {
				onClose();
				setIsClosing(false);
			}, animationDelay);
		}
	}, [onClose, animationDelay]);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				close();
			}
		},
		[close]
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
			clearTimeout(timerRef.current);
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen, onKeyDown]);

	return { isClosing, close, isMounted };
}
