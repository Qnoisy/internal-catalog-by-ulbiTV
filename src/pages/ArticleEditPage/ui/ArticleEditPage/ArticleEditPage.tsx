import React from 'react';
import styles from './ArticleEditPage.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ArticleEditPageProps {
	className?: string;
}

const ArticleEditPage: React.FC<ArticleEditPageProps> = ({ className }) => {
	const { id } = useParams<{ id: string }>();
	const IsEdit = Boolean(id);
	const { t } = useTranslation();
	return (
		<div className={classNames(styles.ArticleEditPage, {}, [className])}>
			{IsEdit ? t('edit page') : t('create page')}
		</div>
	);
};
export default ArticleEditPage;
