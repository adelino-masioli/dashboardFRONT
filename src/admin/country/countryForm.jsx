import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import LabelAndInput from '../../common/form/labelAndInput';
import LabelAndSelect from '../../common/form/labelAndSelect';
import Row from '../../common/layout/row';
import Grid from '../../common/layout/layoutGrid';
import { init } from './countryActions';


class CountryForm extends Component {

	constructor(props) {
		super(props);
    }
	render(){
		const { handleSubmit, readOnly,  dataProps } = this.props;
		const id  = dataProps || null;	
	
		return (
			<form role='form' onSubmit={handleSubmit}>
				<div className='box-body'>
					<Row>
						<Field name='iso' component={LabelAndInput} label='Sortname' cols='12 5' placeholder='Sortname' readOnly={readOnly} maxlength='3'/>
						<Field name='name' component={LabelAndInput} label='Name' cols='12 7' placeholder='Name' readOnly={readOnly} />
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
CountryForm = reduxForm({form: 'countryForm', destroyOnUnmount: false})(CountryForm);
const mapDispatchToProps = dispatch => bindActionCreators({
	init
}, dispatch);
export default connect(null, mapDispatchToProps)(CountryForm);
