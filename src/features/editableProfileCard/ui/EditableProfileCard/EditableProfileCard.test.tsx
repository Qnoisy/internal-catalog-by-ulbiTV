import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/сomponentRender';
import { EditableProfileCard } from './EditableProfileCard';
import { Profile } from 'entities/Profile/model/types/profile';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { profileReducer } from 'features/editableProfileCard/model/slice/profileSlice';
import { userEvent } from '@testing-library/user-event';
import { $api } from 'shared/api/api';

jest.mock('features/editableProfileCard/model/service/updateProfileData/updateProfileData', () => {
	return {
		updateProfileData: Object.assign(
			jest.fn(() => async (dispatch: any) => {
				dispatch({
					type: 'profile/updateProfileData/rejected',
					payload: ['INCORRECT_USER_DATA']
				});
			}),
			{
				pending: 'profile/updateProfileData/pending',
				fulfilled: 'profile/updateProfileData/fulfilled',
				rejected: 'profile/updateProfileData/rejected'
			}
		)
	};
});

const profile: Profile = {
	id: '1',
	first: 'Max',
	lastname: 'Aves',
	age: 21,
	currency: Currency.UAN,
	country: Country.Ukraine,
	city: 'Torun',
	username: 'admin123'
};

const options = {
	initialState: {
		profile: {
			readonly: true,
			data: profile,
			form: profile
		},
		user: {
			authData: { id: '1', username: 'admin123' }
		}
	},
	asyncReducers: {
		profile: profileReducer
	}
};

describe('features/EditableProfileCard', () => {
	test('change button edit', async () => {
		componentRender(<EditableProfileCard id={'1'} />, options);
		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
		expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
	});

	test('cancel btn, reset form', async () => {
		componentRender(<EditableProfileCard id={'1'} />, options);
		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

		await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
		await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

		await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
		await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user');

		expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user');
		expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));

		expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('Max');
		expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('Aves');
	});

	test('validation', async () => {
		componentRender(<EditableProfileCard id={'1'} />, options);

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

		await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

		await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

		expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
	});

	// test('put test', async () => {
	// 	const mockPutReq = jest.spyOn($api, 'put');
	// 	componentRender(<EditableProfileCard id={'1'} />, options);

	// 	await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

	// 	await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');

	// 	await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

	// 	expect(mockPutReq).toHaveBeenCalled();
	// });
});
