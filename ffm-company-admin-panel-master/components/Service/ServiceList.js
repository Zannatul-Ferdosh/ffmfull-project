import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/dist/next-server/lib/router/router";
import DeleteModal from "../DeleteModal";

class ServiceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      editToggle: false,
      index: "",
      editData: {},
      modalToggle: false,
      deleteItem:""
    };
  }

  componentDidMount() {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
    console.log("am in");
    axios
      .get(
        "/api/v1/field-force/users/superadmin/services/list",
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log("am the response");
        this.setState({ services: res.data.data });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  RemoveService = () => {
    console.log(id);

    let id = this.state.deleteItem;
    axios
      .delete(
        "/api/v1/field-force/users/superadmin/services/remove/" +
          id,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("am the response");
        let servicelist = this.state.services.filter((item) => item.id !== id);

        console.log(servicelist);
        this.setState({
          services: servicelist,
        });
      })

      .catch((err) => {
        console.log(err);
      });
  };

  editService = (id) => {
    console.log(id);
    const data = {
      name: this.state.editData.name,
      service_type: this.state.editData.service_type,
    };
    axios
      .put(
        "/api/v1/field-force/users/superadmin/services/update/" +
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
  HideModal = () => {
    this.setState({
      modalToggle: false,
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
                <h3 className="kt-portlet__head-title">Service List</h3>
              </div>
              <div className="kt-portlet__head-toolbar">
                <div className="kt-portlet__head-wrapper">
                  <div className="kt-portlet__head-actions">
                    <div className="dropdown dropdown-inline"></div>
                    &nbsp;
                    {/* <a
                      href="/add-service"
                      className="btn btn-brand btn-elevate btn-icon-sm"
                    >
                      <i className="la la-plus"></i>
                      Add New Service
                    </a> */}
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
                    <th>Service ID</th>
                    <th>Name</th>
                    <th>Service Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.services.map((service) => {
                    return (
                      <>
                        <tr>
                          <td>{service.id}</td>
                          <td>{service.name}</td>
                          <td>
                            {" "}
                            {service.service_type == "paid"
                              ? "Paid"
                              : "Not Paid"}
                          </td>
                          <td>
                            <button
                              onClick={() => {
                                this.setState({
                                  editToggle: true,
                                  index: service.id,
                                  editData: {
                                    id: service.id,
                                    name: service.name,
                                    service_type: service.service_type,
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
                                // this.RemoveService(service.id);
                                this.setState({
                                  modalToggle: true,
                                  deleteItem:service.id
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
                                this.RemoveService();
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
              <h3 className="kt-portlet__head-title">Edit New Service</h3>
            </div>
          </div>
          <ToastContainer />
          <form className="kt-form">
            <div className="kt-portlet__body">
              <div className="form-group">
                <label>Service Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  name="name"
                  value={this.state.editData.name}
                  onChange={this.formChange}
                />
              </div>

              <div className="form-group">
                <label>Service Type</label>
                <select
                  className="form-control"
                  name="service_type"
                  value={this.state.editData.service_type}
                  onChange={this.formChange}
                  disabled
                >
                  <option>-- Select --</option>
                  <option value="paid">Paid</option>
                  <option value="non-paid"> non-Paid</option>
                </select>
              </div>
            </div>

            <input
              type="hidden"
              className="form-control"
              name="id"
              value={this.state.editData.id}
              onChange={this.formChange}
            />

            <div className="kt-portlet__foot">
              <div className="kt-form__actions">
                <button
                  type="button"
                  onClick={() => {
                    this.editService(this.state.index);
                  }}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
}

ServiceList.propTypes = {};

export default ServiceList;
