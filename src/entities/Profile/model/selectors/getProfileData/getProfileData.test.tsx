import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { getProfileData } from './getProfileData';

describe('getProfileData.test', () => {
	test('should return data', () => {
		const data = {
			first: 'Maksym',
			lastname: 'Aveskulov',
			age: 0,
			currency: Currency.UAN,
			country: Country.Ukraine,
			city: 'Торунь',
			username: 'admin',
			avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg'
		};
		const state: DeepPartial<StateSchema> = {
			profile: {
				data: data
			}
		};
		expect(getProfileData(state as StateSchema)).toEqual(data);
	});
	test('should work with empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getProfileData(state as StateSchema)).toEqual(undefined);
	});
});
