import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import LabelAndInput from '../../common/form/labelAndInput';
import Row from '../../common/layout/row';
import Grid from '../../common/layout/layoutGrid';
import { init } from './languageActions';


class LanguageForm extends Component {

	constructor(props) {
		super(props);
    }
	render(){
		const { handleSubmit, readOnly, pristine, dataProps } = this.props;
		const selectCountries  = this.props.listCountries || [];
		const selectStatus  = [{'id':1, 'value':'Active'}, {'id':2, 'value':'No active'}];
		const id  = dataProps || null;	
	
		return (
			<form role='form' onSubmit={handleSubmit}>
				<div className='box-body'>
					<Row>
						<Field name='name' component={LabelAndInput} label='Name' cols='12 5' placeholder='Name' readOnly={readOnly} />
						<Field name='short_name' component={LabelAndInput} label='Short Name' cols='12 5' placeholder='Short Name' readOnly={readOnly} />
						<Field name='iso' component={LabelAndInput} label='Iso' cols='12 2' placeholder='Iso' readOnly={readOnly} />
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
LanguageForm = reduxForm({form: 'languageForm', destroyOnUnmount: false})(LanguageForm);
const mapDispatchToProps = dispatch => bindActionCreators({
	init
}, dispatch);
export default connect(null, mapDispatchToProps)(LanguageForm);
