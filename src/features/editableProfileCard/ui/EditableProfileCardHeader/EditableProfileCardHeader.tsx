import React, { useCallback } from 'react';
import styles from './EditableProfileCardHeader.module.scss';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getProfileReadonly } from 'features/editableProfileCard/model/selectors/getProfileReadOnly/getProfileReadOnly';
import { getUserAuthData } from 'entities/User';
import { profileActions } from 'features/editableProfileCard/model/slice/profileSlice';
import { updateProfileData } from 'features/editableProfileCard/model/service/updateProfileData/updateProfileData';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { HStack } from 'shared/ui/Stack';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { getProfileData } from 'features/editableProfileCard/model/selectors/getProfileData/getProfileData';
import { useTranslation } from 'react-i18next';

interface EditableProfileCardHeaderProps {
	className?: string;
}

export const EditableProfileCardHeader: React.FC<EditableProfileCardHeaderProps> = ({
	className
}) => {
	const readOnly = useSelector(getProfileReadonly);
	const { t } = useTranslation();
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
		<HStack max justify={'between'} className={classNames('', {}, [className])}>
			<Text title={t('profile')} />
			{canEdit && (
				<>
					{readOnly ? (
						<Button onClick={onEdit}>{t('edit')}</Button>
					) : (
						<HStack gap={'8'}>
							<Button onClick={onCancel} theme={ButtonTheme.OUTLINE_RED}>
								{t('cancel')}
							</Button>
							<Button onClick={onSave}>{t('save')}</Button>
						</HStack>
					)}
				</>
			)}
		</HStack>
	);
};
