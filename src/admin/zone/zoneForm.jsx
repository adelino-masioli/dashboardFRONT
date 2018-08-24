import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import LabelAndInput from '../../common/form/labelAndInput';
import LabelAndSelect from '../../common/form/labelAndSelect';
import Row from '../../common/layout/row';
import Grid from '../../common/layout/layoutGrid';
import { init } from './zoneActions';
import { getList as getListCountries } from '../country/countryActions';


class ZoneForm extends Component {

	constructor(props) {
		super(props);
    }
	componentDidMount() {
		this.props.getListCountries();
	}
	render(){
		const { handleSubmit, readOnly,  dataProps } = this.props;
		const selectCountries = this.props.listCountries || [];
		const id  = dataProps || null;	
	
		return (
			<form role='form' onSubmit={handleSubmit}>
				<div className='box-body'>
					<Row>
						<Field name='name' component={LabelAndInput} label='Name' cols='12 8' placeholder='Name' readOnly={readOnly} />
						<Field name='country_id' pupolate={selectCountries} component={LabelAndSelect} label='Country' cols='12 4' readOnly={readOnly} option='name'/>
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
ZoneForm = reduxForm({form: 'zoneForm', destroyOnUnmount: false})(ZoneForm);
const mapStateToProps = state => ({
	listCountries: state.country.list
});
const mapDispatchToProps = dispatch => bindActionCreators({
	init, 
	getListCountries
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ZoneForm);
