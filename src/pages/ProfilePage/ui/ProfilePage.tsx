import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import {
	fetchProfileData,
	getProfileError,
	getProfileForm,
	getProfileIsLoading,
	getProfileReadonly,
	getProfileValidateErrors,
	profileActions,
	ProfileCard,
	profileReducer
} from 'entities/Profile';
import { ValidateProfileErrors } from 'entities/Profile/model/types/profile';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';
import { Page } from 'widgets/Page/Page';
import { VStack } from 'shared/ui/Stack';

const reducers: ReducersList = {
	profile: profileReducer
};

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
	const formData = useSelector(getProfileForm);
	const isLoading = useSelector(getProfileIsLoading);
	const error = useSelector(getProfileError);
	const dispatch = useAppDispatch();
	const readonly = useSelector(getProfileReadonly);
	const validateErrors = useSelector(getProfileValidateErrors);
	const { t } = useTranslation('profile');
	const { id } = useParams<{ id: string }>();

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
		if (id) {
			dispatch(fetchProfileData(id));
		}
	}, [dispatch]);

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Page>
				<VStack gap='8' max>
					<ProfilePageHeader />
					{validateErrors?.length &&
						validateErrors.map(err => (
							<Text key={err} theme={TextTheme.ERROR} text={ValidateProfileTranslate[err]} />
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
				</VStack>
			</Page>
		</DynamicModuleLoader>
	);
};
export default ProfilePage;
