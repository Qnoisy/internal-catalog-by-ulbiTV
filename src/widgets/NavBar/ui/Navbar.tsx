import { LoginModal } from 'features/AuthByUsername';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import styles from './Navbar.module.scss';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

import { HStack } from 'shared/ui/Stack';

import { NotificationButton } from 'features/notificationButton';
import { AvatarDropdow } from 'features/avatarDropdown';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';

interface NavbarProps {
	className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
	const [isAuthModal, setIsAuthModal] = useState(false);
	const { t } = useTranslation();
	const authData = useSelector(getUserAuthData);

	const onCloseModal = useCallback(() => {
		setIsAuthModal(false);
	}, []);

	const onShowModal = useCallback(() => {
		setIsAuthModal(true);
	}, []);

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
				<HStack align='center' gap='16' className={styles.actions}>
					<NotificationButton />
					<AvatarDropdow />
				</HStack>
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
