import { getProfileData } from 'entities/Profile/model/selectors/getProfileData';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError';
import { getProfileIsLoading } from 'entities/Profile/model/selectors/getProfileIsLoading';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text } from 'shared/ui/Text/Text';
import styles from './ProfileCard.module.scss';

interface ProfileProps {
	className?: string;
}

export const ProfileCard: React.FC<ProfileProps> = ({ className }) => {
	const { t } = useTranslation('profile');
	const data = useSelector(getProfileData);
	const IsLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);

	return (
		<div className={classNames(styles.ProfileCard, {}, [className])}>
			<div className={styles.header}>
				<Text title={t('profile')} />
				<Button className={styles.editBtn}>{t('edit')}</Button>
			</div>
			<div className={styles.data}>
				<Input value={data?.first} placeholder={t('your firstname')} className={styles.input} />
				<Input value={data?.lastname} placeholder={t('your lastname')} className={styles.input} />
			</div>
		</div>
	);
};
