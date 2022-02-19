import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

import axios from "axios";
import Router from "next/router";
import Layout from "../components/Layout";
import CompanyList  from '../components/Company/CompanyList';
class Company extends Component {
  render() {
    return (
      <div>
        <Layout>
             <CompanyList/>
        </Layout>
      </div>
    );
  }
}

export default Company;
