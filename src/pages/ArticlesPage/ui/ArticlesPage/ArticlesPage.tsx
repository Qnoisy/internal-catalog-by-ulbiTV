import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';

import { ArticleView, ArticleViewSelector } from 'entities/Article';
import {
	getArticlePageError,
	getArticlePageHasMore,
	getArticlePageInited,
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
import { Page } from 'widgets/Page/Page';
import { fetchNextArticlesPage } from 'pages/ArticlesPage/model/service/fetchNextArticlesPage/fetchNextArticlesPage';

import { ArticlesPageFilter } from '../ArticlesPageFilter/ArticlesPageFilter';
import { useSearchParams } from 'react-router-dom';
import { initArticlesPage } from 'pages/ArticlesPage/model/service/initArticlePage/initArticlePage';

interface ArticlesPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articlesPage: articlesPageReducer
};

const ArticlesPage: React.FC<ArticlesPageProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const articles = useSelector(getArticles.selectAll);
	const view = useSelector(getArticlePageView);
	const [searchParams] = useSearchParams();
	// const error = useSelector(getArticlePageError);
	const isLoading = useSelector(getArticlePageisLoading);
	const hasMore = useSelector(getArticlePageHasMore);

	useEffect(() => {
		dispatch(initArticlesPage(searchParams));
	}, []);

	const onLoadNextpart = useCallback(() => {
		if (!isLoading && hasMore) {
			console.log('LOAD NEXT');
			dispatch(fetchNextArticlesPage());
		}
	}, [dispatch, isLoading, hasMore]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
			<ArticleList
				articles={articles}
				view={view}
				isLoading={isLoading}
				onLoadNextpart={onLoadNextpart}
			/>
		</DynamicModuleLoader>
	);
};
export default memo(ArticlesPage);
