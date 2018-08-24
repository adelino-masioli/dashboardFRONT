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
import { getAgencyImageByID } from './agencyimageActions';
import { getAgencyByID } from "../agency/agencyActions";
import { getList as getAgencyPropTypes } from "../admin/agencyproptype/agencyproptypeActions";

class AgencyImageForm extends Component {
	constructor() {
	 super();
		this.state = {
			agency: {}
		};
	}
	componentWillMount() {
		const schoolid = this.props.dataProps;
		this.props.change('agency_id', schoolid);
		this.props.change('agency_name', localStorage.getItem('localStAgency'));
		this.props.getAgencyPropTypes();

		//get single school contact
		const id = this.props.dataPropsId;
		if(id){
		const agencyImage = this.props.getAgencyImageByID(id)
		    .then((res) =>{
		        for (let result of Object.values(res.payload)) {
		    	  this.props.change('id', result.id);
		    	  this.props.change('name', result.name);
		    	  this.props.change('status', res.payload.data.status);
		    	  this.props.change('type_id', res.payload.data.type_id);
		    	}
		    });
		}
	}

	render(){
		const { handleSubmit, readOnly} = this.props;
		const selectImageTypes = this.props.listAgencyPropType || [];
		const selectStatus  = [{'id':1, 'value':'Active'}, {'id':2, 'value':'No active'}];
	
		return (
			<form role='form' onSubmit={handleSubmit} encType="multipart/form-data">
				<div className='box-body'>
					<Row>
						<Field name='id' component={InputHidden} readOnly={true} type='hidden'/>
						<Field name='agency_id' component={LabelAndInput} label='Agência ID' cols='12 2' placeholder='Agência ID' readOnly={true}/>
						<Field name='agency_name'  component={LabelAndInput} label='Agência' cols='12 10' placeholder='Agência'  readOnly={true}/>
						<Field name='name' component={LabelAndInput} label='Name' cols='12 8' placeholder='Name' readOnly={readOnly} />
						<Field name='url' component={LabelAndInput} label='Image' cols='12 4' placeholder='Image' readOnly={readOnly} type='file' />
						<Field name='type_id' pupolate={selectImageTypes} component={LabelAndSelect} label='Type' cols='12 3' readOnly={readOnly} option='name'/>
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
AgencyImageForm = reduxForm({form: 'agencyimageForm', destroyOnUnmount: false})(AgencyImageForm);
const mapStateToProps = state => ({
	listFilter: state.agency.listFilter,
	listImage: state.agencyimage.getAgencyImageByID,
	listAgencyPropType: state.agencyproptype.list
});
const mapDispatchToProps = dispatch => bindActionCreators({
	getAgencyByID,
	getAgencyImageByID,
	getAgencyPropTypes
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AgencyImageForm);
