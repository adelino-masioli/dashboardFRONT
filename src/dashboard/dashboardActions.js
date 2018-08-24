import axios from 'axios';
import { token } from '../auth/authActions';
import consts from '../main/consts';
const BASE_URL = consts.API_URL;

export function getSumary(){
	const request = axios.get(`${BASE_URL}/summaries`, {"headers": {"authorization": "Bearer "+token()}});
	return {
		type: 'SUMARY_FETCHED',
		payload: request
	};
}