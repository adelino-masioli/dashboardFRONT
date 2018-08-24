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
import { initCreate, getSchoolContentByID } from './schoolcontentActions';
import { getSchoolByID } from "../school/schoolActions";
import { getList } from './../admin/language/languageActions';


class SchoolContentForm extends Component {
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
		const schoolContent = this.props.getSchoolContentByID(id)
		    .then((res) =>{
		        for (let result of Object.values(res.payload)) {
				  this.props.change('id', result.id);
		    	  this.props.change('mappinglink', result.mappinglink);
		    	  this.props.change('description', result.description);
		    	  this.props.change('checkin_times', result.checkin_times);
		    	  this.props.change('area_activities', result.area_activities);
		    	  this.props.change('driving_directions', result.driving_directions);
		    	  this.props.change('airports', result.airports);
		    	  this.props.change('othertransport', result.othertransport);
		    	  this.props.change('policies_disclaimers', result.policies_disclaimers);
		    	  this.props.change('notes', result.notes);
		    	  this.props.change('language_id', result.language_id);
		    	  this.props.change('status', res.payload.data.status);
		    	}
		    });
		}

		this.props.getList();
	}

	render(){
		const { handleSubmit, readOnly} = this.props;
		const selectStatus  = [{'id':1, 'value':'Active'}, {'id':2, 'value':'No active'}];
		const selectLanguages  = this.props.listLanguages || [];
	
		return (
			<form role='form' onSubmit={handleSubmit}>
				<div className='box-body'>
					<Row>
					    <Field name='id' component={InputHidden}  readOnly={true} type='hidden'/>
						<Field name='school_id' component={LabelAndInput} label='School ID' cols='12 1' placeholder='School ID' readOnly={true}/>
						<Field name='school_name'  component={LabelAndInput} label='School' cols='12 11' placeholder='School'  readOnly={true}/>
						<Field name='mappinglink' component={LabelAndTextarea} label='Mappinglink' cols='12 6' placeholder='Mappinglink' readOnly={readOnly} rows='1' />
						<Field name='description' component={LabelAndTextarea} label='Description' cols='12 6' placeholder='Description' readOnly={readOnly} rows='1' />
						<Field name='checkin_times' component={LabelAndTextarea} label='Checkin Times' cols='12 6' placeholder='Checkin Times' readOnly={readOnly} rows='1' />
						<Field name='area_activities' component={LabelAndTextarea} label='Area Activities' cols='12 6' placeholder='Area Activities' readOnly={readOnly} rows='1' />
						<Field name='driving_directions' component={LabelAndTextarea} label='Driving Directions' cols='12 6' placeholder='Driving Directions' readOnly={readOnly} rows='1' />
						<Field name='airports' component={LabelAndTextarea} label='Airports' cols='12 6' placeholder='Airports' readOnly={readOnly} rows='1' />
						<Field name='othertransport' component={LabelAndTextarea} label='Othertransport' cols='12 6' placeholder='Othertransport' readOnly={readOnly} rows='1' />
						<Field name='policies_disclaimers' component={LabelAndTextarea} label='Policies Disclaimers' cols='12 6' placeholder='Policies Disclaimers' readOnly={readOnly} rows='1' />
						<Field name='notes' component={LabelAndTextarea} label='Notes' cols='12 12' placeholder='Notes' readOnly={readOnly} rows='1' />
						<Field name='language_id' pupolate={selectLanguages} component={LabelAndSelect} label='Language' cols='12 3' readOnly={readOnly} option='name'/>
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
SchoolContentForm = reduxForm({form: 'schoolContentForm', destroyOnUnmount: false})(SchoolContentForm);
const mapStateToProps = state => ({listContent: state.schoolcontent.listFilter, listLanguages: state.language.list});
const mapDispatchToProps = dispatch => bindActionCreators({initCreate, getSchoolByID,getSchoolContentByID, getList}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SchoolContentForm);
