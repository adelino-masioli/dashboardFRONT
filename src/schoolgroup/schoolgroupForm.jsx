import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import LabelAndInput from '../common/form/labelAndInput';
import LabelAndTextarea from '../common/form/labelAndTextarea';
import LabelAndSelect from '../common/form/labelAndSelect';
import Row from '../common/layout/row';
import Grid from '../common/layout/layoutGrid';
import { init } from './schoolgroupActions';

class SchoolGroupForm extends Component {
	render(){
		const { handleSubmit, readOnly } = this.props;
		const  selectStatus  = [{'id':1, 'value':'Active'}, {'id':2, 'value':'No active'}];
		return (
			<form role='form' onSubmit={handleSubmit}>
				<div className='box-body'>
					<Row>
						<Field name='name' component={LabelAndInput} label='Name' cols='12 12' placeholder='Name' readOnly={readOnly} />
						<Field name='description' component={LabelAndTextarea} label='Description' cols='12 12' placeholder='Description' readOnly={readOnly} rows='3' />
						<Field name='status' pupolate={selectStatus} component={LabelAndSelect} label='Status' cols='12 3' readOnly={readOnly} option='value'/>
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
SchoolGroupForm = reduxForm({form: 'schoolgroupForm', destroyOnUnmount: false})(SchoolGroupForm);
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch);
export default connect(null, mapDispatchToProps)(SchoolGroupForm);
