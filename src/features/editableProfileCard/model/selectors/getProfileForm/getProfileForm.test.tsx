import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { getProfileForm } from './getProfileForm';

describe('getProfileForm.test', () => {
	test('should return form data', () => {
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
				form: data
			}
		};
		expect(getProfileForm(state as StateSchema)).toEqual(data);
	});
	test('should work with empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getProfileForm(state as StateSchema)).toEqual(undefined);
	});
});
