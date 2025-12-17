import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';

import { ArticleView, ArticleViewSelector } from 'entities/Article';
import {
	getArticlePageError,
	getArticlePageHasMore,
	getArticlePageisLoading,
	getArticlePageNum,
	getArticlePageView
} from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { fetchArticlesList } from 'pages/ArticlesPage/model/service/fetchArticlesList/fetchArticlesList';
import {
	articlesPageActions,
	articlesPageReducer,
	getArticles
} from 'pages/ArticlesPage/model/slice/articlePageSlice';
import React, { memo, MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import styles from './ArticlesPage.module.scss';
import { Page } from 'shared/ui/Page/Page';
import { log } from 'node:console';
import { fetchNextArticlesPage } from 'pages/ArticlesPage/model/service/fetchNextArticlesPage/fetchNextArticlesPage';

interface ArticlesPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articlesPage: articlesPageReducer
};

const ArticlesPage: React.FC<ArticlesPageProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const articles = useSelector(getArticles.selectAll);
	const isLoading = useSelector(getArticlePageisLoading);
	// const error = useSelector(getArticlePageError);
	const view = useSelector(getArticlePageView);
	// const page = useSelector(getArticlePageNum);
	// const hasMore = useSelector(getArticlePageHasMore);

	useEffect(() => {
		dispatch(articlesPageActions.initState());
		dispatch(fetchArticlesList({ page: 1 }));
	}, [dispatch]);

	const onLoadNextpart = useCallback(() => {
		dispatch(fetchNextArticlesPage());
	}, [dispatch]);

	const onViewClick = useCallback(
		(view: ArticleView) => {
			dispatch(articlesPageActions.setView(view));
		},
		[dispatch]
	);

	return (
		<DynamicModuleLoader reducers={reducers}>
			<Page
				onScrollEnd={onLoadNextpart}
				className={classNames(styles.ArticlesPage, {}, [className])}
			>
				<ArticleViewSelector view={view} onViewClick={onViewClick} />
				<ArticleList articles={articles} view={view} isLoading={isLoading} />
			</Page>
		</DynamicModuleLoader>
	);
};
export default memo(ArticlesPage);
