import React, { Component } from 'react';
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";

import CompanyUser from "../components/CompanyUser";
class CompanyAdmin extends Component {


    render() {
        return (
            <Layout>
            <CompanyUser/>
          </Layout>
        );
    }
}

export default CompanyAdmin;