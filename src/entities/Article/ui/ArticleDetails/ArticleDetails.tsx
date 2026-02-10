import {
	getArticleDetailsData,
	getArticleDetailsError,
	getArticleDetailsIsLoading
} from 'entities/Article/model/selectors/getArticleDetails';
import { fetchArticleById } from 'entities/Article/model/service/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { ArticleBlock, ArticleBlockType } from 'entities/Article/model/types/article';
import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Icon } from 'shared/ui/Icon/Icon';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import styles from './ArticleDetails.module.scss';
import { HStack, VStack } from 'shared/ui/Stack';

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
	const isLoading = useSelector(getArticleDetailsIsLoading);
	const error = useSelector(getArticleDetailsError);
	const data = useSelector(getArticleDetailsData);

	const renderBlock = useCallback((block: ArticleBlock) => {
		switch (block.type) {
			case ArticleBlockType.CODE:
				return <ArticleCodeBlockComponent key={block.id} block={block} className={styles.block} />;

			case ArticleBlockType.TEXT:
				return <ArticleTextBlockComponent key={block.id} className={styles.block} block={block} />;

			case ArticleBlockType.IMAGE:
				return <ArticleImageBlockComponent key={block.id} block={block} className={styles.block} />;

			default:
				return null;
		}
	}, []);

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
		content = (
			<>
				<HStack justify='center' max className={styles.avatarWrapper}>
					<Avatar size={200} src={data?.img} />
				</HStack>
				<VStack gap='4' max>
					<Text title={data?.title} text={data?.subtitle} size={TextSize.L} />
					<HStack gap='8'>
						<Icon Svg={EyeIcon} />
						<Text text={String(data?.views)} />
					</HStack>
					<HStack gap='8'>
						<Icon Svg={CalendarIcon} />
						<Text text={data?.createdAt} />
					</HStack>
				</VStack>
				{data?.blocks.map(renderBlock)}
			</>
		);
	}
	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<VStack gap='16'>{content}</VStack>
		</DynamicModuleLoader>
	);
});
