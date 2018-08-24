import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';
import { browserHistory } from 'react-router';
import { showTabs, selectTab } from '../common/tab/tabActions';
import { token } from '../auth/authActions';
import consts from '../main/consts'
const BASE_URL = consts.API_URL;
const INITIAL_VALUES = {};

//list all register
export function getList(){
	const request = axios.get(`${BASE_URL}/agency-images`, {"headers": {"authorization": "Bearer "+token()}});
	return {
		type: 'LIST_AGENCYIMAGE_FETCHED',
		payload: request
	};
}
//get by id
export function getAgencyImageByID(id){
	const request = axios.get(`${BASE_URL}/agency-images/${id}`, {"headers": {"authorization": "Bearer "+token()}});
	return {
		type: 'FILTER_AGENCYIMAGE_FETCHED',
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
		let formData = new FormData();
		if (values.id) {
			formData.append('id', values.id)
		}
		formData.append('name', values.name)
		formData.append('agency_id', values.agency_id)
		formData.append('type_id', values.type_id)
		formData.append('status', values.status)
		if (values.url) {
			formData.append('url', values.url[0])
		}
		const id = values.id ? values.id : '';
		let url = '';
		let methods = '';	
		if (method === 'post') {
			url = `${BASE_URL}/agency-images`;			
			methods = 'post';			
		} else if(method === 'put') {
			url = `${BASE_URL}/agency-images-update`;			
			methods = 'post';			
		} else {
			url = `${BASE_URL}/agency-images/${id}`;			
			methods = 'delete';	
		}

		const request = axios[methods](url, formData, {"headers": {"authorization": "Bearer "+token()}})
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
export function showCreate(){
	return [
		initialize('agencyimageForm', {}),
	];
}
//show update
export function showUpdate(agencyimage){	
	return [
		showTabs('tabUpdate', 'tabUpdate'),
		selectTab('tabUpdate'),
		initialize('agencyimageForm', agencyimage)
	];
}

//show delete
export function showDelete(agencyimage){
	return [
		showTabs('tabDelete'),
		selectTab('tabDelete'),
		initialize('agencyimageForm', agencyimage)		
	];
}

//initial
export function init(){
	return [
		initialize('agencyimageForm', INITIAL_VALUES),
		browserHistory.goBack
	];
}