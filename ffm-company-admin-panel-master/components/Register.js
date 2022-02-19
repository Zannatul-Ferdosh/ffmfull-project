import React, { Component } from "react";
import axios from "axios";
import Router from "next/router";
import "../css/style.bundle.css";

const divStyle = {
  margin: "auto",
  marginTop: " 50px",
  //  backgroundImage: 'url(assets/media/bg/bg-3.jpg)'
};

class Register extends Component {
  state = {
    signup: false,
    email: "",
    password: "",
    comId: "",
    firstName: "",
    lastName: "",
    username: "",
    memberType: "",
    companies: [],
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

    axios
      .post(
        "/api/v1/field-force/auth/register-dashboard-user",
        {
          email: this.state.email,
          password: this.state.password,
     
          firstname: this.state.firstName,
          lastname: this.state.lastName,
          username: this.state.email,
          member_type: 1,
          company_id: 7,
        }
      )
      .then((response) => {
        console.log(response.data);
        this.setState({
          signup: false,
          email: "",
          password: "",
          comId: "",
          firstName: "",
          lastName: "",
          userName: "",
          member_type: "",
        });
        Router.push("/super-admin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="col-md-6" style={divStyle}>
        <form className="needs-validation" onSubmit={this.Register} novalidate>
          <h3 className="text-center">Register  Admin</h3>

          <div className="form-group">
            <label>First name <span style={{color:"red"}}>*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={this.onChange}
              name="firstName"
              required
            />
            
          </div>

          <div className="form-group">
            <label>Last name <span style={{color:"red"}}>*</span></label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={this.onChange}
              name="lastName"
              required
            />
          </div>

    

          <div className="form-group">
            <label>Email address <span style={{color:"red"}}>*</span></label>
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
            <label>Password <span style={{color:"red"}}>*</span></label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={this.onChange}
              name="password"
              required
            />
          </div>


          {/* <div className="form-group">
            <label>Company  <span style={{color:"red"}}>*</span></label>
            
            <select
            className="form-control"
             onChange={this.onChange}
             name="comId"
             required
             
            
            >
            <option>--select--</option>
              {this.state.companies.map(company=>{
                return(<option value={company.id}>{company.name}</option>)
              })}
            </select>
            
        
          </div> */}
  

          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
