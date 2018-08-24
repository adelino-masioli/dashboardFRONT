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
  getAgencyByID
} from "../agency/agencyActions";
import AgencyImageList from '../agencyimage/agencyimageList';

class AgencyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agency: {}
    };
  }
    
  componentWillMount() {
    this.props.selectTab("tabImages");
    this.props.showTabs("tabImages");

    //get agency by id
    const id = this.props.params.id;
    const agency = this.props.getAgencyByID(id)
    .then((res) =>      
      this.setState({
        agency: res.payload.data
      })
    );
  }

  render() {
    const { params } = this.props || null;   
    localStorage.setItem('localStAgency', 'Waiting...');
    if (this.state.agency.name!= undefined) {
      localStorage.removeItem('localStAgency');
      localStorage.setItem('localStAgency', this.state.agency.name);
    }
    let nameAgency = localStorage.getItem('localStAgency');

    return <div>
        <ContentHeader>
          <ContentHeaderTitle title={nameAgency} small="Registers" />
          <ContentHeaderBreadcrumb>
            <ContentHeaderBreadcrumbItem path="#/" icon="users" label="Home" />
            <ContentHeaderBreadcrumbItem active="active" label="Proporties Agency" />
          </ContentHeaderBreadcrumb>
        </ContentHeader>

        <Content>
          <Tabs>
            <TabsHeader>
              <TabHeader label="Imagens" icon="image" target="tabImages" />
            </TabsHeader>
            <TabsContent>
              <TabContent id="tabImages">
                <AgencyImageList dataProps={params.id} />
              </TabContent>
            </TabsContent>
          </Tabs>
        </Content>
      </div>;
  }
}
const mapStateToProps = state => ({
  listFilter: state.agency.listFilter
});
const mapDispatchToProps = dispatch => bindActionCreators({
  selectTab,
  showTabs,
  create,
  update,
  remove,
  getAgencyByID
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AgencyDetail);
