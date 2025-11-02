import { StateSchema } from 'app/providers/StoreProvider';
import { ValidateProfileErrors } from '../../types/profile';
import { getProfileValidateErrors } from '../getProfileValidateErrors';

describe('getProfileValidateErrors.test', () => {
	test('should return redonly data', () => {
		const state: DeepPartial<StateSchema> = {
			profile: {
				validateErrors: [ValidateProfileErrors.INCORRECT_USER_AGE]
			}
		};
		expect(getProfileValidateErrors(state as StateSchema)).toEqual([
			ValidateProfileErrors.INCORRECT_USER_AGE
		]);
	});
	test('should work with empty state', () => {
		const state: DeepPartial<StateSchema> = {};
		expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
	});
});
