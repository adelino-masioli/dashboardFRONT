import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';
import { showTabs, selectTab } from '../../common/tab/tabActions';
import { token } from '../../auth/authActions';
import consts from '../../main/consts';
const BASE_URL = consts.API_URL;
const INITIAL_VALUES = {};

//list all register
export function getList(){
	const request = axios.get(`${BASE_URL}/school-fee-types`, {"headers": {"authorization": "Bearer "+token()}});
	return {
		type: 'LIST_FEE_TYPE_FETCHED',
		payload: request
	};
}
//create new register
export function create(values){
	return submit(values, 'post');
}
//update
export function update(values){
	return submit(values, 'put');
}
//remove
export function remove(values){
	return submit(values, 'delete');
}
function submit(values, method){
	return dispatch => {
		const id = values.id ? values.id : '';
		const url = method === 'post' ? `${BASE_URL}/school-fee-types` : `${BASE_URL}/school-fee-types/${id}`; 
		const request = axios[method](url, values, {"headers": {"authorization": "Bearer "+token()}})
			.then(resp => {
				toastr.success('Success', 'Operation performed successfully!');
				dispatch(init());
			})
			.catch(e => {
				for (let error of Object.values(e.response.data.errors)) {
					toastr.error('Error', error[0]);
				}
			});
	};
}
//show update
export function showUpdate(feetype){	
	return [
		showTabs('tabUpdate'),
		selectTab('tabUpdate'),
		initialize('feetypeForm', feetype)
	];
}

//show delete
export function showDelete(feetype){
	return [
		showTabs('tabDelete'),
		selectTab('tabDelete'),
		initialize('feetypeForm', feetype)		
	];
}

//initial
export function init(){
	return [
		showTabs('tabList', 'tabCreate'),
		selectTab('tabList'),
		getList(),
		initialize('feetypeForm', INITIAL_VALUES)
	];
}