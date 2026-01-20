import React, { useCallback } from 'react';
import styles from './ArticlesPageFilter.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleView, ArticleViewSelector } from 'entities/Article';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
	getArticlePageOrder,
	getArticlePageSearch,
	getArticlePageSort,
	getArticlePageType,
	getArticlePageView
} from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { useSelector } from 'react-redux';
import { articlesPageActions } from 'pages/ArticlesPage/model/slice/articlePageSlice';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { ArticleSortSelector } from 'features/ArticleSortSelector/ArticleSortSelector';
import { ArticleSortField, ArticleType } from 'entities/Article/model/types/article';
import { SortOrder } from 'shared/types/types';
import { fetchArticlesList } from 'pages/ArticlesPage/model/service/fetchArticlesList/fetchArticlesList';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { ArticleTypeTabs } from 'features/ArticleTypeTabs/ArticleTypeTabs';

interface ArticlesPageFilterProps {
	className?: string;
}

export const ArticlesPageFilter: React.FC<ArticlesPageFilterProps> = ({ className }) => {
	const view = useSelector(getArticlePageView);
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const sort = useSelector(getArticlePageSort);
	const search = useSelector(getArticlePageSearch);
	const order = useSelector(getArticlePageOrder);
	const type = useSelector(getArticlePageType);
	const fetchData = useCallback(() => {
		dispatch(fetchArticlesList({ replace: true }));
	}, [dispatch]);

	const debounceFetchData = useDebounce(fetchData, 500);

	const onChangeSort = useCallback(
		(newSort: ArticleSortField) => {
			dispatch(articlesPageActions.setSort(newSort));
			dispatch(articlesPageActions.setPage(1));
			fetchData();
		},
		[dispatch, fetchData]
	);

	const onChangeOrder = useCallback(
		(newOrder: SortOrder) => {
			dispatch(articlesPageActions.setOrder(newOrder));
			dispatch(articlesPageActions.setPage(1));
			fetchData();
		},
		[dispatch, fetchData]
	);

	const onChangeSearch = useCallback(
		(search: string) => {
			dispatch(articlesPageActions.setSearch(search));
			dispatch(articlesPageActions.setPage(1));
			debounceFetchData();
		},
		[dispatch, debounceFetchData]
	);

	const onChangeType = useCallback(
		(value: ArticleType) => {
			dispatch(articlesPageActions.setType(value));
			dispatch(articlesPageActions.setPage(1));
			fetchData();
		},
		[dispatch, fetchData]
	);

	const onViewClick = useCallback(
		(view: ArticleView) => {
			dispatch(articlesPageActions.setView(view));
		},
		[dispatch]
	);

	return (
		<div className={classNames(styles.ArticlesPageFilter, {}, [className])}>
			<div className={styles.sortWrapper}>
				<ArticleSortSelector
					order={order}
					sort={sort}
					onChangeSort={onChangeSort}
					onChangeOrder={onChangeOrder}
				/>
				<ArticleViewSelector view={view} onViewClick={onViewClick} />
			</div>
			<Card className={styles.search}>
				<Input value={search} onChange={onChangeSearch} placeholder={t('search')} />
			</Card>
			<ArticleTypeTabs onChangeType={onChangeType} value={type} className={styles.tabs} />
		</div>
	);
};
