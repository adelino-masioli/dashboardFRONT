import React, {Component} from 'react';
import Grid from '../layout/layoutGrid';

class labelAndSelect extends Component {
	constructor(props) {
		super(props);
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
		)
	}

}
export default labelAndSelect;