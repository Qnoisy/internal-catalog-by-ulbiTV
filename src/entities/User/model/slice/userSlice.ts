import { createSlice } from '@reduxjs/toolkit';
import { UserSchema } from '../types/userSchema';
const initialState: UserSchema = {
	authData: null
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {}
});

export const { actions: UserActions } = userSlice;
export const { reducer: UserReducer } = userSlice;
