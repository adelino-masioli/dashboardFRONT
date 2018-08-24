import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { browserHistory, Link} from 'react-router';
import LabelAndInput from '../common/form/labelAndInput';
import InputHidden from '../common/form/inputHidden';
import LabelAndTextarea from '../common/form/labelAndTextarea';
import LabelAndSelect from '../common/form/labelAndSelect';
import Row from '../common/layout/row';
import Grid from '../common/layout/layoutGrid';
import { getSchoolContactByID } from './schoolcontactActions';
import {getSchoolByID} from "../school/schoolActions";

class SchoolContactForm extends Component {
	constructor() {
	 super();
		this.state = {
			school: {}
		};
	}
	componentWillMount() {
		const schoolid = this.props.dataProps;
		this.props.change('school_id', schoolid);
		this.props.change('school_name', localStorage.getItem('localStSchool'));

		//get single school contact
		const id = this.props.dataPropsId;
		if(id){
		const schoolContact = this.props.getSchoolContactByID(id)
		    .then((res) =>{
		        for (let result of Object.values(res.payload)) {
		    	  this.props.change('id', result.id);
		    	  this.props.change('name', result.name);
		    	  this.props.change('nickname', result.nickname);
		    	  this.props.change('occupation', result.occupation);
		    	  this.props.change('phone_number', result.phone_number);
		    	  this.props.change('skype', result.skype);
		    	  this.props.change('email', result.email);
		    	  this.props.change('notes', result.notes);
		    	  this.props.change('ismain', result.ismain);
		    	  this.props.change('status', res.payload.data.status);
		    	}
		    });
		}
	}

	render(){
		const { handleSubmit, readOnly, pristine, dataProps} = this.props;
		const selectSchoolGroups = this.props.listSchoolGroup || [];
		const selectCountries = this.props.listCountries || [];
		const selectZones  = this.props.listZones || [];
		const selectCities  = this.props.listCities || [];
		const selectStatus  = [{'id':1, 'value':'Active'}, {'id':2, 'value':'No active'}];
		const selectLanguages  = this.props.listLanguages || [];
		const schoolid  = dataProps || null;
		const listFilter = this.props.listFilter || [];

	
	
		return (
			<form role='form' onSubmit={handleSubmit}>
				<div className='box-body'>
					<Row>
						<Field name='id' component={InputHidden} readOnly={true} type='hidden'/>
						<Field name='school_id' component={LabelAndInput} label='School ID' cols='12 1' placeholder='School ID' readOnly={true}/>
						<Field name='school_name'  component={LabelAndInput} label='School' cols='12 11' placeholder='School'  readOnly={true}/>
						<Field name='name' component={LabelAndInput} label='Name' cols='12 8' placeholder='Name' readOnly={readOnly} />
						<Field name='nickname' component={LabelAndInput} label='Nickname' cols='12 4' placeholder='Nickname' readOnly={readOnly} />
						<Field name='occupation' component={LabelAndInput} label='Occupation' cols='12 3' placeholder='Occupation' readOnly={readOnly} />
						<Field name='phone_number' component={LabelAndInput} label='Phone Number' cols='12 3' placeholder='Phone Number' readOnly={readOnly} />
						<Field name='skype' component={LabelAndInput} label='Skype' cols='12 3' placeholder='Skype' readOnly={readOnly} />
						<Field name='email' component={LabelAndInput} label='Email' cols='12 3' placeholder='Email' readOnly={readOnly} />
						<Field name='notes' component={LabelAndTextarea} label='Notes' cols='12 12' placeholder='Notes' readOnly={readOnly} rows='1'/>						
						<Field name='ismain' component={LabelAndInput} label='Is main(Y or N)' cols='12 3' maxlength='1' placeholder='Is main(Y or N)' readOnly={readOnly} />
						<Field name='status' pupolate={selectStatus} component={LabelAndSelect} label='Status' cols='12 3' readOnly={readOnly} option='value'/>
					</Row>
				</div>
				<div className='box-footer'>
					<Row>
						<Grid cols='12 1'>
							<button type='submit' className={`btn btn-flat btn-${this.props.submitClass}`}>{this.props.submitLabel}</button>
						</Grid>
						<Grid cols='12 1'>					
							<button type='button' onClick={browserHistory.goBack} className='btn btn-flat btn-default'>Cancel</button>
						</Grid>
					</Row>
				</div>
			</form>
		);
	}
}
SchoolContactForm = reduxForm({form: 'schoolSchoolContactForm', destroyOnUnmount: false})(SchoolContactForm);
const mapStateToProps = state => ({listFilter: state.school.listFilter, listContact: state.schoolcontact.getSchoolContactByID});
const mapDispatchToProps = dispatch => bindActionCreators({getSchoolByID,getSchoolContactByID}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SchoolContactForm);
