import React, { Component } from "react";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import CompanyList from "../components/SuperAdminCompany/CompanyList";
class Services extends Component {
  render() {
    return (
      <div>
        <Layout>
          <CompanyList />
        </Layout>
      </div>
    );
  }
}

export default Services;
