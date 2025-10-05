import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';

const baseURL = (typeof __API__ !== 'undefined' && __API__) || '';

export const $api = axios.create({
	baseURL,
	headers: {
		authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''
	}
});
