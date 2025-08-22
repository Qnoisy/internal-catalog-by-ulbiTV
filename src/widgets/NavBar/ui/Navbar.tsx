import { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Modal } from 'shared/ui/Modal/Modal';
import styles from './Navbar.module.scss';

interface NavbarProps {
	className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
	const [isAuthModal, setIsAuthModal] = useState(false);

	const onTogleModal = useCallback(() => {
		setIsAuthModal(prev => !prev);
	}, []);

	return (
		<div className={classNames(styles.Navbar, {}, [className])}>
			<div className={styles.links}>
				<Button theme={ButtonTheme.CLEAR} onClick={onTogleModal}>
					toggle
				</Button>
				<Modal isOpen={isAuthModal} onClose={() => setIsAuthModal(false)}>
					<div>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis, reiciendis?
					</div>
				</Modal>
			</div>
		</div>
	);
};
