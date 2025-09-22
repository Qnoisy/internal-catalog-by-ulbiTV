import { DeepPartial } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginIsLoading } from './getLoginIsLoading';

describe('getLogin.test', () => {
	test('should return isLoading', () => {
		const state: DeepPartial<StateSchema> = {
			login: {
				isLoading: true
			}
		};
		expect(getLoginIsLoading(state as StateSchema)).toEqual(true);
	});
	test('should return login', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getLoginIsLoading(state as StateSchema)).toEqual(undefined);
	});
});
