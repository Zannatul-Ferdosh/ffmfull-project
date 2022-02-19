import React, { Component } from 'react';
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";

import Userlist from "../components/CompanyUser/UserList"

class CompanyUserList extends Component {
    render() {
        return (
            <div>
        <Layout>
          <Userlist />
        </Layout>
      </div>
        );
    }
}

export default CompanyUserList;