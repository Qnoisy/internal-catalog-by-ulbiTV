import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/testAsyncThunk';
import { ValidateProfileErrors } from './../../model/types/profile';
import { updateProfileData } from './updateProfileData';

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

describe('updateProfileData.test', () => {
	test('succses', async () => {
		const testAsyncClass = new TestAsyncThunk(updateProfileData, {
			profile: {
				form: data
			}
		});
		testAsyncClass.api.put.mockReturnValue(Promise.resolve({ data: data }));

		const result = await testAsyncClass.callThunk();

		expect(testAsyncClass.api.put).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toEqual(data);
	});

	test('error', async () => {
		const testAsyncClass = new TestAsyncThunk(updateProfileData, {
			profile: {
				form: data
			}
		});

		testAsyncClass.api.put.mockReturnValue(Promise.resolve({ status: 403 }));

		const result = await testAsyncClass.callThunk();

		expect(result.meta.requestStatus).toBe('rejected');
		expect(result.payload).toEqual([ValidateProfileErrors.SERVER_ERROR]);
	});
	test('validate error', async () => {
		const testAsyncClass = new TestAsyncThunk(updateProfileData, {
			profile: {
				form: { ...data, age: 0 }
			}
		});

		const result = await testAsyncClass.callThunk();

		expect(result.meta.requestStatus).toBe('rejected');
		expect(result.payload).toEqual([ValidateProfileErrors.INCORRECT_USER_AGE]);
	});
});
