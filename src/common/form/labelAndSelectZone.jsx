import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Grid from '../layout/layoutGrid';
import { getListCities } from './../../admin/city/cityActions';

class LabelAndSelectZone extends Component {
	constructor(props) {
		super(props);
		this.state = {
            value_zone: this.props.input.value
		};
		this.handleChangeZone = this.handleChangeZone.bind(this);
	}
	selectCity() {
		let zone_id = this.refs.citiesSelector.value;
		this.props.getListCities(zone_id);
	}

	handleChangeZone() {
        this.setState({
            value_zone: undefined
		});
		 this.setState({
            value_zone: this.refs.citiesSelector.value
        });
	}
	
	componentDidMount() {
		if(this.state.value_zone){
			this.props.getListCities(this.state.value_zone);
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
		return (
			<Grid cols={this.props.cols}>		
				<div className='form-group'>
					<label htmlFor={this.props.name}>{this.props.label}</label>
					<select  {...this.props.input}  
					    ref='citiesSelector' onChange={ () => { this.selectCity(); this.handleChangeZone(); } }
						value={this.state.value_zone}
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
const mapStateToProps = state => ({listCities: state.zone.listCities});
const mapDispatchToProps = dispatch => bindActionCreators({getListCities}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(LabelAndSelectZone);