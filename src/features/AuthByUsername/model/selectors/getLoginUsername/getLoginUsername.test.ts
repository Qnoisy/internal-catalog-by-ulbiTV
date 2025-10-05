import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername.test', () => {
	test('should return value', () => {
		const state: DeepPartial<StateSchema> = {
			login: {
				username: 'Vasya'
			}
		};
		expect(getLoginUsername(state as StateSchema)).toEqual('Vasya');
	});
	test('should work without state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getLoginUsername(state as StateSchema)).toEqual('');
	});
});
