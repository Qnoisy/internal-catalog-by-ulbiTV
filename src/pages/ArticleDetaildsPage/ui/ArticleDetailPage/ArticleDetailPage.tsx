import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { getArticleCommentsIsLoading } from 'pages/ArticleDetaildsPage/model/selectors/comments';
import { fetchCommentByArticleId } from 'pages/ArticleDetaildsPage/model/service/fetchCommentByArticleId';
import {
	articleDetailsCommentsReducer,
	getArticleComments
} from 'pages/ArticleDetaildsPage/model/slice/articleDetailsCommentsSlice';
import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { Text } from 'shared/ui/Text/Text';
import styles from './ArticleDetailPage.module.scss';

interface ArticleDetailPageProps {
	className?: string;
}

const reducerList: ReducersList = {
	articleDetailsComments: articleDetailsCommentsReducer
};

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ className }) => {
	const { id } = useParams<{ id: string }>();
	const { t } = useTranslation('articles');
	const dispatch = useDispatch();
	const comments = useSelector(getArticleComments.selectAll);
	const isLoading = useSelector(getArticleCommentsIsLoading);
	// const error = useSelector(getArticleCommentsError);

	useEffect(() => {
		dispatch(fetchCommentByArticleId(id));
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
			<div className={classNames(styles.ArticleDetailPage, {}, [className])}>
				<ArticleDetails id={id} />
				<Text className={styles.commentTitle} title={t('CommentTitle')} />
				<CommentList isLoading={isLoading} comments={comments} />
			</div>
		</DynamicModuleLoader>
	);
};
export default memo(ArticleDetailPage);
