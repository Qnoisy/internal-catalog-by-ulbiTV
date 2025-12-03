import { Comment } from 'entities/Comment/types/comment';
import React from 'react';
import { useParams } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text } from 'shared/ui/Text/Text';
import styles from './CommentCard.module.scss';

interface CommentCardProps {
	className?: string;
	comment?: Comment;
	isLoading?: boolean;
}

export const CommentCard: React.FC<CommentCardProps> = ({ className, comment, isLoading }) => {
	const { id } = useParams<{ id: string }>();

	if (isLoading) {
		return (
			<div className={classNames(styles.CommentCard, {}, [className])}>
				<div className={styles.header}>
					<Skeleton className={styles.avatar} width={30} height={30} border='50%' />
					<Skeleton className={styles.title} width={100} height={16} />
				</div>
				<Skeleton className={styles.title} width={'100%'} height={50} />
			</div>
		);
	}

	if (!comment) {
		return null;
	}

	return (
		<div className={classNames(styles.CommentCard, {}, [className])}>
			<AppLink to={`${RoutePath.profile}${comment.user.id}`} className={styles.header}>
				{comment.user.avatar && <Avatar src={comment.user.avatar} size={30} />}
				<Text title={comment.user.username} />
			</AppLink>
			<Text text={comment.text} />
		</div>
	);
};
