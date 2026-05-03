import React, { useCallback, useState } from 'react';
import styles from './NotificationButton.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/ui/Icon/Icon';
import NotificationIcon from 'shared/assets/icons/notification.svg';
import { Popover } from 'shared/ui/Popups';
import { NotificationList } from 'entities/Notification';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Drawer } from 'shared/ui/Drawer/Drawer';
import { BrowserView, MobileView } from 'react-device-detect';
import { AnimationProvider } from 'shared/lib/components/AnimationProvider';

interface NotificationButtonProps {
	className?: string;
}

export const NotificationButton: React.FC<NotificationButtonProps> = ({ className }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handlerOpen = useCallback(() => {
		setIsOpen(true);
	}, []);

	const handlerClose = useCallback(() => {
		setIsOpen(false);
	}, []);

	const trigger = (
		<Button onClick={handlerOpen} theme={ButtonTheme.CLEAR}>
			<Icon Svg={NotificationIcon} inverted />
		</Button>
	);

	return (
		<div>
			<BrowserView>
				<Popover
					className={classNames(styles.NotificationButton, {}, [className])}
					direction='bottom left'
					trigger={trigger}
				>
					<NotificationList className={styles.notifications} />
				</Popover>
			</BrowserView>
			<MobileView>
				{trigger}
				<AnimationProvider>
					<Drawer isOpen={isOpen} onClose={handlerClose}>
						<NotificationList />
					</Drawer>
				</AnimationProvider>
			</MobileView>
		</div>
	);
};
