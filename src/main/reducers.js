import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer  as toastrReducer } from 'react-redux-toastr';
import TabReducer from '../common/tab/tabReducer';
import AuthReducer from '../auth/authReducer';
//admin
import DashboardReducer from '../dashboard/dashboardReducer';
import UserReducer from '../user/userReducer';
import SchoolGroupReducer from '../schoolgroup/schoolgroupReducer';
import LanguageReducer from '../admin/language/languageReducer';
import CurrencyReducer from '../admin/currency/currencyReducer';
import CountryReducer from '../admin/country/countryReducer';
import ZoneReducer from '../admin/zone/zoneReducer';
import CityReducer from '../admin/city/cityReducer';
import AccommodationtypeReducer from '../admin/accommodationtype/accommodationtypeReducer';
import FeetypeReducer from '../admin/feetype/feetypeReducer';
import ItemTypeReducer from '../admin/itemtype/itemtypeReducer';
import CompanyTypeReducer from '../admin/companytype/companytypeReducer';
import CompanyReducer from '../admin/company/companyReducer';
import CustomerTypeReducer from '../admin/customertype/customertypeReducer';
import CustomerStatusReducer from '../admin/customerstatus/customerstatusReducer';
import WebmidiaReducer from '../admin/webmidia/webmidiaReducer';
import AgencyPropTypeReducer from '../admin/agencyproptype/agencyproptypeReducer';
import School from '../school/schoolReducer';
import Schoolcontact from '../schoolcontact/schoolcontactReducer';
import Schoolcontent from '../schoolcontent/schoolcontentReducer';
import Schoolaccommodation from '../schoolaccommodation/schoolaccommodationReducer';
import Schoolfee from '../schoolfee/schoolfeeReducer';
import Schooltransfer from '../schooltransfer/schooltransferReducer';
import Commission from '../commission/commissionReducer';
import Customer from '../customer/customerReducer';
import Agency from '../agency/agencyReducer';
import AgencyImage from '../agencyimage/agencyimageReducer';

const rootReducer = combineReducers({
	tab: TabReducer,
	form: formReducer,
	toastr: toastrReducer,
	auth: AuthReducer,
	dashboard: DashboardReducer,
	user: UserReducer,
	schoolgroup: SchoolGroupReducer,
	language: LanguageReducer,
	currency: CurrencyReducer,
	country: CountryReducer,
	zone: ZoneReducer,
	city: CityReducer,
	accommodationtype: AccommodationtypeReducer,
	feetype: FeetypeReducer,
	itemtype: ItemTypeReducer,
	companytype: CompanyTypeReducer,
	company: CompanyReducer,
	customertype: CustomerTypeReducer,
	customerstatus: CustomerStatusReducer,
	webmidia: WebmidiaReducer,
	agencyproptype: AgencyPropTypeReducer,
	school: School,
	schoolcontact: Schoolcontact,
	schoolcontent: Schoolcontent,
	schoolaccommodation: Schoolaccommodation,
	schoolfee: Schoolfee,
	schooltransfer: Schooltransfer,
	commission: Commission,
	customer: Customer,
	agency: Agency,
	agencyimage: AgencyImage,
});

export default rootReducer;