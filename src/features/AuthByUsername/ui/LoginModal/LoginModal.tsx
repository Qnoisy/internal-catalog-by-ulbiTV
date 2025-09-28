import React, { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Loader } from 'shared/ui/Loader/Loader';
import { Modal } from 'shared/ui/Modal/Modal';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import styles from './LoginModal.module.scss';

interface LoginModalProps {
	isOpen: boolean;
	onClose: () => void;
	className?: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({ className, isOpen, onClose }) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className={classNames(styles.LoginModal, {}, [className])}
			lazy
		>
			<Suspense fallback={<Loader />}>
				<LoginFormAsync onSuccess={onClose} />
			</Suspense>
		</Modal>
	);
};
