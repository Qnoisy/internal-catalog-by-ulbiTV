import React, { ReactNode } from 'react';
import styles from './Overlay.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface OverlayProps {
	className?: string;
	onClick?: () => void;
	children: ReactNode;
}

export const Overlay: React.FC<OverlayProps> = ({ className, onClick, children }) => {
	return (
		<div onClick={onClick} className={classNames(styles.Overlay, {}, [className])}>
			{children}
		</div>
	);
};
