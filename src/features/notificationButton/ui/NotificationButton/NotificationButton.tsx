import React from 'react';
import styles from './NotificationButton.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/ui/Icon/Icon';
import NotificationIcon from 'shared/assets/icons/notification.svg';
import { Popover } from 'shared/ui/Popups';
import { NotificationList } from 'entities/Notification';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

interface NotificationButtonProps {
	className?: string;
}

export const NotificationButton: React.FC<NotificationButtonProps> = ({ className }) => {
	return (
		<div>
			<Popover
				className={classNames(styles.NotificationButton, {}, [className])}
				direction={'bottom left'}
				trigger={
					<Button theme={ButtonTheme.CLEAR}>
						<Icon Svg={NotificationIcon} inverted></Icon>
					</Button>
				}
			>
				<NotificationList className={styles.notifications} />
			</Popover>
		</div>
	);
};
