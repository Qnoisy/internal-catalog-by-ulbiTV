import React, { useCallback } from 'react';
import styles from './ArticleDetailPageHeader.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useSelector } from 'react-redux';
import { getArticleCanEdit } from 'pages/ArticleDetaildsPage/model/selectors/article';
import { getUserAuthData } from 'entities/User';

interface ArticleDetailPageHeaderProps {
	className?: string;
}

export const ArticleDetailPageHeader: React.FC<ArticleDetailPageHeaderProps> = ({ className }) => {
	const { t } = useTranslation('articles');
	const navigate = useNavigate();
	const canEdit = useSelector(getArticleCanEdit);
	const article = useSelector(getUserAuthData);

	const onBackToList = useCallback(() => {
		navigate(RoutePath.articles);
	}, []);

	const onEditArticle = useCallback(() => {
		navigate(`${RoutePath.article_details}${article?.id}/edit`);
	}, []);

	return (
		<div className={classNames(styles.ArticleDetailPageHeader, {}, [className])}>
			<Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
				{t('backToList')}
			</Button>
			{canEdit && (
				<Button className={styles.btn} theme={ButtonTheme.OUTLINE} onClick={onEditArticle}>
					{t('edit')}
				</Button>
			)}
		</div>
	);
};
