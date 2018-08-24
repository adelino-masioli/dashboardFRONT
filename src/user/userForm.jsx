import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import LabelAndInput from '../common/form/labelAndInput';
import LabelAndSelect from '../common/form/labelAndSelect';
import Row from '../common/layout/row';
import Grid from '../common/layout/layoutGrid';
import { init } from './userActions';

class UserForm extends Component {
	render(){
		const { handleSubmit, readOnly } = this.props;
		const  selectStatus  = [{'id':1, 'value':'Active'}, {'id':2, 'value':'No active'}];
		const  selectSuperUser  = [{'id':1, 'value':'Yes'}, {'id':2, 'value':'No'}];
		const  selectType  = [{'id':1, 'value':'Admin'}, {'id':2, 'value':'Adviser'}, {'id':3, 'value':'Employee'}, {'id':4, 'value':'Manager'}];
		return (
			<form role='form' onSubmit={handleSubmit}>
				<div className='box-body'>
					<Row>
						<Field name='name' component={LabelAndInput} label='Name' cols='12 6' placeholder='Name' readOnly={readOnly} />
						<Field name='username' component={LabelAndInput} label='Username' cols='12 3' placeholder='Name' readOnly={readOnly} />
						<Field name='email' component={LabelAndInput} label='Email' cols='12 3' placeholder='Email' type="email" readOnly={readOnly} />
						<Field name='password' component={LabelAndInput} label='Password' cols='12 3' placeholder='Password' type="password" readOnly={readOnly} />
						<Field name='password_confirmation' component={LabelAndInput} label='Confirm Password' cols='12 3' placeholder='Confirm Password' type="password" readOnly={readOnly} />
						<Field name='superuser' pupolate={selectSuperUser} component={LabelAndSelect} label='Superuser' cols='12 3'readOnly={readOnly} option='value' />
						<Field name='status' pupolate={selectStatus} component={LabelAndSelect} label='Status' cols='12 3' readOnly={readOnly} option='value' />
						<Field name='type' pupolate={selectType} component={LabelAndSelect} label='User Type' cols='12 3' readOnly={readOnly} option='value'/>
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
UserForm = reduxForm({form: 'userForm', destroyOnUnmount: false})(UserForm);
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch);
export default connect(null, mapDispatchToProps)(UserForm);
