import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link} from 'react-router';
import {
	getList,
	showCreate,
	showUpdate,
	showDelete
} from './agencyimageActions';
import Row from '../common/layout/row';
import Grid from '../common/layout/layoutGrid';
import Box from '../common/template/box';
import NoResult from '../common/template/noResult';
import LoadingPage from '../common/loading/loading';


class AgencyImageList extends Component {

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
		const { dataProps } = this.props;	
		const id = dataProps || null;
		const list = this.props.list || [];
		if (list.status == false){
			return <NoResult colSpan='6' msg='No results' />
		}else{
			return list.map(res => (
				<tr key={res.id}>
					<td className='text-center'>{res.id}</td>
					<td>{res.name}</td>
					<td>{res.agency ? res.agency.name : ''}</td>
					<td>{res.type ? res.type.name : ''}</td>
					<td>{res.status == 1 ? 'Active' : 'No active'}</td>
					<td className='text-center'>
						<div className='btn-group'>
							<Link to={`/agency-images/${id}/${res.id}/update`} className='btn btn-xs btn-flat btn-warning' onClick={() => this.props.showUpdate(res)}>
								<i className='fa fa-pencil'></i>
							</Link>
							<Link to={`/agency-images/${id}/${res.id}/delete`} className='btn btn-xs btn-flat btn-danger' onClick={() => this.props.showDelete(res)}>
								<i className='fa fa-trash-o'></i>
							</Link>
						</div>
					</td>
				</tr>
			));
		}
	}
	renderHeader(){
		const headerTitle = ['ID', 'NAME', 'AGENCY', 'TYPE', 'STATUS', 'ACTIONS'];
		return headerTitle.map((res, index) =>
			<th className='text-center' key={index}>{res}</th>
		);
	}

	render() {
		const { dataProps } = this.props;	
		const id = dataProps || null;
		return (
			<div>
			<LoadingPage isActive={this.state.wating} />
			<Row>
			  <Grid cols='12 12'>
			  	<Box>
					<Link to={`/agency-images/${id}/create`} className='btn btn-sm btn-flat btn-primary pull-right' onClick={() => this.props.showCreate()}>
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
const mapStateToProps = state => ({list: state.agencyimage.list});
const mapDispatchToProps = dispatch => bindActionCreators({getList, showCreate, showUpdate, showDelete}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AgencyImageList);
