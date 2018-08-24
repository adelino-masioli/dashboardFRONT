import React from 'react';
import MenuItem from './menuItem';
import MenuTree from './menuTree';


export default props => (
	<ul className='sidebar-menu'>
		<MenuItem path='#/' label='Dashboard' icon='dashboard'/>
		<MenuTree label='Schools' icon='graduation-cap'>
			<MenuItem path='#/schools' label='Schools' icon='caret-right'/>
		</MenuTree>

		<MenuTree label='Agencies' icon='building'>
			<MenuItem path='#/agencies' label='Agencies' icon='caret-right'/>
		</MenuTree>

		<MenuTree label='Clients' icon='user'>
			<MenuItem path='#/customers' label='Clients' icon='caret-right'/>
		</MenuTree>
		

	    <MenuTree label='ADMIN' icon='cogs'>
			<MenuItem path='#/admin' label='Dashboard' icon='caret-right' />
			<MenuItem path='#/users' label='Users' icon='caret-right' />
			<MenuItem path='#/schoolgroups' label='School Groups' icon='caret-right'/>
			<MenuItem path='#/languages' label='Languages' icon='caret-right' />
			<MenuItem path='#/currencies' label='Currencies' icon='caret-right' />
			<MenuItem path='#/countries' label='Countries' icon='caret-right' />
			<MenuItem path='#/zones' label='Zones' icon='caret-right' />
			<MenuItem path='#/cities' label='Cities' icon='caret-right' />
		</MenuTree>
	</ul>
);