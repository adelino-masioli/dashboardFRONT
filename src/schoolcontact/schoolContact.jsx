import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ContentHeader from '../common/template/contentHeader';
import Content from '../common/template/content';
import ContentHeaderTitle from '../common/template/contentHeaderTitle';
import ContentHeaderBreadcrumb from '../common/template/contentHeaderBreadcrumb';
import ContentHeaderBreadcrumbItem from '../common/template/contentHeaderBreadcrumbItem';
import ValueBox from '../common/widget/valuebox';
import Row from '../common/layout/row';
import Tabs from '../common/tab/tabs';
import TabsHeader from '../common/tab/tabsHeader';
import TabsContent from '../common/tab/tabsContent';
import TabHeader from '../common/tab/tabHeader';
import TabContent from '../common/tab/tabContent';
import { selectTab, showTabs } from "../common/tab/tabActions";
import SchoolcontactForm from './schoolcontactForm';

import {
	create,
	update,
	remove
} from './schoolcontactActions';

class SchoolContact extends Component {
	constructor(props) {
		super(props);
		this.capitalizeFirstLetter = this.capitalizeFirstLetter.bind(this);
	}

	capitalizeFirstLetter(string) {
       return string[0].toUpperCase() + string.slice(1);
    }

	componentWillMount() {
		const selecttab = this.capitalizeFirstLetter(this.props.params.tab);
		this.props.selectTab(`tab${selecttab}`);
		this.props.showTabs(`tab${selecttab}`);

		//redirect to default page schools
		if (this.props.params.schoolid === null) {
		  browserHistory.push('#/schools');
		}
	}

	render() {
		const { params } = this.props || null;
		let nameSchool = localStorage.getItem('localStSchool');
		return (
			<div>
				<ContentHeader>
					<ContentHeaderTitle title={nameSchool} small='Contact'/>
					<ContentHeaderBreadcrumb>
						<ContentHeaderBreadcrumbItem path='#/' icon='home' label='Home'/>
						<ContentHeaderBreadcrumbItem active='active'  label={`${nameSchool} Contact`}/>
					</ContentHeaderBreadcrumb>
				</ContentHeader>

				<Content>
					<Tabs>
						<TabsHeader>
							<TabHeader label='Create' icon='plus' target='tabCreate' />
							<TabHeader label='Update' icon='pencil' target='tabUpdate' />
							<TabHeader label='Delete' icon='trash-o' target='tabDelete' />
						</TabsHeader>
						<TabsContent>
							<TabContent id='tabCreate'>
								<SchoolcontactForm onSubmit={this.props.create} submitClass='primary' submitLabel='Create' dataProps={params.schoolid}/>
							</TabContent>
							<TabContent id='tabUpdate'>
								<SchoolcontactForm onSubmit={this.props.update} submitClass='info' submitLabel='Update' dataProps={params.schoolid} dataPropsId={params.id}/>
							</TabContent>
							<TabContent id='tabDelete'>
								<SchoolcontactForm onSubmit={this.props.remove}  readOnly={true} submitClass='danger' submitLabel='Destroy' dataProps={params.schoolid} dataPropsId={params.id}/>
							</TabContent>
						</TabsContent>
					</Tabs>
				</Content>
			</div>
		);
	}
}
const mapDispatchToProps = dispatch => bindActionCreators({selectTab, showTabs, create, update, remove}, dispatch);
export default connect(null, mapDispatchToProps)(SchoolContact);
