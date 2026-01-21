import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import AddCommentForm from 'features/AddCommentForm/ui/AddCommentForm/AddCommentForm';
import { getArticleCommentsIsLoading } from 'pages/ArticleDetaildsPage/model/selectors/comments';

import { addCommentFormArticle } from 'pages/ArticleDetaildsPage/model/service/addCommentFormArticle';
import { fetchCommentsByArticleId } from 'pages/ArticleDetaildsPage/model/service/fetchCommentByArticleId';
import {
	articleDetailsCommentsReducer,
	getArticleComments
} from 'pages/ArticleDetaildsPage/model/slice/articleDetailsCommentsSlice';
import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text, TextSize } from 'shared/ui/Text/Text';
import styles from './ArticleDetailPage.module.scss';
import { Page } from 'widgets/Page/Page';

import { getArticleRecommendationsIsLoading } from 'pages/ArticleDetaildsPage/model/selectors/recomendations';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { fetchArticleRecommendations } from 'pages/ArticleDetaildsPage/model/service/fetchArticleRecommendations';
import { articleDetailsRecommendationsReducer, getArticleRecommendations } from 'pages/ArticleDetaildsPage/model/slice/articleDetailsRecommendationsSlice';
import { articleDetailsPageReducer } from 'pages/ArticleDetaildsPage/model/slice';

interface ArticleDetailPageProps {
	className?: string;
}

const reducerList: ReducersList = {
	articleDetailsPage: articleDetailsPageReducer
};

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ className }) => {
	const { id } = useParams<{ id: string }>();
	const { t } = useTranslation('articles');
	const dispatch = useAppDispatch();
	const comments = useSelector(getArticleComments.selectAll);
	const isLoading = useSelector(getArticleCommentsIsLoading);
	const navigate = useNavigate();
	const recommendations = useSelector(getArticleRecommendations.selectAll);
	const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);
	// const error = useSelector(getArticleCommentsError);

	useEffect(() => {
		dispatch(fetchCommentsByArticleId(id));
		dispatch(fetchArticleRecommendations());
	}, []);

	const onSendComment = useCallback(
		(text: string) => {
			dispatch(addCommentFormArticle(text));
		},
		[dispatch]
	);

	const onBackToList = useCallback(() => {
		navigate(RoutePath.articles);
	}, []);

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
				<Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
					{t('backToList')}
				</Button>
				<ArticleDetails id={id} />
				<Text size={TextSize.L} className={styles.commentTitle} title={t('Recommends')} />
				<ArticleList target='_blanck' articles={recommendations} isLoading={recommendationsIsLoading} className={styles.recomendations}/>
				<Text size={TextSize.L} className={styles.commentTitle} title={t('CommentTitle')} />
				<AddCommentForm onSendComment={onSendComment} />
				<CommentList isLoading={isLoading} comments={comments} />
			</Page>
		</DynamicModuleLoader>
	);
};
export default memo(ArticleDetailPage);
