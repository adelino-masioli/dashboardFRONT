import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import LabelAndInput from '../../common/form/labelAndInput';
import LabelAndSelect from '../../common/form/labelAndSelect';
import LabelAndSelectCountry from '../../common/form/labelAndSelectCountry';
import Row from '../../common/layout/row';
import Grid from '../../common/layout/layoutGrid';
import { init } from './currencyActions';

class CurrencyForm extends Component {

	constructor(props) {
		super(props);
    }
	render(){
		const { handleSubmit, readOnly,  dataProps } = this.props;
		const selectStatus  = [{'id':1, 'value':'Active'}, {'id':2, 'value':'No active'}];
		const id  = dataProps || null;	
	
		return (
			<form role='form' onSubmit={handleSubmit}>
				<div className='box-body'>
					<Row>
						<Field name='name' component={LabelAndInput} label='Name' cols='12 5' placeholder='Name' readOnly={readOnly}  maxlength='50' />
						<Field name='code' component={LabelAndInput} label='Code' cols='12 5' placeholder='Code' readOnly={readOnly} maxlength='10' />
						<Field name='symbol' component={LabelAndInput} label='Symbol' cols='12 2' placeholder='Symbol' readOnly={readOnly} maxlength='50' />
						<Field name='decimal_places' component={LabelAndInput} label='Decimal Places' cols='12 5' placeholder='Decimal Places' readOnly={readOnly} maxlength='1' type='number'/>
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
CurrencyForm = reduxForm({form: 'currencyForm', destroyOnUnmount: false})(CurrencyForm);
const mapDispatchToProps = dispatch => bindActionCreators({
	init
}, dispatch);
export default connect(null, mapDispatchToProps)(CurrencyForm);
