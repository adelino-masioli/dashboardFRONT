import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';
import { showTabs, selectTab } from '../common/tab/tabActions';
import { token } from '../auth/authActions';
import consts from '../main/consts';
const BASE_URL = consts.API_URL;
const INITIAL_VALUES = {};

//list all register
export function getList() {
	const request = axios.get(`${BASE_URL}/users`, {"headers": {"authorization": "Bearer "+token()}});
	return {
		type: 'LIST_FETCHED',
		payload: request
	};
}
//create new register
export function create(values) {
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
		const url = method === 'post' ? `${BASE_URL}/users` : `${BASE_URL}/users/${id}`; 
		const request = axios[method](url, values, {"headers": {"authorization": "Bearer "+token()}})
			.then(resp => {
				if (resp.data.status === true) {
					toastr.success('Success', 'Operation performed successfully!');
					dispatch(init());
				} else {
					for (let error of Object.values(resp.data)) {
						toastr.error('Error', error[0]);
					}
				}
			})
			.catch(e => {
				for (let error of Object.values(resp.data)) {
					toastr.error('Error', error[0]);
				}
			});
	};
}
//show update
export function showUpdate(user){
	return [
		showTabs('tabUpdate'),
		selectTab('tabUpdate'),
		initialize('userForm', user)
	];
}

//show delete
export function showDelete(user){
	return [
		showTabs('tabDelete'),
		selectTab('tabDelete'),
		initialize('userForm', user)
	];
}

//initial
export function init(){
	return [
		showTabs('tabList', 'tabCreate'),
		selectTab('tabList'),
		getList(),
		initialize('userForm', INITIAL_VALUES)
	];
}
