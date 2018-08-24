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
import { init } from './schoolActions';
import { getList as getListCountries } from './../admin/country/countryActions';
import { getListZones } from './../admin/zone/zoneActions';
import { getListCities } from './../admin/city/cityActions';
import { getListSchoolGroups } from './../schoolgroup/schoolgroupActions';

class SchoolForm extends Component {

	constructor(props) {
		super(props);
    }
	componentDidMount() {
		this.props.getListSchoolGroups();
		this.props.getListCountries();		
	}
	render(){
		const { handleSubmit, readOnly, pristine, dataProps } = this.props;		
		const selectSchoolGroups = this.props.listSchoolGroup || [];
		const selectCountries = this.props.listCountries || [];
		const selectZones  = this.props.listZones || [];
		const selectCities  = this.props.listCities || [];
		const selectStatus  = [{'id':1, 'value':'Active'}, {'id':2, 'value':'No active'}];
		const id  = dataProps || null;	
	
		return (
			<form role='form' onSubmit={handleSubmit}>
				<div className='box-body'>
					<Row>
						<Field name='school_group_id' pupolate={selectSchoolGroups} component={LabelAndSelect} label='School Group' cols='12 3' readOnly={readOnly} option='name' />
						<Field name='name' component={LabelAndInput} label='Name' cols='12 3' placeholder='Name' readOnly={readOnly} />
						<Field name='fullname' component={LabelAndInput} label='Fullname' cols='12 6' placeholder='Fullname' readOnly={readOnly} />
						<Field name='tel' component={LabelAndInput} label='Tel' cols='12 3' placeholder='Tel' readOnly={readOnly} />
						<Field name='tel_emergency' component={LabelAndInput} label='Tel Emergency' cols='12 3' placeholder='Tel Emergency' readOnly={readOnly} />
						<Field name='tel_fax' component={LabelAndInput} label='Tel Fax' cols='12 3' placeholder='Tel Fax' readOnly={readOnly} />
						<Field name='email' component={LabelAndInput} label='Email' cols='12 6' placeholder='Email' readOnly={readOnly} />
						<Field name='site' component={LabelAndInput} label='Site' cols='12 6' placeholder='Site' readOnly={readOnly} />				
						<Field name='country_id' pupolate={selectCountries} component={LabelAndSelectCountry} label='Country' cols='12 4' readOnly={readOnly} option='name'/>
						<Field name='zone_id' pupolate={selectZones} component={LabelAndSelectZone} label='Zone' cols='12 4' readOnly={readOnly} option='name' />
						<Field name='city_id' pupolate={selectCities} component={LabelAndSelect} label='City' cols='12 4' readOnly={readOnly} option='name' />
						<Field name='address' component={LabelAndInput} label='Address' cols='12 4' placeholder='Address' readOnly={readOnly} />
						<Field name='address_complement' component={LabelAndInput} label='Address Complement' cols='12 6' placeholder='Address Complement' readOnly={readOnly} />
						<Field name='postcode' component={LabelAndInput} label='Postcode' cols='12 2' placeholder='Postcode' readOnly={readOnly} />
						<Field name='notes_private' component={LabelAndTextarea} label='Notes Private' cols='12 12' placeholder='Notes Private' readOnly={readOnly} rows='1' />
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
SchoolForm = reduxForm({form: 'schoolForm', destroyOnUnmount: false})(SchoolForm);
const mapStateToProps = state => ({
	listCountries: state.country.list, 
	listZones: state.zone.listZones, 
	listCities: state.city.listCities,
	listSchoolGroup: state.schoolgroup.list
});
const mapDispatchToProps = dispatch => bindActionCreators({init, getListCountries, getListZones, getListCities, getListSchoolGroups}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SchoolForm);
