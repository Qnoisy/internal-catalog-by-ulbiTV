import { ArticleDetails } from 'entities/Article';
import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import styles from './ArticleDetailPage.module.scss';
import { Page } from 'widgets/Page/Page';

import { articleDetailsPageReducer } from 'pages/ArticleDetaildsPage/model/slice';
import { ArticleDetailPageHeader } from '../ArticleDetailPageHeader/ArticleDetailPageHeader';
import { VStack } from 'shared/ui/Stack';
import { ArticleRecommendationsList } from 'features/articleRecommendationsList';
import { ArticleDetailsComment } from '../ArticleDetailsComment/ArticleDetailsComment';
import { useTranslation } from 'react-i18next';

interface ArticleDetailPageProps {
	className?: string;
}

const reducerList: ReducersList = {
	articleDetailsPage: articleDetailsPageReducer
};

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ className }) => {
	const { t } = useTranslation();
	const { id } = useParams<{ id: string }>();

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
					<ArticleDetailsComment id={id} />
				</VStack>
			</Page>
		</DynamicModuleLoader>
	);
};
export default memo(ArticleDetailPage);
