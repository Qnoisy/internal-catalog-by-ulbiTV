import { LoginModal } from 'features/AuthByUsername';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import styles from './Navbar.module.scss';

interface NavbarProps {
	className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
	const [isAuthModal, setIsAuthModal] = useState<boolean>(false);
	const { t } = useTranslation();
	const onCloseModal = useCallback(() => {
		setIsAuthModal(false);
	}, []);
	const onShowModal = useCallback(() => {
		setIsAuthModal(true);
	}, []);

	return (
		<div className={classNames(styles.Navbar, {}, [className])}>
			<div className={styles.links}>
				<Button theme={ButtonTheme.CLEAR} onClick={onShowModal}>
					{t('LogIn')}
				</Button>
				<LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
			</div>
		</div>
	);
};
