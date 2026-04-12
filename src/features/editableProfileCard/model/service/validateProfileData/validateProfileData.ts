import { Profile } from 'entities/Profile/model/types/profile';
import { ValidateProfileErrors } from '../../const/const';

export const validateProfileData = (profile?: Profile) => {
	if (!profile) {
		return [ValidateProfileErrors.NO_USER_DATA];
	}
	const { first, lastname, age, country } = profile;
	const errors: ValidateProfileErrors[] = [];
	if (!first || !lastname) {
		errors.push(ValidateProfileErrors.INCORRECT_USER_DATA);
	}
	if (!age || !Number.isInteger(age)) {
		errors.push(ValidateProfileErrors.INCORRECT_USER_AGE);
	}
	if (!country) {
		errors.push(ValidateProfileErrors.INCORRECT_USER_COUNTRY);
	}
	return errors;
};
