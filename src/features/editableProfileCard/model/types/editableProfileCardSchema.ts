import { Profile } from '@/entities/Profile/model/types/profile';
import { ValidateProfileErrors } from '../const/const';

export interface ProfileShema {
	data?: Profile;
	form?: Profile;
	isLoading?: boolean;
	error?: string;
	readonly: boolean;
	validateErrors?: ValidateProfileErrors[];
}
