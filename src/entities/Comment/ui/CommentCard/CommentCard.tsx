import { Comment } from 'entities/Comment/types/comment';
import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text } from 'shared/ui/Text/Text';
import styles from './CommentCard.module.scss';

interface CommentCardProps {
	className?: string;
	comment: Comment;
	isLoading?: boolean;
}

export const CommentCard: React.FC<CommentCardProps> = ({ className, comment, isLoading }) => {
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

	return (
		<div className={classNames(styles.CommentCard, {}, [className])}>
			<div className={styles.header}>
				{comment.user.avatar && <Avatar src={comment.user.avatar} size={30} />}
				<Text title={comment.user.username} />
			</div>
			<Text text={comment.text} />
		</div>
	);
};
