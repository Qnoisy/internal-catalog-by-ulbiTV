import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ProfileCard } from 'entities/Profile';

import { getProfileError } from 'features/editableProfileCard/model/selectors/getProfileError/getProfileError';
import { getProfileForm } from 'features/editableProfileCard/model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from 'features/editableProfileCard/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from 'features/editableProfileCard/model/selectors/getProfileReadOnly/getProfileReadOnly';
import { getProfileValidateErrors } from 'features/editableProfileCard/model/selectors/getProfileValidateErrors';
import { fetchProfileData } from 'features/editableProfileCard/model/service/fetchProfileData/fetchProfileData';
import {
	profileActions,
	profileReducer
} from 'features/editableProfileCard/model/slice/profileSlice';
import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import cls from './EditableProfileCard.module.scss';
import { ValidateProfileErrors } from 'features/editableProfileCard/model/types/editableProfileCardSchema';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';

interface EditableProfileCardProps {
	className?: string;
	id: string;
}
const reducers: ReducersList = {
	profile: profileReducer
};
export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
	const { className, id } = props;
	const { t } = useTranslation();
	const formData = useSelector(getProfileForm);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);
	const dispatch = useAppDispatch();
	const readonly = useSelector(getProfileReadonly);
	const validateErrors = useSelector(getProfileValidateErrors);

	const ValidateProfileTranslate = {
		[ValidateProfileErrors.INCORRECT_USER_DATA]: t('incorrect username'),
		[ValidateProfileErrors.INCORRECT_USER_AGE]: t('incorrect age'),
		[ValidateProfileErrors.INCORRECT_USER_COUNTRY]: t('incorrect country'),
		[ValidateProfileErrors.NO_USER_DATA]: t('enter your data'),
		[ValidateProfileErrors.SERVER_ERROR]: t('server error')
	};

	const onChangeFirstname = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ first: value || '' }));
		},
		[dispatch]
	);
	const onChangeLastname = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ lastname: value || '' }));
		},
		[dispatch]
	);
	const onChangeAge = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ age: Number(value) || 0 }));
		},
		[dispatch]
	);
	const onChangeCity = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ city: value || '' }));
		},
		[dispatch]
	);
	const onChangeAvatar = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ avatar: value || '' }));
		},
		[dispatch]
	);
	const onChangeUserName = useCallback(
		(value?: string) => {
			dispatch(profileActions.updateProfile({ username: value || '' }));
		},
		[dispatch]
	);
	const onChangeCurrency = useCallback(
		(currency?: Currency) => {
			dispatch(profileActions.updateProfile({ currency }));
		},
		[dispatch]
	);
	const onChangeCountry = useCallback(
		(country?: Country) => {
			dispatch(profileActions.updateProfile({ country }));
		},
		[dispatch]
	);

	useEffect(() => {
		if (id && __PROJECT__ !== 'jest') {
			dispatch(fetchProfileData(id));
		}
	}, [dispatch]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<EditableProfileCardHeader />
			{validateErrors?.length &&
				validateErrors.map(err => (
					<Text
						key={err}
						theme={TextTheme.ERROR}
						text={ValidateProfileTranslate[err]}
						data-testid={'EditableProfileCard.Error'}
					/>
				))}
			<ProfileCard
				data={formData}
				isLoading={isLoading}
				error={error}
				readonly={readonly}
				onChangeFirstname={onChangeFirstname}
				onChangeLastname={onChangeLastname}
				onChangeAge={onChangeAge}
				onChangeCity={onChangeCity}
				onChangeAvatar={onChangeAvatar}
				onChangeUserName={onChangeUserName}
				onChangeCurrency={onChangeCurrency}
				onChangeCountry={onChangeCountry}
			/>
		</DynamicModuleLoader>
	);
});
