import React, { Component } from 'react';

import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";

import AddUser from "../components/CompanyUser/AddUser";
class AddCompanyUser extends Component {
    render() {
        return (
            <div>
            <Layout>
              <AddUser />
            </Layout>
          </div>
        );
    }
}

export default AddCompanyUser;