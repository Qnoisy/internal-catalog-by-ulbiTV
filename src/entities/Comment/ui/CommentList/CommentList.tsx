import { Comment } from 'entities/Comment/types/comment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { CommentCard } from '../CommentCard/CommentCard';
import styles from './CommentList.module.scss';

interface CommentListProps {
	className?: string;
	comments?: Comment[];
	isLoading?: boolean;
}

export const CommentList: React.FC<CommentListProps> = ({ className, comments, isLoading }) => {
	const { t } = useTranslation('articles');
	return (
		<div className={classNames(styles.CommentList, {}, [className])}>
			{comments?.length ? (
				comments.map(comment => (
					<CommentCard key={comment.id} className={styles.comment} comment={comment} />
				))
			) : (
				<Text text={t('There are no comments yet')} />
			)}
		</div>
	);
};
