import React, { Component } from "react";
import PropTypes from "prop-types";
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";

class CompanyService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
    };
  }

  componentDidMount() {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
    let id = localStorage.getItem("companyId");

    axios
      .get(
        "/api/v1/field-force/users/admin/company/service-list/" +
          id,
          {
            headers: headers,
          }
      )
      .then((res) => {
          console.log(res);
        this.setState({ services: res.data.data });
      })
      .catch((err) => {

        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <Layout>
          <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            <div className="kt-portlet kt-portlet--mobile">
              <div className="kt-portlet__head kt-portlet__head--lg">
                <div className="kt-portlet__head-label">
                  <span className="kt-portlet__head-icon">
                    <i className="kt-font-brand flaticon2-line-chart"></i>
                  </span>
                  <h3 className="kt-portlet__head-title">
                    Company Service List
                  </h3>
                </div>
                <div className="kt-portlet__head-toolbar">
                  <div className="kt-portlet__head-wrapper">
                    <div className="kt-portlet__head-actions">
                      <div className="dropdown dropdown-inline"></div>
                      &nbsp;
                    </div>
                  </div>
                </div>
              </div>
              <div className="kt-portlet__body">
                <table
                  className="table table-striped- table-bordered table-hover table-checkable"
                  id="kt_table_1"
                >
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th> Service Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.services.map((service) => {
                      return (
                        <tr>
                          <td> {service.service_id}</td>
                          <td>{service.service_name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}

CompanyService.propTypes = {};

export default CompanyService;
