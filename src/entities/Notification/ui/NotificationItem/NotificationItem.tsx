import { memo } from 'react';
import styles from './NotificationItem.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardTheme } from '@/shared/ui/Card/Card';
import { Text } from '@/shared/ui/Text/Text';
import { Notification } from '@/entities/Notification/model/types/notifications';

interface NotificationItemProps {
	className?: string;
	item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
	const { className, item } = props;

	const content = (
		<Card
			theme={CardTheme.OUTLINED}
			className={classNames(styles.NotificationItem, {}, [className])}
		>
			<Text title={item.title} text={item.description} />
		</Card>
	);

	if (item.href) {
		return (
			<a className={styles.link} href={item.href} rel='noreferrer' target='_blank'>
				{content}
			</a>
		);
	} else {
		return content;
	}
});
