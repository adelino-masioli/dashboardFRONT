import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import LabelAndInput from '../../common/form/labelAndInput';
import LabelAndSelect from '../../common/form/labelAndSelect';
import Row from '../../common/layout/row';
import Grid from '../../common/layout/layoutGrid';
import { init } from './cityActions';
import { getList as getListCountries } from '../country/countryActions';
import { getList as getListZones } from '../zone/zoneActions';


class CityForm extends Component {

	constructor(props) {
		super(props);
    }
	componentDidMount() {
		this.props.getListCountries();
		this.props.getListZones();
	}
	render(){
		const { handleSubmit, readOnly,  dataProps } = this.props;
		const selectCountries = this.props.listCountries || [];
		const selectZones = this.props.listZones || [];
		const selectStatus  = [{'id':1, 'value':'Active'}, {'id':2, 'value':'No active'}];
		const id  = dataProps || null;	
	
		return (
			<form role='form' onSubmit={handleSubmit}>
				<div className='box-body'>
					<Row>
						<Field name='name' component={LabelAndInput} label='Name' cols='12 5' placeholder='Name' readOnly={readOnly} />
						<Field name='code' component={LabelAndInput} label='Code' cols='12 5' placeholder='Code' readOnly={readOnly} />
						<Field name='country_id' pupolate={selectCountries} component={LabelAndSelect} label='Country' cols='12 5' readOnly={readOnly} option='name'/>
						<Field name='zone_id' pupolate={selectZones} component={LabelAndSelect} label='Zone' cols='12 5' readOnly={readOnly} option='name'/>
						<Field name='status' pupolate={selectStatus} component={LabelAndSelect} label='Status' cols='12 2' readOnly={readOnly} option='value'/>
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
CityForm = reduxForm({form: 'cityForm', destroyOnUnmount: false})(CityForm);
const mapStateToProps = state => ({
	listCountries: state.country.list,
	listZones: state.zone.list,
});
const mapDispatchToProps = dispatch => bindActionCreators({
	init, 
	getListCountries,
	getListZones
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CityForm);
