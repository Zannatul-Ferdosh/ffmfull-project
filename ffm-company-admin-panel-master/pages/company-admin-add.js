import React, { Component } from 'react';
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import AddSuperAdminComapny from "../components/SuperCompanyAdmin/AddCompanyAdmin";
class CompanyAdminAdd extends Component {
    render() {
        return (
            <div>
               <Layout>
                   <AddSuperAdminComapny/>
                   </Layout> 
            </div>
        );
    }
}

export default CompanyAdminAdd;