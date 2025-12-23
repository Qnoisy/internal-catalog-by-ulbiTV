import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './NotFoundPage.module.scss';
import { Page } from 'widgets/Page/Page';

interface NotFoundPageProps {
	className?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ className }) => {
	const { t } = useTranslation();
	return (
		<Page className={classNames(styles.NotFoundPage, {}, [className])}>{t('page not found')}</Page>
	);
};
