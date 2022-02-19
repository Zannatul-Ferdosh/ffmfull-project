import React, { Component } from "react";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import AssignDelivery  from '../components/AssignDelivery';
class assigndeliveries extends Component {
  render() {
    return (
      <div>
        <Layout>
        <AssignDelivery />
        </Layout>
      </div>
    );
  }
}

export default assigndeliveries;
