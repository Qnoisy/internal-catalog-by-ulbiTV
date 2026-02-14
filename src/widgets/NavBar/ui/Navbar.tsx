import { getUserAuthData, UserActions } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import styles from './Navbar.module.scss';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import Dropdown from 'shared/ui/DropDown/DropDown';
import { Avatar } from 'shared/ui/Avatar/Avatar';

interface NavbarProps {
	className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
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
			<header className={classNames(styles.Navbar, {}, [className])}>
				<Text className={styles.appName} title={t('Ulbi TV app')} theme={TextTheme.INVERTED} />
				<AppLink
					className={styles.appLink}
					theme={AppLinkTheme.PRIMARY}
					to={RoutePath.article_create}
				>
					{t('create article')}
				</AppLink>

				<Dropdown
					className={styles.links}
					items={[
						{
							href: RoutePath.profile + authData.id,
							content: t('profile')
						},
						{
							onClick: onLogout,
							content: t('Logout')
						}
					]}
					trigger={<Avatar src={authData.avatar} size={50} />}
				/>
			</header>
		);
	}

	return (
		<header className={classNames(styles.Navbar, {}, [className])}>
			<Button theme={ButtonTheme.CLEAR} className={styles.links} onClick={onShowModal}>
				{t('Login')}
			</Button>
			<LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
		</header>
	);
});
