import axios from 'axios';

import { UserActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/testAsyncThunk';
import { loginByUsername } from './loginByUsername';

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true);

describe('loginByUsername.test', () => {
	// let dispatch: Dispatch;
	// let getState: () => StateSchema;

	// beforeEach(() => {
	// 	dispatch = jest.fn();
	// 	getState = jest.fn();
	// });

	// test('succses', async () => {
	// 	const userValue = { username: '123', id: '1' };
	// 	mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
	// 	const action = loginByUsername({ username: '123', password: '1' });
	// 	const result = await action(dispatch, getState, undefined);

	// 	expect(dispatch).toHaveBeenCalledWith(UserActions.setAuthData(userValue));
	// 	expect(dispatch).toBeCalledTimes(3);
	// 	expect(mockedAxios.post).toHaveBeenCalled();
	// 	expect(result.meta.requestStatus).toBe('fulfilled');
	// 	expect(result.payload).toEqual(userValue);
	// });
	// test('error login', async () => {
	// 	const userValue = { username: '123', id: '1' };
	// 	mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
	// 	const action = loginByUsername({ username: '123', password: '1' });
	// 	const result = await action(dispatch, getState, undefined);

	// 	expect(mockedAxios.post).toHaveBeenCalled();
	// 	expect(dispatch).toBeCalledTimes(2);
	// 	expect(result.meta.requestStatus).toBe('rejected');
	// 	expect(result.payload).toBe('error');
	// });

	test('succses', async () => {
		const userValue = { username: '123', id: '1' };
		mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));

		const testAsyncClass = new TestAsyncThunk(loginByUsername);
		const result = await testAsyncClass.callThunk({ username: '123', password: '123' });

		expect(testAsyncClass.dispatch).toHaveBeenCalledWith(UserActions.setAuthData(userValue));
		expect(testAsyncClass.dispatch).toBeCalledTimes(3);
		expect(mockedAxios.post).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toEqual(userValue);
	});

	test('error login', async () => {
		mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));

		const testAsyncClass = new TestAsyncThunk(loginByUsername);
		const result = await testAsyncClass.callThunk({ username: '123', password: '123' });

		expect(mockedAxios.post).toHaveBeenCalled();
		expect(testAsyncClass.dispatch).toBeCalledTimes(2);
		expect(result.meta.requestStatus).toBe('rejected');
		expect(result.payload).toBe('error');
	});
});
