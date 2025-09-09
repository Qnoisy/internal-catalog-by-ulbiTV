import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { LoginForm } from '../LoginForm/LoginForm';
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
		>
			<LoginForm />
		</Modal>
	);
};
