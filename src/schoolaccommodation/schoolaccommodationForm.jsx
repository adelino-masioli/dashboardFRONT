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
import { getSchoolAccommodationByID } from './schoolaccommodationActions';
import { getSchoolByID } from "../school/schoolActions";
import { getList as getListTypes } from './../admin/accommodationtype/accommodationtypeActions';

class SchoolAccommodationForm extends Component {
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

		//get single school content
		const id = this.props.dataPropsId;
		if(id){
		const schoolContent = this.props.getSchoolAccommodationByID(id)
		    .then((res) =>{
		        for (let result of Object.values(res.payload)) {
				  this.props.change('id', result.id);
		    	  this.props.change('name', result.name);
		    	  this.props.change('description', result.description);
		    	  this.props.change('type_id', result.type_id);
		    	  this.props.change('status', res.payload.data.status);
		    	}
		    });
		}

		this.props.getListTypes();
	}

	render(){
		const { handleSubmit, readOnly} = this.props;
		const selectStatus  = [{'id':1, 'value':'Active'}, {'id':2, 'value':'No active'}];
		const selectTypes  = this.props.listTypes || [];
	
		return (
			<form role='form' onSubmit={handleSubmit}>
				<div className='box-body'>
					<Row>
					    <Field name='id' component={InputHidden}  readOnly={true} type='hidden'/>
						<Field name='school_id' component={LabelAndInput} label='School ID' cols='12 1' placeholder='School ID' readOnly={true}/>
						<Field name='school_name'  component={LabelAndInput} label='School' cols='12 11' placeholder='School'  readOnly={true}/>
						<Field name='name'  component={LabelAndInput} label='Name' cols='12 12' placeholder='Name'  readOnly={readOnly}/>
						<Field name='description' component={LabelAndTextarea} label='Description' cols='12 12' placeholder='Description' readOnly={readOnly} rows='1' />
						<Field name='type_id' pupolate={selectTypes} component={LabelAndSelect} label='Type' cols='12 3' readOnly={readOnly} option='name'/>
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
SchoolAccommodationForm = reduxForm({form: 'schoolAccommodationForm', destroyOnUnmount: false})(SchoolAccommodationForm);
const mapStateToProps = state => ({listContent: state.schoolcontent.listFilter, listTypes: state.accommodationtype.list});
const mapDispatchToProps = dispatch => bindActionCreators({getSchoolByID, getSchoolAccommodationByID,  getListTypes}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SchoolAccommodationForm);
