import React, { Component } from 'react';
import ContentHeader from '../../common/template/contentHeader';
import Content from '../../common/template/content';
import ContentHeaderTitle from '../../common/template/contentHeaderTitle';
import ContentHeaderBreadcrumb from '../../common/template/contentHeaderBreadcrumb';
import ContentHeaderBreadcrumbItem from '../../common/template/contentHeaderBreadcrumbItem';
import ValueBox from '../../common/widget/valuebox';
import Row from '../../common/layout/row';


class Dashboard extends Component {
	render() {
	
		return (
			<div>	    
				<ContentHeader>
					<ContentHeaderTitle title='Administrator Dashboard' small='Version 1.0'/>
					<ContentHeaderBreadcrumb>
						<ContentHeaderBreadcrumbItem path='#/' icon='dashboard' label='Home'/>
						<ContentHeaderBreadcrumbItem active='active'  label='Administrator Dashboard'/>
					</ContentHeaderBreadcrumb>
				</ContentHeader>
        
				<Content>
					<Row>
						<ValueBox cols='12 3' color='gray' icon='' value='' text='Users' url='/users' />
						<ValueBox cols='12 3' color='gray' icon='' value='' text='School Groups' url='/schoolgroups' />
						<ValueBox cols='12 3' color='gray' icon='' value='' text='Languages' url='/languages' />
						<ValueBox cols='12 3' color='gray' icon='' value='' text='Currencies' url='/currencies' />
						<ValueBox cols='12 3' color='aqua' icon='' value='' text='Countries' url='/countries' />
						<ValueBox cols='12 3' color='aqua' icon='' value='' text='Zones' url='/zones' />
						<ValueBox cols='12 3' color='aqua' icon='' value='' text='Cities' url='/cities' />
						<ValueBox cols='12 3' color='aqua' icon='' value='' text='Accommodation Types' url='/accommodation-types' />
						<ValueBox cols='12 3' color='blue' icon='' value='' text='Fee Types' url='/fee-types' />
						<ValueBox cols='12 3' color='blue' icon='' value='' text='Item Types' url='/item-types' />
						<ValueBox cols='12 3' color='blue' icon='' value='' text='Company Types' url='/company-types' />
						<ValueBox cols='12 3' color='blue' icon='' value='' text='Companies' url='/companies' />
						<ValueBox cols='12 3' color='green' icon='' value='' text='Customer Types' url='/customer-types' />
						<ValueBox cols='12 3' color='green' icon='' value='' text='Customer Status' url='/customer-status' />
						<ValueBox cols='12 3' color='green' icon='' value='' text='Webmidias' url='/webmidias' />
					</Row>
				</Content>
			</div>
		);
	}
}


export default Dashboard;
