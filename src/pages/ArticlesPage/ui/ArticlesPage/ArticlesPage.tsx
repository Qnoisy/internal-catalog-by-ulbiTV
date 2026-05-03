import { articlesPageReducer } from 'pages/ArticlesPage/model/slice/articlePageSlice';
import React, { memo, useCallback, useEffect } from 'react';

import {
	DynamicModuleLoader,
	ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import { fetchNextArticlesPage } from 'pages/ArticlesPage/model/service/fetchNextArticlesPage/fetchNextArticlesPage';
import { useSearchParams } from 'react-router-dom';
import { initArticlesPage } from 'pages/ArticlesPage/model/service/initArticlePage/initArticlePage';
import { useSelector } from 'react-redux';
import {
	getArticlePageHasMore,
	getArticlePageisLoading
} from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';

interface ArticlesPageProps {
	className?: string;
}

const reducers: ReducersList = {
	articlesPage: articlesPageReducer
};

const ArticlesPage: React.FC<ArticlesPageProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();
	const isLoading = useSelector(getArticlePageisLoading);
	const hasMore = useSelector(getArticlePageHasMore);

	useEffect(() => {
		dispatch(initArticlesPage(searchParams));
	}, []);

	const onLoadNextpart = useCallback(() => {
		if (!isLoading && hasMore) {
			dispatch(fetchNextArticlesPage());
		}
	}, [dispatch, isLoading, hasMore]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
			<ArticleInfiniteList onLoadNextpart={onLoadNextpart} />
		</DynamicModuleLoader>
	);
};
export default memo(ArticlesPage);
