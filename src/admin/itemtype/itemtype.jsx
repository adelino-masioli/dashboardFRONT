import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ContentHeader from '../../common/template/contentHeader';
import Content from '../../common/template/content';
import ContentHeaderTitle from '../../common/template/contentHeaderTitle';
import ContentHeaderBreadcrumb from '../../common/template/contentHeaderBreadcrumb';
import ContentHeaderBreadcrumbItem from '../../common/template/contentHeaderBreadcrumbItem';
import Tabs from '../../common/tab/tabs';
import TabsHeader from '../../common/tab/tabsHeader';
import TabsContent from '../../common/tab/tabsContent';
import TabHeader from '../../common/tab/tabHeader';
import TabContent from '../../common/tab/tabContent';
import { selectTab, showTabs} from '../../common/tab/tabActions';
import ItemtypeList from './itemtypeList';
import ItemtypeForm from './itemtypeForm';
import { create, update, remove } from './itemtypeActions';

class Itemtype extends Component {
	componentWillMount() {
		this.props.selectTab('tabList');
		this.props.showTabs('tabList', 'tabCreate');
	}

	render() {
		const { params } = this.props || null;
		return (
			<div>
				<ContentHeader>
					<ContentHeaderTitle title='Item Types' small='Registers'/>
					<ContentHeaderBreadcrumb>
						<ContentHeaderBreadcrumbItem path='#/' icon='home' label='Home'/>
						<ContentHeaderBreadcrumbItem active='active'  label='Item Types'/>
					</ContentHeaderBreadcrumb>
				</ContentHeader>

				<Content>
					<Tabs>
						<TabsHeader>
							<TabHeader label='List' icon='bars' target='tabList' />
							<TabHeader label='Create' icon='plus' target='tabCreate' />
							<TabHeader label='Update' icon='pencil' target='tabUpdate' />
							<TabHeader label='Delete' icon='trash-o' target='tabDelete' />
						</TabsHeader>
						<TabsContent>
							<TabContent id='tabList'>
								<ItemtypeList />
							</TabContent>
							<TabContent id='tabCreate'>
								<ItemtypeForm onSubmit={this.props.create} submitClass='primary' submitLabel='Create'/>
							</TabContent>
							<TabContent id='tabUpdate'>
								<ItemtypeForm onSubmit={this.props.update} submitClass='info' submitLabel='Update' dataProps={params.id}/>
							</TabContent>
							<TabContent id='tabDelete'>
								<ItemtypeForm onSubmit={this.props.remove}  readOnly={true} submitClass='danger' submitLabel='Destroy'/>
							</TabContent>
						</TabsContent>
					</Tabs>
				</Content>
			</div>
		);
	}
}
const mapDispatchToProps = dispatch => bindActionCreators({selectTab, showTabs, create, update, remove}, dispatch);
export default connect(null, mapDispatchToProps)(Itemtype);
