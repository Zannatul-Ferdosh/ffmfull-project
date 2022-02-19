import React, { Component } from "react";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import DeliveryList  from '../components/DeliveryList';
class deliveries extends Component {
  render() {
    return (
      <div>
        <Layout>
        <DeliveryList/>
        </Layout>
      </div>
    );
  }
}

export default deliveries;
