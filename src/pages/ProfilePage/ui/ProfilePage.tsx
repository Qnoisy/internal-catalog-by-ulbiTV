import { profileReducer } from 'entities/Profile';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader';
import styles from './ProfilePage.module.scss';

const reducers: ReducerList = {
	profile: profileReducer
};

interface ProfilePageProps {
	className?: string;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ className }) => {
	const { t } = useTranslation();
	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<div className={classNames(styles.ProfilePage, {}, [className])}>{t('Profile page')}</div>
		</DynamicModuleLoader>
	);
};
