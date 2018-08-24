import React from 'react'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';

import AuthOrApp from './authOrApp';
import Dashboard from '../dashboard/dashboard';
import Admin from '../admin/dashboard/dashboard';
import User from '../user/user';
import SchoolGroup from '../schoolgroup/schoolgroup';
import Language from '../admin/language/language';
import Currency from '../admin/currency/currency';
import Country from '../admin/country/country';
import Zone from '../admin/zone/zone';
import City from '../admin/city/city';
import Accommodationtype from '../admin/accommodationtype/accommodationtype';
import Feetype from '../admin/feetype/feetype';
import Itemtype from '../admin/itemtype/itemtype';
import Companytype from '../admin/companytype/companytype';
import Company from '../admin/company/company';
import CustomerType from '../admin/customertype/customertype';
import CustomerStatus from '../admin/customerstatus/customerstatus';
import Webmidia from '../admin/webmidia/webmidia';
import School from '../school/school';
import SchoolDetail from '../school/schoolDetail';
import SchoolContact from '../schoolcontact/schoolContact';
import SchoolContent from '../schoolcontent/schoolContent';
import SchoolAccommodation from '../schoolaccommodation/schoolAccommodation';
import SchoolFee from '../schoolfee/schoolFee';
import SchoolTransfer from '../schooltransfer/schoolTransfer';
import Commission from '../commission/commission';
import Customer from '../customer/customer';
import Agency from '../agency/agency';
import AgencyDetail from '../agency/agencyDetail';
import AgencyImage from '../agencyimage/agencyImage';

export default props => (
	<Router history={hashHistory}>
		<Route path='/' component={AuthOrApp}>
			<IndexRoute component={Dashboard} />
			<Route path='/admin' component={Admin} />
			<Route path='/users' component={User} />
			<Route path='/schoolgroups' component={SchoolGroup} />
			<Route path='/languages' component={Language} />
			<Route path='/currencies' component={Currency} />
			<Route path='/countries' component={Country} />
			<Route path='/zones' component={Zone} />
			<Route path='/cities' component={City} />
			<Route path='/accommodation-types' component={Accommodationtype} />
			<Route path='/fee-types' component={Feetype} />
			<Route path='/item-types' component={Itemtype} />
			<Route path='/company-types' component={Companytype} />
			<Route path='/companies' component={Company} />
			<Route path='/customer-types' component={CustomerType} />
			<Route path='/customer-status' component={CustomerStatus} />
			<Route path='/webmidias' component={Webmidia} />
			<Route path='/schools' component={School} />
			<Route exact  path='/schools/:id'  component={SchoolDetail} />
			<Route exact  path='/school-contacts/:schoolid/:tab'  component={SchoolContact} />
			<Route exact path='/school-contacts/:schoolid/:id/:tab' component={SchoolContact} />
			<Route exact  path='/school-contents/:schoolid/:tab'  component={SchoolContent} />
			<Route exact  path='/school-contents/:schoolid/:id/:tab'  component={SchoolContent} />
			<Route exact  path='/school-accommodations/:schoolid/:tab'  component={SchoolAccommodation} />
			<Route exact  path='/school-accommodations/:schoolid/:id/:tab'  component={SchoolAccommodation} />
			<Route exact  path='/school-fees/:schoolid/:tab'  component={SchoolFee} />
			<Route exact path='/school-fees/:schoolid/:id/:tab' component={SchoolFee} />
			<Route exact  path='/school-transfers/:schoolid/:tab'  component={SchoolTransfer} />
			<Route exact path='/school-transfers/:schoolid/:id/:tab' component={SchoolTransfer} />
			<Route exact  path='/commissions/:schoolid/:tab'  component={Commission} />
			<Route exact  path='/commissions/:schoolid/:id/:tab'  component={Commission} />
			<Route path='/customers' component={Customer} />
			<Route path='/agencies' component={Agency} />
			<Route exact path='/agencies/:id' component={AgencyDetail} />
			<Route exact  path='/agency-images/:agencyid/:tab'  component={AgencyImage} />
			<Route exact path='/agency-images/:agencyid/:id/:tab' component={AgencyImage} />
		</Route>
		<Redirect from='*' to='/' />
	</Router>
);
