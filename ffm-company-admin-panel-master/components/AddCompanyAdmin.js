import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from "next/router";
class AddCompanyAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
            email:"" ,
            password:"",
            username:"",
            firstname:"",
            lastname:"",
            company_id:"",
            member_type:"",
            companies: [],
          
        };
    } 
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

    formChange = (e) => {
        const tar = e.target;
        const val = tar.value;
        const name = tar.name;

        this.setState({
            [name]: val
        });
    }


    AddAdmin =()=>{

        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        let companyId = parseInt(localStorage.getItem("companyId"));
        const data = {
            email:this.state.email ,
            password:this.state.password,
            username:this.state.username,
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            company_id:companyId,
            member_type:2,
       
        };

        axios.post('/api/v1/field-force/auth/register-dashboard-user',
        data,
        {headers:headers}
    ).then(res => {
        this.setState({
             
            email:"" ,
            password:"",
            username:"",
            firstname:"",
            lastname:"",
            company_id:"",
            member_type:"",
          
         
        })
        const resp = res.data;
        Router.push("/company-admin");
        console.log(resp);
        this.notify(resp.message);

      
}).catch(err => {
    console.log(err);
});


    }


    render() {
        return (
            <div className="kt-portlet">
            <div className="kt-portlet__head">
              <div className="kt-portlet__head-label">
                <h3 className="kt-portlet__head-title">Add Company admin</h3>
              </div>
            </div>
            <ToastContainer />
            <form className="kt-form"   onSubmit={(e) => {
                e.preventDefault();
                      this.AddAdmin();
                    }}>
              <div className="kt-portlet__body">
                <div className="form-group">
                  <label>First Name <span style={{color:"red"}}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    name="firstname"
                    value={this.state.firstname}
                    onChange={this.formChange}
                    required
                  />
                </div>
  

                <div className="form-group">
                  <label>Last Name <span style={{color:"red"}}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter lastname"
                    name="lastname"
                    value={this.state.lastname}
                    onChange={this.formChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email <span style={{color:"red"}}>*</span></label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.formChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>User Name <span style={{color:"red"}}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    name="username"
                    value={this.state.username}
                    onChange={this.formChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password <span style={{color:"red"}}>*</span></label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.formChange}
                    required
                  />
                </div>

              
  
   
       
  
  
              <div className="kt-portlet__foot">
                <div className="kt-form__actions">
                  <button
                    type="submit"
                  
                    className="btn btn-primary"
                  >
                    Add
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    onClick={()=>{Router.push("/company-admin");}}
                    className="btn btn-primary"
                  >
                   Back
                  </button>
                </div>
              </div>
              </div>
            </form>
          </div>
        );
    }
}

export default AddCompanyAdmin;