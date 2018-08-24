import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators  } from 'redux';

import { getSumary } from './dashboardActions';
import ContentHeader from '../common/template/contentHeader';
import Content from '../common/template/content';
import ContentHeaderTitle from '../common/template/contentHeaderTitle';
import ContentHeaderBreadcrumb from '../common/template/contentHeaderBreadcrumb';
import ContentHeaderBreadcrumbItem from '../common/template/contentHeaderBreadcrumbItem';
import ValueBox from '../common/widget/valuebox';
import Row from '../common/layout/row';
import LoadingPage from '../common/loading/loading';


class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
            wating: true
		};
	}

	componentDidMount() {
		this.props.getSumary()
		.then((res) =>{
			this.setState({ wating: false });
		});
	}

	render() {
		const{ schools, agencies, clients,  users } = this.props.sumary;
    
		return (
			<div>
			    <LoadingPage isActive={this.state.wating} />			    
				<ContentHeader>
					<ContentHeaderTitle title='Dashboard' small='Version 1.0'/>
					<ContentHeaderBreadcrumb>
						<ContentHeaderBreadcrumbItem path='#/' icon='dashboard' label='Home'/>
						<ContentHeaderBreadcrumbItem active='active'  label='Dashboard'/>
					</ContentHeaderBreadcrumb>
				</ContentHeader>
        
				<Content>
					<Row>
						<ValueBox cols='12 3' color='blue' icon='graduation-cap' value={schools} text='Total Schools' url='/schools' />
						<ValueBox cols='12 3' color='green' icon='building' value={agencies} text='Total Agencies' url='/agencies' />
						<ValueBox cols='12 3' color='yellow' icon='users' value={clients} text='Total Clients' url='/customers' />
						<ValueBox cols='12 3' color='red' icon='user-plus' value={users} text='Total Users' url='/users' />
					</Row>
				</Content>
			</div>
		);
	}
}

const mapStateToProps = state => ({sumary: state.dashboard.sumary});
const mapDispatchToProps = dispatch => bindActionCreators({getSumary}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
