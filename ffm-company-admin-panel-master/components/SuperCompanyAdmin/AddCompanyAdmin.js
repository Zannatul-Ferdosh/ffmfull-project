import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";
const divStyle = {
  margin: "auto",
  marginTop: " 50px",
  //  backgroundImage: 'url(assets/media/bg/bg-3.jpg)'
};
class AddCompanyAdmin extends Component {
  state = {
    companies: [],
    comId: "",
    email: "",
    password: "",
    username: "",
    firstname: "",
    lastname: "",
    company_id: "",
    member_type: "",
  };


 


  componentDidMount() {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    axios
      .get(
        "/api/v1/field-force/auth/get-company-list",
        { headers: headers }
      )
      .then((res) => {
        console.log(res);
        this.setState({ companies: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]:
        e.target.type === "number" ? parseInt(e.target.value) : e.target.value,
    });
  };

  Register = (e) => {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    let data = {
      company_id: parseInt(this.state.comId),
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,

      member_type: 2,
    };

    axios
      .post(
        "/api/v1/field-force/auth/register-dashboard-user",
        data
      )
      .then((response) => {
 
        console.log(response);
     
        this.notify(response.data.message);
        this.setState({
          comId: "",
          email: "",
          password: "",
          username: "",
          firstname: "",
          lastname: "",
          company_id: "",
          member_type: "",
        });
        
       Router.push("/list-company-admin");

    
      })
      .catch((err) => {
        console.log(err);
      });
  };

  notify = (val) => toast(val);

  render() {
    return (
      <div className="col-md-6" style={divStyle}>
        <ToastContainer />
        <form className="needs-validation" onSubmit={this.Register} novalidate>
          <h3 className="text-center">Register Company Admin</h3>

          <div className="form-group">
            <label>
              {" "}
              First Name<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={this.onChange}
              name="firstname"
              required
            />
          </div>
          <div className="form-group">
            <label>
              {" "}
              Last Name<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Last  name"
              onChange={this.onChange}
              name="lastname"
              required
            />
          </div>

          <div className="form-group">
            <label>
              User Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Number"
              onChange={this.onChange}
              name="username"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={this.onChange}
              name="email"
              required
            />
          </div>

          <div className="form-group">
            <label>
              Password<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={this.onChange}
              name="password"
              required
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label>
              Company <span style={{ color: "red" }}>*</span>
            </label>

            <select
              className="form-control"
              onChange={this.onChange}
              name="comId"
              required
            >
              <option>--Select--</option>
              {this.state.companies.map((company) => {
                return <option value={company.id}>{company.name}</option>;
              })}
            </select>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default AddCompanyAdmin;
