import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

export interface Profile {
	first?: string;
	lastname?: string;
	age?: number;
	currency?: Currency;
	country?: Country;
	city?: string;
	username?: string;
	avatar?: string;
}

export interface ProfileShema {
	data?: Profile;
	form?: Profile;
	isLoading: boolean;
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
