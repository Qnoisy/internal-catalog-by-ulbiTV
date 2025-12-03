import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddCommentFormShema } from '../types/addCommentFormShema';

const initialState: AddCommentFormShema = {
	text: '',
	error: ''
};

const AddCommentFormSlice = createSlice({
	name: 'addCommentForm',
	initialState,
	reducers: {
		setComment: (state, action: PayloadAction<string>) => {
			state.text = action.payload;
		}
	}
	// extraReducers: builder => {
	// 	builder.addCase(loginByUsername.pending, (state, action) => {
	// 		state.error = undefined;
	// 		state.isLoading = true;
	// 	});
	// 	builder.addCase(loginByUsername.fulfilled, (state, action) => {
	// 		state.isLoading = false;
	// 	});
	// 	builder.addCase(loginByUsername.rejected, (state, action) => {
	// 		state.isLoading = false;
	// 		state.error = action.payload;
	// 	});
	// }
});

export const { actions: addCommentFormActions } = AddCommentFormSlice;
export const { reducer: addCommentFormReducer } = AddCommentFormSlice;
