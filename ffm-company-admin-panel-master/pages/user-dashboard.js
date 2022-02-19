import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

import axios from "axios";
import Router from "next/router";
import Layout from "../components/Layout";
import DataCounter from "../components/DataCounter";

class userDashboard extends Component {
  render() {
    return (

      <Layout>

       <DataCounter/>
      </Layout>
      
    );
  }
}

export default userDashboard;
