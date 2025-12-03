import {
	getProfileData,
	getProfileReadonly,
	profileActions,
	updateProfileData
} from 'entities/Profile';
import { getUserAuthData } from 'entities/User';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import styles from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
	className?: string;
}

export const ProfilePageHeader: React.FC<ProfilePageHeaderProps> = ({ className }) => {
	const readOnly = useSelector(getProfileReadonly);
	const { t } = useTranslation('profile');
	const dispatch = useAppDispatch();
	const authData = useSelector(getUserAuthData);
	const profileData = useSelector(getProfileData);
	const canEdit = authData?.id === profileData?.id;

	const onEdit = useCallback(() => {
		dispatch(profileActions.setReadonly(false));
	}, [dispatch]);

	const onSave = useCallback(() => {
		dispatch(updateProfileData());
	}, [dispatch]);

	const onCancel = useCallback(() => {
		dispatch(profileActions.cancelEdit());
	}, [dispatch]);

	return (
		<div className={classNames(styles.ProfilePageHeader, {}, [className])}>
			<Text title={t('profile')} />
			{canEdit && (
				<div className={styles.btnWrapper}>
					{readOnly ? (
						<Button onClick={onEdit} className={styles.editBtn}>
							{t('edit')}
						</Button>
					) : (
						<>
							<Button onClick={onCancel} className={styles.editBtn} theme={ButtonTheme.OUTLINE_RED}>
								{t('cancel')}
							</Button>
							<Button onClick={onSave} className={styles.saveBtn}>
								{t('save')}
							</Button>
						</>
					)}
				</div>
			)}
		</div>
	);
};
