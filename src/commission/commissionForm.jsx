import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { browserHistory, Link} from 'react-router';
import LabelAndInput from '../common/form/labelAndInput';
import InputHidden from '../common/form/inputHidden';
import LabelAndSelect from '../common/form/labelAndSelect';
import Row from '../common/layout/row';
import Grid from '../common/layout/layoutGrid';
import { getCommissionByID } from './commissionActions';
import { getSchoolByID } from "../school/schoolActions";
import { getList as getListTypes } from './../admin/itemtype/itemtypeActions';
import { getListCompanies } from './../admin/company/companyActions';

class CommissionForm extends Component {
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
		const schoolContent = this.props.getCommissionByID(id)
		    .then((res) =>{
		        for (let result of Object.values(res.payload)) {
				  this.props.change('id', result.id);
		    	  this.props.change('value', result.value);
		    	  this.props.change('description', result.description);
		    	  this.props.change('item_type_id', result.item_type_id);
		    	  this.props.change('company_id', result.company_id);
		    	  this.props.change('status', res.payload.data.status);
		    	}
		    });
		}

		this.props.getListTypes();
		this.props.getListCompanies();
	}

	render(){
		const { handleSubmit, readOnly} = this.props;
		const selectStatus  = [{'id':1, 'value':'Active'}, {'id':2, 'value':'No active'}];
		const selectTypes  = this.props.listTypes || [];
		const selectCompanies  = this.props.listCompanies || [];
	
		return (
			<form role='form' onSubmit={handleSubmit}>
				<div className='box-body'>
					<Row>
					    <Field name='id' component={InputHidden}  readOnly={true} type='hidden'/>
						<Field name='school_id' component={LabelAndInput} label='School ID' cols='12 1' placeholder='School ID' readOnly={true}/>
						<Field name='school_name'  component={LabelAndInput} label='School' cols='12 11' placeholder='School'  readOnly={true}/>
						<Field name='value'  component={LabelAndInput} label='Value(%)' cols='12 12' placeholder='Value(%)'  readOnly={readOnly}/>						
						<Field name='item_type_id' pupolate={selectTypes} component={LabelAndSelect} label='Item Type' cols='12 3' readOnly={readOnly} option='name'/>
						<Field name='company_id' pupolate={selectCompanies} component={LabelAndSelect} label='Companies' cols='12 3' readOnly={readOnly} option='name'/>
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
CommissionForm = reduxForm({form: 'commissionForm', destroyOnUnmount: false})(CommissionForm);
const mapStateToProps = state => ({
	commission: state.commission.listFilter,
	listTypes: state.itemtype.list,
	listCompanies: state.company.list
});
const mapDispatchToProps = dispatch => bindActionCreators({getSchoolByID, getCommissionByID,  getListTypes, getListCompanies}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CommissionForm);
