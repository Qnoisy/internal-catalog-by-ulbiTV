import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginPassword } from './getLoginPassword';

describe('getLoginError.test', () => {
	test('should return password', () => {
		const state: DeepPartial<StateSchema> = {
			login: {
				password: '123'
			}
		};
		expect(getLoginPassword(state as StateSchema)).toEqual('123');
	});
	test('should work without state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getLoginPassword(state as StateSchema)).toEqual(undefined);
	});
});
