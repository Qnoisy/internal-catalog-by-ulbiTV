import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import AddCommentForm from 'features/AddCommentForm/ui/AddCommentForm/AddCommentForm';
import { getArticleCommentsIsLoading } from 'pages/ArticleDetaildsPage/model/selectors/comments';
import { addCommentFormArticle } from 'pages/ArticleDetaildsPage/model/service/addCommentFormArticle';
import { fetchCommentsByArticleId } from 'pages/ArticleDetaildsPage/model/service/fetchCommentByArticleId';
import { getArticleComments } from 'pages/ArticleDetaildsPage/model/slice/articleDetailsCommentsSlice';
import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextSize } from 'shared/ui/Text/Text';
import styles from './ArticleDetailPage.module.scss';
import { Page } from 'widgets/Page/Page';

import { articleDetailsPageReducer } from 'pages/ArticleDetaildsPage/model/slice';
import { ArticleDetailPageHeader } from '../ArticleDetailPageHeader/ArticleDetailPageHeader';
import { VStack } from 'shared/ui/Stack';
import { ArticleRecommendationsList } from 'features/articleRecommendationsList';

interface ArticleDetailPageProps {
	className?: string;
}

const reducerList: ReducersList = {
	articleDetailsPage: articleDetailsPageReducer
};

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ className }) => {
	const { id } = useParams<{ id: string }>();
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const comments = useSelector(getArticleComments.selectAll);
	const isLoading = useSelector(getArticleCommentsIsLoading);

	useEffect(() => {
		dispatch(fetchCommentsByArticleId(id));
	}, []);

	const onSendComment = useCallback(
		(text: string) => {
			dispatch(addCommentFormArticle(text));
		},
		[dispatch]
	);

	if (!id) {
		return (
			<div className={classNames(styles.ArticleDetailPage, {}, [className])}>
				{t('Article not found')}
			</div>
		);
	}

	return (
		<DynamicModuleLoader reducers={reducerList} removeAfterUnmount>
			<Page className={classNames(styles.ArticleDetailPage, {}, [className])}>
				<VStack gap={'16'} max>
					<ArticleDetailPageHeader />
					<ArticleDetails id={id} />
					<ArticleRecommendationsList />
					<Text size={TextSize.L} className={styles.commentTitle} title={t('CommentTitle')} />
					<AddCommentForm onSendComment={onSendComment} />
					<CommentList isLoading={isLoading} comments={comments} />
				</VStack>
			</Page>
		</DynamicModuleLoader>
	);
};
export default memo(ArticleDetailPage);
