import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ValidateProfileErrors } from 'entities/Profile/model/types/profile';
import { validateProfileData } from './validateProfileData';

const data = {
	first: 'Maksym',
	lastname: 'Aveskulov',
	age: 21,
	currency: Currency.UAN,
	country: Country.Ukraine,
	city: 'Торунь',
	username: 'admin',
	avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg'
};

describe('validateProfileData.test', () => {
	test('succses', async () => {
		const result = validateProfileData(data);
		expect(result).toEqual([]);
	});
	test('without first name and lastname', async () => {
		const result = validateProfileData({ ...data, first: '', lastname: '' });
		expect(result).toEqual([ValidateProfileErrors.INCORRECT_USER_DATA]);
	});
	test('incorrect age', async () => {
		const result = validateProfileData({ ...data, age: NaN });
		expect(result).toEqual([ValidateProfileErrors.INCORRECT_USER_AGE]);
	});
	test('incorrect country', async () => {
		const result = validateProfileData({ ...data, country: undefined });
		expect(result).toEqual([ValidateProfileErrors.INCORRECT_USER_COUNTRY]);
	});
	test('No Data', async () => {
		const result = validateProfileData({});
		expect(result).toEqual([
			ValidateProfileErrors.INCORRECT_USER_DATA,
			ValidateProfileErrors.INCORRECT_USER_AGE,
			ValidateProfileErrors.INCORRECT_USER_COUNTRY
		]);
	});
});
