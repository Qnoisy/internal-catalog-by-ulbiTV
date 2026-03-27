import { Profile } from 'entities/Profile/model/types/profile';

export interface ProfileShema {
	data?: Profile;
	form?: Profile;
	isLoading?: boolean;
	error?: string;
	readonly: boolean;
	validateErrors?: ValidateProfileErrors[];
}
export enum ValidateProfileErrors {
	INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
	INCORRECT_USER_AGE = 'INCORRECT_USER_AGE',
	INCORRECT_USER_COUNTRY = 'INCORRECT_USER_COUNTRY',
	NO_USER_DATA = 'NO_USER_DATA',
	SERVER_ERROR = 'SERVER_ERROR'
}
