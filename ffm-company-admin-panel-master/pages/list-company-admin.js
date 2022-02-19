import React, { Component } from "react";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import SuperAdminCompanyList from "../components/SuperCompanyAdmin/ListCompanyAdmin";
class ListCompanyAdmin extends Component {
  render() {
    return (
      <div>
        <Layout>
          <SuperAdminCompanyList />
        </Layout>
      </div>
    );
  }
}

export default ListCompanyAdmin;
