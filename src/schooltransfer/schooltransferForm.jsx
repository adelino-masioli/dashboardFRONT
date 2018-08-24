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
import { getSchoolTransferByID } from './schooltransferActions';
import { getSchoolByID } from "../school/schoolActions";

class SchoolTransferForm extends Component {
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
		const schoolContent = this.props.getSchoolTransferByID(id)
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
	}

	render(){
		const { handleSubmit, readOnly} = this.props;
		const selectStatus  = [{'id':1, 'value':'Active'}, {'id':2, 'value':'No active'}];
	
		return (
			<form role='form' onSubmit={handleSubmit}>
				<div className='box-body'>
					<Row>
					    <Field name='id' component={InputHidden}  readOnly={true} type='hidden'/>
						<Field name='school_id' component={LabelAndInput} label='School ID' cols='12 1' placeholder='School ID' readOnly={true}/>
						<Field name='school_name'  component={LabelAndInput} label='School' cols='12 11' placeholder='School'  readOnly={true}/>
						<Field name='name'  component={LabelAndInput} label='Name' cols='12 9' placeholder='Name'  readOnly={readOnly}/>
						<Field name='price'  component={LabelAndInput} label='Price' cols='12 3' placeholder='Price'  readOnly={readOnly}/>
						<Field name='notes' component={LabelAndTextarea} label='Notes' cols='12 12' placeholder='Notes' readOnly={readOnly} rows='1' />					
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
SchoolTransferForm = reduxForm({form: 'schoolTransferForm', destroyOnUnmount: false})(SchoolTransferForm);
const mapStateToProps = state => ({schooltransfer: state.schooltransfer.listFilter});
const mapDispatchToProps = dispatch => bindActionCreators({getSchoolByID, getSchoolTransferByID}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SchoolTransferForm);
