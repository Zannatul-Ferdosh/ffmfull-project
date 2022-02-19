import React, { Component } from "react";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import RegisterAdmin from "../components/Register";
import AddSuperAdmin from "../components/Register";
class SuperAdmin extends Component {
  render() {
    return (
      <div>
        <Layout>
          <AddSuperAdmin/>
        </Layout>
      </div>
    );
  }
}

export default SuperAdmin;
