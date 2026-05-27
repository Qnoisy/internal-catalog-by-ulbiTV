import React, { useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getArticleCanEdit } from '@/pages/ArticleDetaildsPage/model/selectors/article';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/Stack';
import { getRouteArticleDetails, getRouteArticles } from '@/shared/const/router';

interface ArticleDetailPageHeaderProps {
	className?: string;
}

export const ArticleDetailPageHeader: React.FC<ArticleDetailPageHeaderProps> = ({ className }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const canEdit = useSelector(getArticleCanEdit);
	const article = useSelector(getUserAuthData);

	const onBackToList = useCallback(() => {
		navigate(getRouteArticles());
	}, []);

	const onEditArticle = useCallback(() => {
		if (article) {
			navigate(getRouteArticleDetails(article.id));
		}
	}, [article, navigate]);

	return (
		<HStack justify='between' max className={classNames('', {}, [className])}>
			<Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
				{t('backToList')}
			</Button>
			{canEdit && (
				<Button theme={ButtonTheme.OUTLINE} onClick={onEditArticle}>
					{t('edit')}
				</Button>
			)}
		</HStack>
	);
};
