import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Grid from '../layout/layoutGrid';
import { getListZones } from './../../admin/zone/zoneActions';

class LabelAndSelectCountry extends Component {
	constructor(props) {
		super(props);
		this.state = {
            value: this.props.input.value
		};
		this.handleChange = this.handleChange.bind(this);
	}
	selectZone() {
		let country_id = this.refs.zonesSelector.value;
		this.props.getListZones(country_id);
	}

	handleChange() {
        this.setState({
            value: undefined
		});
		 this.setState({
            value: this.refs.zonesSelector.value
        });
	}
	
	componentDidMount() {
		if(this.state.value){
			this.props.getListZones(this.state.value);
		}
	}
	
	render () {
		const  selectSelect = this.props.pupolate;
		const  option = this.props.option;
		if(selectSelect.length > 0){
			var optionItems = selectSelect.map((item) =>
				<option key={item.id}  value={item.id}>{item[option]}</option>
			);
		  }else{
			var optionItems = <option  value=''>No results</option>
		  }
		const { input, meta } = this.props;
		return (
			<Grid cols={this.props.cols}>		
				<div className='form-group'>
					<label htmlFor={this.props.name}>{this.props.label}</label>
					<select  {...this.props.input}  
					    ref='zonesSelector' onChange={ () => { this.selectZone(); this.handleChange(); } }
						value={this.state.value}
						className='form-control select2 select2-hidden-accessible'
						tabIndex='-1'
						aria-hidden='true'
						disabled={this.props.readOnly}
						readOnly={this.props.readOnly} type={this.props.type}>
						<option value='' defaultValue>Select</option>
						{optionItems}
					</select>
				</div>
			</Grid>
		);
	}

}
const mapStateToProps = state => ({listZones: state.zone.listZones});
const mapDispatchToProps = dispatch => bindActionCreators({getListZones}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(LabelAndSelectCountry);