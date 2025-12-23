import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ScrollSaveShema } from '../types/ScrollSaveShema';

const initialState: ScrollSaveShema = {
	scroll: {}
};

const ScrolSaveSlice = createSlice({
	name: 'ScrolSave',
	initialState,
	reducers: {
		setScrollPosition: (state, action: PayloadAction<{ path: string; position: number }>) => {
			state.scroll[action.payload.path] = action.payload.position;
		}
	}
});

export const { actions: ScrolSaveActions } = ScrolSaveSlice;
export const { reducer: ScrolSaveReducer } = ScrolSaveSlice;
