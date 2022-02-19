import React, { Component } from "react";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import AssignAttendence  from '../components/AssignAttendence';
class addattendence extends Component {
  render() {
    return (
      <div>
        <Layout>
        <AssignAttendence />
        </Layout>
      </div>
    );
  }
}

export default addattendence;
