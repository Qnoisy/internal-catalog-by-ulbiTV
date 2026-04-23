import React from 'react';
import styles from './NotificationList.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useNotification } from 'entities/Notification/api/notificationApi';
import { VStack } from 'shared/ui/Stack';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';

interface NotificationListProps {
	className?: string;
}

export const NotificationList: React.FC<NotificationListProps> = ({ className }) => {
	const { data, isLoading } = useNotification(null, {
		pollingInterval: 5000
	});

	if (isLoading) {
		return (
			<VStack max gap='16' className={classNames(styles.NotificationList, {}, [className])}>
				<Skeleton width={'100%'} border={'8px'} height={'80px'} />
				<Skeleton width={'100%'} border={'8px'} height={'80px'} />
				<Skeleton width={'100%'} border={'8px'} height={'80px'} />
			</VStack>
		);
	}

	return (
		<VStack gap={'16'} max className={classNames(styles.NotificationList, {}, [className])}>
			{data?.map(item => (
				<NotificationItem key={item.id} item={item} />
			))}
		</VStack>
	);
};
