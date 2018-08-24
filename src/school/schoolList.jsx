import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link} from 'react-router';
import { getList, showUpdate, showDelete } from './schoolActions';
import NoResult from '../common/template/noResult';
import If from '../common/operator/if';
import LoadingPage from '../common/loading/loading';
import TableHead from '../common/datatable/tableHead';

class SchoolList extends Component {
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
					<td>{res.school_group.name}</td>
					<td>{res.name}</td>
					<td>{res.city.name}</td>
					<td>{res.country.name}</td>
					<td>{res.status == 1 ? 'Active' : 'No active'}</td>
					<td className='text-center'>
						<div className='btn-group'>
						    <If test={res.status == 1}>
								<Link to={`/schools/${res.id}`} className='btn btn-xs btn-flat btn-info' onClick={() => this.props.showUpdate(res)}>
									<i className='fa fa-eye'></i>
								</Link>
							</If>
							<If test={res.status !=1}>
								<button type='button' className='btn btn-xs btn-flat btn-default' disabled>
									<i className='fa fa-eye'></i>
								</button>
							</If>
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
	
	render() {
		const headerTitle = ['ID', 'SCHOOL GROUP', 'NAME', 'CITY NAME', 'COUNTRY', 'STATUS', 'ACTIONS'];
		return (
			<div>
			<LoadingPage isActive={this.state.wating} />
				<table className='table'>
					<thead>
						<TableHead headerTitle={headerTitle}/>
					</thead>
					<tbody>
						{this.renderRows()}
					</tbody>
				</table>
			</div>
		);
	}
}
const mapStateToProps = state => ({list: state.school.list});
const mapDispatchToProps = dispatch => bindActionCreators({getList, showUpdate, showDelete}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SchoolList);
