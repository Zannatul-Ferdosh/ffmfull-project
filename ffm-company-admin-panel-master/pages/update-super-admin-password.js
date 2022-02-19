import React, { Component } from 'react';
import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";

class updateSuperAdminPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
          oldpassword: "",
          newpassword: "",
          confirmPassword: "",
          errors: {
            oldpassword: "",
            newpassword: "",
            confirmPassword: "",
          },
        };
      }
      notify = (val) => toast(val);
    
      UpdatePassword = () => {
        if (this.state.newpassword == "") {
          this.setState({ errors: { newpassword: "This Field is required" } });
        } else if (this.state.oldpassword == "") {
          this.setState({ errors: { oldpassword: "This Field is required" } });
        } else if (this.state.confirmPassword == "") {
          this.setState({ errors: { confirmPassword: "This Field is required" } });
        } else {
          let data = {
            old_password: this.state.oldpassword,
            new_password: this.state.newpassword,
          };
    
          if (this.state.newpassword === this.state.confirmPassword) {
            axios
              .put(
                "/api/v1/field-force/users/superadmin/update/password-update",
                data,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              )
              .then((response) => {
                console.log(response.data);
                if (response.data.statusCode == 406) {
                  alert("Old Password Didnt Match try again");
                } else {
                  Router.push("/userDashboard");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            alert("Confirm Password didnt match, try again ... ");
          }
        }
      };
      passwordhandler = (e) => {
        const { name, value } = e.target;
        let errors = this.state.errors;
    
        switch (name) {
          case "oldpassword":
            errors.oldpassword =
              value.length < 6 ? " password must be 6 characters long! " : "";
            break;
          case "newpassword":
            errors.newpassword =
              value.length < 6 ? " password must be 6 characters long ! " :"";
            break;
          case "confirmPassword":
            errors.confirmPassword =
              value.length < 6 ?  " Password must be 6 characters long ! " : " ";
            break;
          default:
            break;
        }
    
        this.setState({
          [e.target.name]: e.target.value,
        });
      };
      render() {
        const { errors } = this.state;
        return (
          <div>
            <Layout>
              <div className="kt-portlet">
                <div className="kt-portlet__head">
                  <div className="kt-portlet__head-label">
                    <h3 className="kt-portlet__head-title">Edit password</h3>
                  </div>
                </div>
                <ToastContainer />
                <form className="kt-form">
                  <div className="kt-portlet__body">
                    <div className="form-group">
                      <label>Old password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Old password"
                        name="oldpassword"
                        value={this.state.oldpassword}
                        onChange={this.passwordhandler}
                        required
                      />
    
                      {errors.oldpassword ? (
                        <span className="errors" style={{ color: "red" }}>
                          {errors.oldpassword}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group">
                      <label> New password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        name="newpassword"
                        value={this.state.newpassword}
                        onChange={this.passwordhandler}
                        required
                      />
    
                      {errors.newpassword ? (
                        <span className="errors" style={{ color: "red" }}>
                          {errors.newpassword}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
    
                    <div className="form-group">
                      <label>Confirm password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm password"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.passwordhandler}
                        required
                      />
    
                      {errors.confirmPassword ? (
                        <span className="errors" style={{ color: "red" }}>
                          {errors.confirmPassword}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="kt-portlet__foot">
                    <div className="kt-form__actions">
                      <button
                        type="button"
                        onClick={() => {
                          this.UpdatePassword();
                        }}
                        className="btn btn-primary"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Layout>
          </div>
        );
      }
}

export default updateSuperAdminPassword;