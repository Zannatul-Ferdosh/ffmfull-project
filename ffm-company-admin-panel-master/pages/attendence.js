import React, { Component } from "react";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import AttendenceList  from '../components/AttendenceList';
class attendence extends Component {
  render() {
    return (
      <div>
        <Layout>
        <AttendenceList/>
        </Layout>
      </div>
    );
  }
}

export default attendence;
