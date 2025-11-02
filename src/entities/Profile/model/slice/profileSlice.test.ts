import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { updateProfileData } from 'entities/Profile';
import { ProfileShema, ValidateProfileErrors } from '../types/profile';
import { profileActions, profileReducer } from './profileSlice';

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

describe('profileSlice.test', () => {
	test('test set readonly', () => {
		const state: DeepPartial<ProfileShema> = { readonly: false };
		expect(profileReducer(state as ProfileShema, profileActions.setReadonly(true))).toEqual({
			readonly: true
		});
	});

	test('cancelEdit', () => {
		const state: DeepPartial<ProfileShema> = { data, form: { username: '' } };
		expect(profileReducer(state as ProfileShema, profileActions.cancelEdit())).toEqual({
			readonly: true,
			validateErrors: undefined,
			data,
			form: data
		});
	});
	test('updateProfile', () => {
		const state: DeepPartial<ProfileShema> = { form: { username: '123' } };
		expect(
			profileReducer(state as ProfileShema, profileActions.updateProfile({ username: '123456' }))
		).toEqual({
			form: { username: '123456' }
		});
	});
	test('updateProfile service pending', () => {
		const state: DeepPartial<ProfileShema> = {
			isLoading: false,
			validateErrors: [ValidateProfileErrors.SERVER_ERROR]
		};
		expect(profileReducer(state as ProfileShema, updateProfileData.pending)).toEqual({
			isLoading: true,
			validateErrors: undefined
		});
	});
	test('updateProfile service fulfilled', () => {
		const state: DeepPartial<ProfileShema> = {
			isLoading: true
		};
		expect(profileReducer(state as ProfileShema, updateProfileData.fulfilled(data, ''))).toEqual({
			isLoading: false,
			data: data,
			form: data,
			readonly: true,
			validateErrors: undefined
		});
	});
});
