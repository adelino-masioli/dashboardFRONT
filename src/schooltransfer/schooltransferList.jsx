import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link} from 'react-router';
import {
	getList,
	showCreate,
	showUpdate,
	showDelete
} from './schooltransferActions';
import Row from '../common/layout/row';
import Grid from '../common/layout/layoutGrid';
import Box from '../common/template/box';
import NoResult from '../common/template/noResult';

class SchoolTransferList extends Component {

	componentDidMount() {
		this.props.getList();
	}
	renderRows() {	
		const { dataProps } = this.props;	
		const id = dataProps || null;
		const list = this.props.list || [];
		if (list.status == false){
			return <NoResult colSpan='7' msg='No results' />
		}else{
			return list.map(res => (
				<tr key={res.id}>
					<td className='text-center'>{res.id}</td>
					<td>{res.name}</td>
					<td>{res.price}</td>
					<td>{res.notes}</td>
					<td>{res.status == 1 ? 'Active' : 'No active'}</td>
					<td className='text-center'>
						<div className='btn-group'>
							<Link to={`/school-transfers/${id}/${res.id}/update`} className='btn btn-xs btn-flat btn-warning' onClick={() => this.props.showUpdate(res)}>
								<i className='fa fa-pencil'></i>
							</Link>
							<Link to={`/school-transfers/${id}/${res.id}/delete`} className='btn btn-xs btn-flat btn-danger' onClick={() => this.props.showDelete(res)}>
								<i className='fa fa-trash-o'></i>
							</Link>
						</div>
					</td>
				</tr>
			));
		}
	}
	renderHeader(){
		const headerTitle = ['ID',  'NAME',  'PRICE', 'NOTES', 'STATUS', 'ACTIONS'];
		return headerTitle.map((res, index) =>
			<th className='text-center' key={index}>{res}</th>
		);
	}

	render() {
		const { dataProps } = this.props;	
		const id = dataProps || null;
		return (
			<div>
			<Row>
			  <Grid cols='12 12'>
			  	<Box>
					<Link to={`/school-transfers/${id}/create`} className='btn btn-sm btn-flat btn-primary pull-right' onClick={() => this.props.showCreate()}>
						<i className='fa fa-plus'></i> Create New
					</Link>
				</Box>
			  </Grid>
			</Row>
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
const mapStateToProps = state => ({list: state.schooltransfer.list});
const mapDispatchToProps = dispatch => bindActionCreators({getList, showCreate, showUpdate, showDelete}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SchoolTransferList);
