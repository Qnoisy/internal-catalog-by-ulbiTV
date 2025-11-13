import {
	getArticleDetailsData,
	getArticleDetailsError
} from 'entities/Article/model/selectors/articleDetails';
import { fetchArticleById } from 'entities/Article/model/service/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import styles from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
	className?: string;
	id: string;
}

const reducers: ReducersList = {
	articleDetails: articleDetailsReducer
};

export const ArticleDetails: React.FC<ArticleDetailsProps> = memo(({ className, id }) => {
	const { t } = useTranslation();
	//	const isLoading = useSelector(getArticleDetailsIsloading);
	const isLoading = true;
	const error = useSelector(getArticleDetailsError);
	const data = useSelector(getArticleDetailsData);

	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchArticleById(id));
	}, [dispatch, id]);
	let content;
	if (isLoading) {
		content = (
			<>
				<Skeleton className={styles.avatar} width={200} height={200} border='50%' />
				<Skeleton className={styles.title} width={300} height={32} />
				<Skeleton className={styles.skeleton} width={600} height={24} />
				<Skeleton className={styles.skeleton} width='100%' height={200} />
				<Skeleton className={styles.skeleton} width='100%' height={200} />
			</>
		);
	} else if (error) {
		return <Text text={t('error article')} align={TextAlign.CENTER} />;
	} else {
		content = <div className={classNames(styles.ArticleDetails, {}, [className])}>yes</div>;
	}
	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			{content}
		</DynamicModuleLoader>
	);
});
