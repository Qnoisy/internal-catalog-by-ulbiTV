import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProfileData } from '../../service/fetchProfileData/fetchProfileData';
import { ProfileShema } from '../types/profile';
import { Profile } from './../types/profile';

const initialState: ProfileShema = {
	data: undefined,
	isLoading: false,
	error: undefined,
	readonly: true
};

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(fetchProfileData.pending, (state, action) => {
			state.error = undefined;
			state.isLoading = true;
		});
		builder.addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
			state.isLoading = false;
			state.data = action.payload;
		});
		builder.addCase(fetchProfileData.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
	}
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
