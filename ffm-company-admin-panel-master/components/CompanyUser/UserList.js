import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../DeleteModal";

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      editToggle: false,
      editData: {},
      userId: "",
      modalToggle: false,
      deleteItem: "",
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
      "Content-Type": "application/json",
    };
    console.log("am in");
    let id = localStorage.getItem("companyId");
    axios
      .get(
        "/api/v1/field-force/users/admin/user/list/" +
          id,
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log("am the response");
        this.setState({ users: res.data.data });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  RemoveUser = () => {
   
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
    console.log("am in");
let id = this.state.deleteItem;
    axios
      .delete(
        "/api/v1/field-force/users/admin/user/remove/" +
          id,
        {
          headers: headers,
        }
      )
      .then((res) => {
        let userlist = this.state.users.filter((item) => item.id !== id);

        this.setState({
          users: userlist,
        });
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

  editUser = (id) => {
    const data = {
      id: this.state.editData.id,
      first_name: this.state.editData.first_name,
      last_name: this.state.editData.last_name,
      email: this.state.editData.email,
      phone_number: this.state.editData.phone_number,
      registered_on: this.state.editData.registered_on,
      department: this.state.editData.department,
      designation: this.state.editData.designation,
      nid: this.state.editData.nid,
    };

    console.log(data);
    axios
      .put(
        "/api/v1/field-force/users/admin/user/update/" +
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
                <h3 className="kt-portlet__head-title">User List</h3>
              </div>
              <div className="kt-portlet__head-toolbar">
                <div className="kt-portlet__head-wrapper">
                  <div className="kt-portlet__head-actions">
                    <div className="dropdown dropdown-inline"></div>
                    &nbsp;
                    <a
                      href="/add-company-user"
                      className="btn btn-brand btn-elevate btn-icon-sm"
                    >
                      <i className="la la-plus"></i>
                      Add User
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
                    <th>Name</th>

                    <th>Contact</th>

                    <th>Registered On</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>NID</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map((user, index) => {
                    return (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            {user.first_name} {user.last_name}
                          </td>

                          <td>{user.phone_number}</td>
                          <td>{user.registered_on}</td>
                          <td>{user.department}</td>
                          <td>{user.designation}</td>
                          <td>{user.nid}</td>

                          <td>
                            <button
                              onClick={() => {
                                this.setState({
                                  editToggle: true,
                                  userId: user.id,
                                  editData: {
                                    id: user.id,
                                    first_name: user.first_name,
                                    last_name: user.last_name,
                                    email: user.email,
                                    phone_number: user.phone_number,
                                    registered_on: user.registered_on,
                                    department: user.department,
                                    designation: user.designation,
                                    nid: user.nid,
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
                                  deleteItem: user.id,
                                  modalToggle: true,
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
                                this.RemoveUser();
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
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  name="first_name"
                  value={this.state.editData.first_name}
                  onChange={this.formChange}
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  name="last_name"
                  value={this.state.editData.last_name}
                  onChange={this.formChange}
                />
              </div>

              {/* <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        name="email"
                        value={this.state.editData.email}
                        onChange={this.formChange}
                      />
                    </div> */}

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter email"
                  name="phone_number"
                  value={this.state.editData.phone_number}
                  onChange={this.formChange}
                />
              </div>

              {/* <div className="form-group">
                      <label>Registered On</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Enter email"
                        name="registered_on"
                        value={this.state.editData.registered_on}
                        onChange={this.formChange}
                      />
                    </div> */}

              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter department"
                  name="department"
                  value={this.state.editData.department}
                  onChange={this.formChange}
                />
              </div>

              <div className="form-group">
                <label>Designation</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter designation"
                  name="designation"
                  value={this.state.editData.designation}
                  onChange={this.formChange}
                />
              </div>
              <div className="form-group">
                <label>NID</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter designation"
                  name="nid"
                  value={this.state.editData.nid}
                  onChange={this.formChange}
                />
              </div>

              <div className="kt-portlet__foot">
                <div className="kt-form__actions">
                  <button
                    type="button"
                    onClick={() => {
                      this.editUser(this.state.userId);
                    }}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
}

UserList.propTypes = {};

export default UserList;
