import React, { Component } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/dist/next-server/lib/router/router";
import DeleteModal from "../DeleteModal";




class ListCompanyAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      company_name: "",
      profile_photo: "",
      modalToggle: false,
      companies: [],
      deleteItem:""
    };
  }

  HideModal = () => {
    this.setState({
      modalToggle: false,
    });
  };

  notify = (val) => toast(val);

  componentDidMount() {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    axios
      .get(
        "/api/v1/field-force/users/superadmin/list/admin-list",
        { headers: headers }
      )
      .then((res) => {
        this.setState({ companies: res.data.data });
      })
      .catch((err) => {});
  }

  removeAdmin = () => {
    

    console.log(id);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    console.log(id);
    let id = this.state.deleteItem;
    axios
      .delete(
        "/api/v1/field-force/users/superadmin/remove/admin-remove/" +
          id,
        { headers: headers }
      )
      .then((res) => {
        console.log(res);
        let adminlist = this.state.companies.filter((item) => item.id !== id);
        this.setState({
          companies: adminlist,
        });
        this.notify(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
        <div className="kt-portlet kt-portlet--mobile">
          <div className="kt-portlet__head kt-portlet__head--lg">
            <div className="kt-portlet__head-label">
              <span className="kt-portlet__head-icon">
                <i className="kt-font-brand flaticon2-line-chart"></i>
              </span>
              <h3 className="kt-portlet__head-title">Company Admin List</h3>
            </div>
            <div className="kt-portlet__head-toolbar">
              <div className="kt-portlet__head-wrapper">
                <div className="kt-portlet__head-actions">
                  <div className="dropdown dropdown-inline"></div>
                  &nbsp;
                  <a
                    href="/company-admin-add"
                    className="btn btn-brand btn-elevate btn-icon-sm"
                  >
                    <i className="la la-plus"></i>
                    Add Company Admin
                  </a>
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
                  <th>SL No</th>
                  <th> Name</th>
                  <th>Email</th>
                  <th>Company Name </th>
                  {/* <th>Phone </th> */}

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.companies.map((company, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        {company.first_name} &nbsp;{company.last_name}
                      </td>

                      <td>{company.email}</td>
                      <td>{company.company_name}</td>
                      {/* <td>{company.phone_number}</td> */}

                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            this.setState({
                              modalToggle: true,
                              deleteItem:company.id
                            });
                          }}

                     
                        >
                          Delete
                        </button>

                        <DeleteModal
                        Show={this.state.modalToggle}
                        Hide={this.HideModal}
                        Confirm={() => {
                          this.removeAdmin();
                          this.setState({ modalToggle: false });
                        }}
                      />
                      </td>

                   
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ListCompanyAdmin;
