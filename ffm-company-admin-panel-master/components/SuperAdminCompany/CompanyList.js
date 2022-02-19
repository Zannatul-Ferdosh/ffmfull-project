import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/dist/next-server/lib/router/router";
import DeleteModal from "../DeleteModal";
class CompanyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      editToggle: false,
      index: "",
      editData: {},
      modalToggle: false,
      deleteItem:""
    };
  }

  HideModal = () => {
    this.setState({
      modalToggle: false,
    });
  };

  componentDidMount() {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
    console.log("am in");
    axios
      .get(
        "/api/v1/field-force/users/superadmin/company/list",
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log("am the response");
        this.setState({ companies: res.data.data });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  RemoveCompany = () => {
   let id =this.state.deleteItem;
    axios
      .delete(
        "/api/v1/field-force/users/superadmin/company/remove/" +
          id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("am the response");
        let Companylist = this.state.companies.filter((item) => item.id !== id);

        this.setState({
          companies: Companylist,
        });
      })

      .catch((err) => {
        console.log(err);
      });
  };

  editCompany = (id) => {
    console.log(id);
    const data = {
      name: this.state.editData.name,
      address: this.state.editData.address,
      verification_file: this.state.editData.verification_file,
      agreement_file: this.state.editData.agreement_file,
      tin: this.state.editData.tin,
    };

    axios
      .put(
        "/api/v1/field-force/users/superadmin/company/update/" +
          id,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        this.setState({
          editData: {},
        });

        const resp = res.data;
        location.reload();
        console.log(resp);
        this.notify(resp.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  formChange = (e) => {
    const tar = e.target;
    const val = tar.value;
    const name = tar.name;

    this.setState({
      editData: {
        [name]: val,
      },
    });
  };

  render() {
    if (this.state.editToggle == false) {
      return (
        <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
          <div className="kt-portlet kt-portlet--mobile">
            <div className="kt-portlet__head kt-portlet__head--lg">
              <div className="kt-portlet__head-label">
                <span className="kt-portlet__head-icon">
                  <i className="kt-font-brand flaticon2-line-chart"></i>
                </span>
                <h3 className="kt-portlet__head-title">Company List</h3>
              </div>
              <div className="kt-portlet__head-toolbar">
                <div className="kt-portlet__head-wrapper">
                  <div className="kt-portlet__head-actions">
                    <div className="dropdown dropdown-inline"></div>
                    &nbsp;
                    <a
                      href="/add-super-admin-company"
                      className="btn btn-brand btn-elevate btn-icon-sm"
                    >
                      <i className="la la-plus"></i>
                      Add New Company
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
                    <th>SL No:</th>
                    <th>Name</th>
                    <th>Address</th>
                    {/* <th>Agreement File</th>
                          <th>Verification File</th> */}
                    <th>Tin number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.companies.map((company, index) => {
                    let agreement = false;
                    let verification = false;


                    if (company.id== 7 || company.id == "7"){

                      return 
                    }
                    if (company.verification_file != "") {
                      verification = true;
                    }
                    if (company.agreement_file != "") {
                      agreement = true;
                    }
                    return (
                      <>
                        <tr>
                          <td>{index }</td>
                          <td>{company.name}</td>
                          <td>{company.address}</td>
                          {/*                                 
                                <td>{this.agreement ? <button className="btn-btn-primary"> <a href={company.agreement_file} target="_blank" > File Link </a> </button>: "" }</td>
                                <td> {this.verification ?<button  className="btn-btn-primary">  <a href={company.verification_file} target="_blank" >File  Link  </a> </button> : ""}</td>
                         */}
                          <td>{company.tin}</td>
                          <td>
                            <button
                              onClick={() => {
                                this.setState({
                                  editToggle: true,
                                  index: company.id,
                                  editData: {
                                    id: company.id,
                                    name: company.name,
                                    address: company.address,
                                    agreement_file: company.agreement_file,
                                    verification_file:
                                      company.verification_file,
                                    tin: company.tin,
                                  },
                                });
                              }}
                              className="btn btn-info btn-sm"
                            >
                              Edit
                            </button>
                            &nbsp;
                            <button
                              onClick={() => {
                                this.setState({
                                  modalToggle: true,
                                  deleteItem:company.id
                                });
                              }}
                              className="btn btn-danger btn-sm"
                            >
                              Delete
                            </button>
                            <DeleteModal
                              Show={this.state.modalToggle}
                              Hide={this.HideModal}
                              Confirm={() => {
                                this.RemoveCompany();
                                this.setState({ modalToggle: false });
                              }}
                            />
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="kt-portlet">
          <div className="kt-portlet__head">
            <div className="kt-portlet__head-label">
              <h3 className="kt-portlet__head-title">Add New Company</h3>
            </div>
          </div>
          <ToastContainer />
          <form className="kt-form">
            <div className="kt-portlet__body">
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  name="name"
                  value={this.state.editData.name}
                  onChange={this.formChange}
                  disabled
                />
              </div>

              <div className="form-group">
                <label>Company Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  name="address"
                  value={this.state.editData.address}
                  onChange={this.formChange}
                  disabled
                />
              </div>

              <div className="form-group">
                <label>Company Agreement_file</label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Enter file"
                  name="agreement_file"
                  value={this.state.editData.agreement_file}
                  onChange={this.formChange}
                />
              </div>

              <div className="form-group">
                <label>Verification file</label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Enter file"
                  name="verification_file"
                  value={this.state.editData.verification_file}
                  onChange={this.formChange}
                />
              </div>

              <div className="form-group">
                <label>Company Tin number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter number"
                  name="tin"
                  value={this.state.editData.tin}
                  onChange={this.formChange}
                  disabled
                />
              </div>
            </div>
            <div className="kt-portlet__foot">
              <div className="kt-form__actions">
                <button
                  type="reset"
                  onClick={() => {
                    this.editCompany(this.state.index);
                  }}
                  className="btn btn-primary"
                >
                  Edit
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
}

CompanyList.propTypes = {};

export default CompanyList;
