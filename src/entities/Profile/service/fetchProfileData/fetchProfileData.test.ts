import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/testAsyncThunk';
import { fetchProfileData } from './fetchProfileData';

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

describe('fetchProfileData.test', () => {
	test('succses', async () => {
		const testAsyncClass = new TestAsyncThunk(fetchProfileData);
		testAsyncClass.api.get.mockReturnValue(Promise.resolve({ data: data }));

		const result = await testAsyncClass.callThunk();

		expect(testAsyncClass.api.get).toHaveBeenCalled();
		expect(result.meta.requestStatus).toBe('fulfilled');
		expect(result.payload).toEqual(data);
	});

	test('error', async () => {
		const testAsyncClass = new TestAsyncThunk(fetchProfileData);
		testAsyncClass.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
		const result = await testAsyncClass.callThunk();

		expect(result.meta.requestStatus).toBe('rejected');
	});
});
