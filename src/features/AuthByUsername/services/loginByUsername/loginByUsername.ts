import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkExtraArg } from 'app/providers/StoreProvider';
import { User, UserActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';

interface loginByUsernameProps {
	username: string;
	password: string;
}

export const loginByUsername = createAsyncThunk<
	User,
	loginByUsernameProps,
	{ rejectValue: string; extra: ThunkExtraArg }
>('login/loginByUsername', async ({ username, password }, thunkApi) => {
	try {
		const response = await thunkApi.extra.api.post<User>('/login', {
			username,
			password
		});
		console.log(response);

		if (!response.data) {
			throw new Error();
		}

		localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
		thunkApi.dispatch(UserActions.setAuthData(response.data));
		thunkApi.extra.navigate('about');
		return response.data;
	} catch (e) {
		console.log(e);
		return thunkApi.rejectWithValue('error');
	}
});
