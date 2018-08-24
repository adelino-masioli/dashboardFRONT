import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ContentHeader from "../common/template/contentHeader";
import Content from "../common/template/content";
import ContentHeaderTitle from "../common/template/contentHeaderTitle";
import ContentHeaderBreadcrumb from "../common/template/contentHeaderBreadcrumb";
import ContentHeaderBreadcrumbItem from "../common/template/contentHeaderBreadcrumbItem";
import Tabs from "../common/tab/tabs";
import TabsHeader from "../common/tab/tabsHeader";
import TabsContent from "../common/tab/tabsContent";
import TabHeader from "../common/tab/tabHeader";
import TabContent from "../common/tab/tabContent";
import { selectTab, showTabs } from "../common/tab/tabActions";
import {
  create,
  update,
  remove,
  getSchoolByID
} from "./schoolActions";
import SchoolContactList from '../schoolcontact/schoolcontactList';
import SchoolContentList from '../schoolcontent/schoolcontentList';
import SchoolAccommodationList from '../schoolaccommodation/schoolaccommodationList';
import SchoolFeeList from '../schoolfee/schoolfeeList';
import SchoolTransferList from '../schooltransfer/schooltransferList';
import CommissionList from '../commission/commissionList';

class School extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: {}
    };
  }
    
  componentWillMount() {
    this.props.selectTab("tabContacts");
    this.props.showTabs("tabContacts", "tabContents", "tabAccommodation", "tabFees", "tabTransfers", "tabCommissions");

    //get school by id
    const schoolid = this.props.params.id;
    const school = this.props.getSchoolByID(schoolid)
    .then((res) =>      
      this.setState({
       school: res.payload.data
      })
    );
  }

  render() {
    const { params } = this.props || null;   
    localStorage.setItem('localStSchool', 'Waiting...');
    if (this.state.school.name!= undefined) {
      localStorage.removeItem('localStSchool');
      localStorage.setItem('localStSchool', this.state.school.name);
    }
    let nameSchool = localStorage.getItem('localStSchool');

    return <div>
        <ContentHeader>
          <ContentHeaderTitle title={nameSchool} small="Registers" />
          <ContentHeaderBreadcrumb>
            <ContentHeaderBreadcrumbItem path="#/" icon="users" label="Home" />
            <ContentHeaderBreadcrumbItem active="active" label="Proporties School" />
          </ContentHeaderBreadcrumb>
        </ContentHeader>

        <Content>
          <Tabs>
            <TabsHeader>
              <TabHeader label="Contacts" icon="phone" target="tabContacts" />
            <TabHeader label="Contents" icon="align-justify" target="tabContents" />
              <TabHeader label="Accommodation" icon="bed" target="tabAccommodation" />
              <TabHeader label="Fees" icon="money" target="tabFees" />
              <TabHeader label="Transfers" icon="bus" target="tabTransfers" />
              <TabHeader label="Commissions" icon="dollar" target="tabCommissions" />
            </TabsHeader>
            <TabsContent>
              <TabContent id="tabContacts">
                <SchoolContactList dataProps={params.id} />
              </TabContent>
              <TabContent id="tabContents">
                <SchoolContentList dataProps={params.id} />
              </TabContent>
              <TabContent id="tabAccommodation">
                <SchoolAccommodationList dataProps={params.id} />
              </TabContent>
              <TabContent id="tabFees">
                <SchoolFeeList dataProps={params.id} />
              </TabContent>
              <TabContent id="tabTransfers">
               <SchoolTransferList dataProps={params.id} />
              </TabContent>
              <TabContent id="tabCommissions">
               <CommissionList dataProps={params.id} />
              </TabContent>
            </TabsContent>
          </Tabs>
        </Content>
      </div>;
  }
}
const mapStateToProps = state => ({
  listFilter: state.school.listFilter
});
const mapDispatchToProps = dispatch => bindActionCreators({
  selectTab,
  showTabs,
  create,
  update,
  remove,
  getSchoolByID
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(School);
