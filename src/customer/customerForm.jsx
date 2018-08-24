import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import LabelAndInput from '../common/form/labelAndInput';
import LabelAndTextarea from '../common/form/labelAndTextarea';
import LabelAndSelect from '../common/form/labelAndSelect';
import LabelAndSelectCountry from '../common/form/labelAndSelectCountry';
import LabelAndSelectZone from '../common/form/labelAndSelectZone';
import Row from '../common/layout/row';
import Grid from '../common/layout/layoutGrid';
import { init } from './customerActions';
import { getList as getListCountries } from './../admin/country/countryActions';
import { getListZones } from './../admin/zone/zoneActions';
import { getListCities } from './../admin/city/cityActions';
import { getList as getListTypes } from './../admin/customertype/customertypeActions';
import { getList as getListCustomerStatus } from './../admin/customerstatus/customerstatusActions';
import { getList as getListWebmidias } from './../admin/webmidia/webmidiaActions';

class CustomerForm extends Component {

	constructor(props) {
		super(props);
    }
	componentDidMount() {
		this.props.getListCountries();
		this.props.getListTypes();
		this.props.getListWebmidias();
		this.props.getListCustomerStatus();	
	}
	render(){
		const { handleSubmit, readOnly, pristine, dataProps } = this.props;		
		const selectCustomerTypes  = this.props.listCustomerTypes || [];
		const selectSex  = [{'id':1, 'value':'Male'}, {'id':2, 'value':'Female'}];
		const selectWebmidias  = this.props.listWebmidias || [];
		const selectCountries  = this.props.listCountries || [];
		const selectZones  = this.props.listZones || [];
		const selectCities  = this.props.listCities || [];
		const selectStatus  =this.props.listCustomerStatus || [];
		const id  = dataProps || null;	
	
		return (
			<form role='form' onSubmit={handleSubmit}>
				<div className='box-body'>
					<Row>
						<Field name='type_id' pupolate={selectCustomerTypes} component={LabelAndSelect} label='Type' cols='12 2' readOnly={readOnly} option='name'/>
						<Field name='name' component={LabelAndInput} label='Name' cols='12 4' placeholder='Name' readOnly={readOnly} />
						<Field name='middle_name' component={LabelAndInput} label='Middle Name' cols='12 3' placeholder='Middle Name' readOnly={readOnly} />
						<Field name='last_name' component={LabelAndInput} label='Last Name' cols='12 3' placeholder='Last Name' readOnly={readOnly} />
						<Field name='sex' pupolate={selectSex} component={LabelAndSelect} label='Sex' cols='12 2' readOnly={readOnly} option='value'/>
						<Field name='nationality' component={LabelAndInput} label='Nationality' cols='12 4' placeholder='Nationality' readOnly={readOnly} />
						<Field name='email' component={LabelAndInput} label='Email' cols='12 6' placeholder='Email' readOnly={readOnly} />
						<Field name='webmidia_id' pupolate={selectWebmidias} component={LabelAndSelectCountry} label='Webmedia' cols='12 2' readOnly={readOnly} option='name'/>
						<Field name='webmidia_uid' component={LabelAndInput} label='Webmedia Uid' cols='12 4' placeholder='Webmedia Uid' readOnly={readOnly} />
						<Field name='tel' component={LabelAndInput} label='Phone' cols='12 3' placeholder='Phone' readOnly={readOnly} />
						<Field name='tel_mobile' component={LabelAndInput} label='Mobile' cols='12 3' placeholder='Mobile' readOnly={readOnly} />
						<Field name='tel_emergency_dec' component={LabelAndInput} label='Emergency Contact Name' cols='12 9' placeholder='Emergency Contact Name' readOnly={readOnly} />
						<Field name='tel_emergency' component={LabelAndInput} label='Emergency Contact Number' cols='12 3' placeholder='Emergency Contact Number' readOnly={readOnly} />
						<Field name='street' component={LabelAndInput} label='Address' cols='12 6' placeholder='Address' readOnly={readOnly} />
						<Field name='street2' component={LabelAndInput} label='Address Complement' cols='12 3' placeholder='Address Complement' readOnly={readOnly} />		
						<Field name='postcode' component={LabelAndInput} label='Postcode' cols='12 3' placeholder='Postcode' readOnly={readOnly} />
						<Field name='country_id' pupolate={selectCountries} component={LabelAndSelectCountry} label='Country' cols='12 4' readOnly={readOnly} option='name'/>
						<Field name='zone_id' pupolate={selectZones} component={LabelAndSelectZone} label='Zone' cols='12 4' readOnly={readOnly} option='name' />
						<Field name='city_id' pupolate={selectCities} component={LabelAndSelect} label='City' cols='12 4' readOnly={readOnly} option='name' />						
						<Field name='notes' component={LabelAndTextarea} label='Notes' cols='12 12' placeholder='Notes' readOnly={readOnly} rows='1' />
						<Field name='notes_private' component={LabelAndTextarea} label='Notes Private' cols='12 12' placeholder='Notes Private' readOnly={readOnly} rows='1' />
						<Field name='status' pupolate={selectStatus} component={LabelAndSelect} label='Status' cols='12 12' readOnly={readOnly} option='name'/>
					</Row>
				</div>
				<div className='box-footer'>
					<Row>
						<Grid cols='12 1'>
							<button type='submit' className={`btn btn-flat btn-${this.props.submitClass}`}>{this.props.submitLabel}</button>
						</Grid>
						<Grid cols='12 1'>
							<button type='button' className='btn btn-flat btn-default' onClick={this.props.init}>Cancel</button>
						</Grid>
					</Row>
				</div>
			</form>
		);
	}
}
CustomerForm = reduxForm({form: 'customerForm', destroyOnUnmount: false})(CustomerForm);
const mapStateToProps = state => ({
	listCountries: state.country.list, 
	listZones: state.zone.listZones, 
	listCities: state.city.listCities,
	listCustomerTypes: state.customertype.list,
	listCustomerStatus: state.customerstatus.list,
	listWebmidias: state.webmidia.list,
});
const mapDispatchToProps = dispatch => bindActionCreators({
	init, 
	getListCountries, 
	getListZones, 
	getListCities, 
	getListTypes, 
	getListWebmidias,
	getListCustomerStatus
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);
