import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import LabelAndInput from '../../common/form/labelAndInput';
import LabelAndTextarea from '../../common/form/labelAndTextarea';
import LabelAndSelect from '../../common/form/labelAndSelect';
import LabelAndSelectCountry from '../../common/form/labelAndSelectCountry';
import LabelAndSelectZone from '../../common/form/labelAndSelectZone';
import Row from '../../common/layout/row';
import Grid from '../../common/layout/layoutGrid';
import { init } from './companyActions';
import { getList as getListCountries } from '../country/countryActions';
import { getListZones } from '../zone/zoneActions';
import { getListCities } from '../city/cityActions';
import { getList as  getListCompanyType } from '../companytype/companytypeActions';


class CompanyForm extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getListCountries();
		this.props.getListCompanyType();
	}
	render(){
		const { handleSubmit, readOnly,  dataProps } = this.props;
		const selectCountries = this.props.listCountries || [];
		const selectZones  = this.props.listZones || [];
		const selectCities  = this.props.listCities || [];
		const selectCompanyType  = this.props.listCompanyType || [];
		const selectStatus  = [{'id':1, 'value':'Active'}, {'id':2, 'value':'No active'}];
		const id  = dataProps || null;	
	
		return (
			<form role='form' onSubmit={handleSubmit}>
				<div className='box-body'>
					<Row>
						<Field name='name' component={LabelAndInput} label='Name' cols='12 4' placeholder='Name' readOnly={readOnly}/>
						<Field name='fullname' component={LabelAndInput} label='Fullname' cols='12 8' placeholder='Fullname' readOnly={readOnly} />
						<Field name='email' component={LabelAndInput} label='Email' cols='12 4' placeholder='Email' readOnly={readOnly} type='email' />
						<Field name='skype' component={LabelAndInput} label='Skype' cols='12 4' placeholder='Skype' readOnly={readOnly} maxlength='100'/>
						<Field name='tel1' component={LabelAndInput} label='Tel 1' cols='12 2' placeholder='Tel 1' readOnly={readOnly} maxlength='50'/>
						<Field name='tel2' component={LabelAndInput} label='Tel 2' cols='12 2' placeholder='Tel 2' readOnly={readOnly} maxlength='50'/>
						<Field name='tel_emergency' component={LabelAndInput} label='Tel Emergency' cols='12 2' placeholder='Tel Emergency' readOnly={readOnly} maxlength='50'/>
						<Field name='street' component={LabelAndInput} label='Street' cols='12 6' placeholder='Street' readOnly={readOnly}/>
						<Field name='street2' component={LabelAndInput} label='Complement' cols='12 4' placeholder='Complement' readOnly={readOnly}/>
						<Field name='postcode' component={LabelAndInput} label='Postcode' cols='12 2' placeholder='Postcode' readOnly={readOnly}/>
						<Field name='country_id' pupolate={selectCountries} component={LabelAndSelectCountry} label='Country' cols='12 3' readOnly={readOnly} option='name'/>
						<Field name='zone_id' pupolate={selectZones} component={LabelAndSelectZone} label='Zone' cols='12 3' readOnly={readOnly} option='name' />
						<Field name='city_id' pupolate={selectCities} component={LabelAndSelect} label='City' cols='12 4' readOnly={readOnly} option='name' />						
						<Field name='notes' component={LabelAndTextarea} label='Notes' cols='12 12' placeholder='Notes' readOnly={readOnly} rows='1' />
						<Field name='type_id' pupolate={selectCompanyType} component={LabelAndSelect} label='Type' cols='12 4' readOnly={readOnly} option='name'/>
						<Field name='status' pupolate={selectStatus} component={LabelAndSelect} label='Status' cols='12 4' readOnly={readOnly} option='value'/>
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
CompanyForm = reduxForm({form: 'companyForm', destroyOnUnmount: false})(CompanyForm);
const mapStateToProps = state => ({
	listCountries: state.country.list, 
	listZones: state.zone.listZones, 
	listCities: state.city.listCities,
	listCompanyType: state.companytype.list
});
const mapDispatchToProps = dispatch => bindActionCreators({
	init,
	getListCountries, 
	getListZones, 
	getListCities,
	getListCompanyType
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CompanyForm);
