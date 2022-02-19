import React, { Component } from "react";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import AddUser from '../components/Company/users/AddUser';

class users extends Component {
  render() {
    return (
      <>
        <Layout>
          <AddUser />
        </Layout>
      </>
    );
  }
}

export default users;
