import { getUserAuthData, UserActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import styles from './Navbar.module.scss';

interface NavbarProps {
	className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
	const { t } = useTranslation();
	const [isAuthModal, setIsAuthModal] = useState(false);
	const authData = useSelector(getUserAuthData);
	const dispatch = useDispatch();

	const onCloseModal = useCallback(() => {
		setIsAuthModal(false);
	}, []);

	const onShowModal = useCallback(() => {
		setIsAuthModal(true);
	}, []);

	const onLogout = useCallback(() => {
		dispatch(UserActions.logout());
	}, [dispatch]);

	if (authData) {
		return (
			<div className={classNames(styles.Navbar, {}, [className])}>
				<Button theme={ButtonTheme.CLEAR} className={styles.links} onClick={onLogout}>
					{t('Выйти')}
				</Button>
			</div>
		);
	}

	return (
		<div className={classNames(styles.Navbar, {}, [className])}>
			<Button theme={ButtonTheme.CLEAR} className={styles.links} onClick={onShowModal}>
				{t('Войти')}
			</Button>
			<LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
		</div>
	);
};
