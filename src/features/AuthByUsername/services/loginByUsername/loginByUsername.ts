import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, UserActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';

interface loginByUsernameProps {
	username: string;
	password: string;
}

export const loginByUsername = createAsyncThunk<
	User,
	loginByUsernameProps,
	{ rejectValue: string }
>('login/loginByUsername', async ({ username, password }, thunkApi) => {
	try {
		const response = await axios.post<User>('http://localhost:8000/login', {
			username,
			password
		});

		if (!response.data) {
			throw new Error();
		}

		localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
		thunkApi.dispatch(UserActions.setAuthData(response.data));

		return response.data;
	} catch (e) {
		console.log(e);
		return thunkApi.rejectWithValue('error');
	}
});
