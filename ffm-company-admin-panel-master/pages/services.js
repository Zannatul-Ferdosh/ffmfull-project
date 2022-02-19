import React, { Component } from "react";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import ServiceList from "../components/Service/ServiceList";
class Services extends Component {
  render() {
    return (
      <div>
        <Layout>
          <ServiceList />
        </Layout>
      </div>
    );
  }
}

export default Services;
