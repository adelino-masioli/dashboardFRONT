import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link} from 'react-router';
import { getList, showUpdate, showDelete } from './customerActions';
import NoResult from '../common/template/noResult';
import If from '../common/operator/if';
import LoadingPage from '../common/loading/loading';

class CustomerList extends Component {
	constructor(props) {
		super(props);
		this.state = {
            wating: true
		};
	}
	componentDidMount() {
		this.props.getList()
		.then((res) =>{
			this.setState({ wating: false });
		});
	}

	renderRows() {
		const list = this.props.list || [];
		if (list.status == false) {
			return <NoResult colSpan='8' msg='No results'/>
		} else {
			return list.map(res => (
				<tr key={res.id}>
					<td className='text-center'>{res.id}</td>
					<td>{res.name}</td>
					<td>{res.sex}</td>
					<td>{res.nationality}</td>
					<td>{res.country.name}</td>
					<td>{res.type.name}</td>
					<td>{res.status == 1 ? 'Active' : 'No active'}</td>
					<td className='text-center'>
						<div className='btn-group'>
							<button className='btn btn-xs btn-flat btn-warning' onClick={() => this.props.showUpdate(res)}>
								<i className='fa fa-pencil'></i>
							</button>
							<button className='btn btn-xs btn-flat btn-danger' onClick={() => this.props.showDelete(res)}>
								<i className='fa fa-trash-o'></i>
							</button>
						</div>
					</td>
				</tr>
			));
		}
	}
	renderHeader(){
		const headerTitle = ['ID', 'NAME', 'SEX', 'NATIONALITY', 'COUNTRY',  'TYPE',  'STATUS', 'ACTIONS'];
		return headerTitle.map((res, index) =>
			<th className='text-center' key={index}>{res}</th>
		);
	}

	render() {
		return (
			<div>
			    <LoadingPage isActive={this.state.wating} />
				<table className='table'>
					<thead>
						<tr>
							{this.renderHeader()}
						</tr>
					</thead>
					<tbody>
						{this.renderRows()}
					</tbody>
				</table>
			</div>
		);
	}
}
const mapStateToProps = state => ({list: state.customer.list});
const mapDispatchToProps = dispatch => bindActionCreators({getList, showUpdate, showDelete}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
