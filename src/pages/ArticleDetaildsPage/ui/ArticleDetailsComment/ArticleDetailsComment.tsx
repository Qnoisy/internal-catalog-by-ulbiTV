import React, { Suspense, useCallback, useEffect } from 'react';
import styles from './ArticleDetailsComment.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AddCommentForm } from '@/features/AddCommentForm';
import { CommentList } from '@/entities/Comment';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { getArticleComments } from '@/pages/ArticleDetaildsPage/model/slice/articleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from '@/pages/ArticleDetaildsPage/model/selectors/comments';
import { useSelector } from 'react-redux';
import { addCommentFormArticle } from '@/pages/ArticleDetaildsPage/model/service/addCommentFormArticle';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { fetchCommentsByArticleId } from '@/pages/ArticleDetaildsPage/model/service/fetchCommentByArticleId';

interface ArticleDetailsCommentProps {
	className?: string;
	id: string;
}

export const ArticleDetailsComment: React.FC<ArticleDetailsCommentProps> = ({ className, id }) => {
	const comments = useSelector(getArticleComments.selectAll);
	const isLoading = useSelector(getArticleCommentsIsLoading);
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	useEffect(() => {
		dispatch(fetchCommentsByArticleId(id));
	}, []);

	const onSendComment = useCallback(
		(text: string) => {
			dispatch(addCommentFormArticle(text));
		},
		[dispatch]
	);

	return (
		<div className={classNames(styles.ArticleDetailsComment, {}, [className])}>
			<Text size={TextSize.L} className={styles.commentTitle} title={t('CommentTitle')} />
			<Suspense fallback={t('loading')}>
				<AddCommentForm onSendComment={onSendComment} />
			</Suspense>
			<CommentList isLoading={isLoading} comments={comments} />
		</div>
	);
};
