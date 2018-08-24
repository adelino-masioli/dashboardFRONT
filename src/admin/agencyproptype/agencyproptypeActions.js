import axios from 'axios';
import { token } from '../../auth/authActions';
import consts from '../../main/consts';
const BASE_URL = consts.API_URL;

//list all register
export function getList(){
	const request = axios.get(`${BASE_URL}/agency-prop-types`, {"headers": {"authorization": "Bearer "+token()}});
	return {
		type: 'LIST_AGENCY_PROP_TYPE_FETCHED',
		payload: request
	};
}