import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { validateProfileData } from '../validateProfileData/validateProfileData';
import { Profile, ValidateProfileErrors } from './../../model/types/profile';

export const updateProfileData = createAsyncThunk<
	Profile,
	void,
	ThunkConfig<ValidateProfileErrors[]>
>('profile/updateProfileData', async (_, thunkApi) => {
	const { extra, rejectWithValue, getState } = thunkApi;
	const formData = getProfileForm(getState());
	try {
		const response = await extra.api.put<Profile>('/profile', formData);

		const errors = validateProfileData(formData);
		if (errors.length) {
			return rejectWithValue(errors);
		}
		if (!response.data) {
			throw new Error();
		}

		return response.data;
	} catch (e) {
		console.log(e);
		return rejectWithValue([ValidateProfileErrors.SERVER_ERROR]);
	}
});
