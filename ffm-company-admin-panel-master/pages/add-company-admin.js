import React, { Component } from 'react';

import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import AddCompanyAdminpage from "../components/AddCompanyAdmin"
class AddCompanyAdmin extends Component {
    render() {
        return (
            <Layout>
            <AddCompanyAdminpage/>
          </Layout>
        );
    }
}

export default AddCompanyAdmin;