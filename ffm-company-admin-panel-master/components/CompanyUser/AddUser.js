import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from "next/router";

class AddUser extends Component {


    constructor(props) {
        super(props);
        this.state = {
            
            // first_name:"" ,
            // last_name:"",
            // email:"",
            // phone_number:"",
            // registered_on:"",
            // department:"",
            // designation:"",
            // nid:""


            phone_number:"",
            company_id: 7,
            iso_code:"",
            first_name:"",
            last_name:"",
            nid:"",
            designation:"",
            department:"",
            errmessage:""
          
        };
    } 

    notify = (val) => toast(val);

    AddUser= (e) => {
      e.preventDefault();
     

      console.log("giggigkjgg");
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        let companyId = parseInt(localStorage.getItem("companyId"));
        const data = {
          
            // first_name:  this.state.first_name,
            // last_name: this.state.last_name,
            // email: this.state.email,
            // phone_number: this.state.phone_number,
            // registered_on: this.state.registered_on,
            // department: this.state.department,
            // designation: this.state.designation,
            // nid: this.state.nid,
            // member_type:2,
            // company_id:companyId
            first_name: this.state.first_name,
            last_name:this.state.last_name,
            phone_number:this.state.phone_number,
            department:this.state.department,
            designation:this.state.designation,
            nid:this.state.nid,
            company_id:companyId,
            iso_code :  this.state.iso_code          


        };

        axios.post('/api/v1/field-force/auth/register-user',
                data,{
                  headers:headers
                }
            ).then(res => {

           console.log(res);
                this.setState({
                    // first_name:"" ,
                    // last_name:"",
                    // email:"",
                    // phone_number:"",
                    // registered_on:"",
                    // department:"",
                    // designation:"",
                    // nid:""
                    phone_number:"",
                    company_id: "",
                    iso_code:"",
                    first_name:"",
                    last_name:"",
                    nid:"",
                    designation:"",
                    department:""
                  
                 
                })
                const resp = res.data;
                Router.push("/company-user-list");
                console.log(resp);
                this.notify(resp.message);

              
        }).catch(err => {
            
          if(err){

            this.setState({errmessage: 1});
          }

        
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
    render() {
        return (
            <div className="kt-portlet">
            <div className="kt-portlet__head">
              <div className="kt-portlet__head-label">
                <h3 className="kt-portlet__head-title">Add User</h3>
              </div>
            </div>
            <ToastContainer />
            <form className="kt-form"    onSubmit={
                      this.AddUser
                    }>
              <div className="kt-portlet__body">
                <div className="form-group">
                  <label>First Name <span style={{color:"red"}}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    name="first_name"
                    value={this.state.first_name}
                    onChange={this.formChange}
                    required
                  />
                </div>
  

                <div className="form-group">
                  <label>Last Name <span style={{color:"red"}}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    name="last_name"
                    value={this.state.last_name}
                    onChange={this.formChange}
                    required
                  />
                </div>

{/* 
                <div className="form-group">
                  <label>Email <span style={{color:"red"}}>*</span></label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    value={this.state.email}
                    onChange={this.formChange}
                    required
                  />
                </div> */}

                <div className="form-group">
                  <label>Phone Number <span style={{color:"red"}}>*</span></label>

                <div className="row">
                 <div className="col-2">
                 <select 
                      className="form-control"
                      value={this.state.iso_code}
                      name="iso_code"
                    onChange={this.formChange}
                    required
                      >
                        <option value=""> select ISO Code</option>
                      <option value="BD">BD  +88</option>
                    </select>
                    {/* <span style={{color:"red"}}><b>{this.state.errmessage==1 ? "IS0 code is required " : ""}</b> </span> */}
                 </div>
              
            
               <div className="col-10">
               <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Number"
                    name="phone_number"
                    value={this.state.phone_number}
                    onChange={this.formChange}
                    required
                  />

                <span style={{color:"red"}}><b>{this.state.errmessage==1 ? "phone number already exits " : ""}</b> </span>    
               </div>
                 


                   </div>
                   

           
               
                </div>

                {/* <div className="form-group">
                  <label>Registered On <span style={{color:"red"}}>*</span></label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter email"
                    name="registered_on"
                    value={this.state.registered_on}
                    onChange={this.formChange}
                    required
                  />
                </div> */}

                <div className="form-group">
                  <label>Department <span style={{color:"red"}}>*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter department"
                    name="department"
                    value={this.state.department}
                    onChange={this.formChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Designation <span style={{color:"red"}}>*</span></label>
                  
                
               
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter designation"
                    name="designation"
                    value={this.state.designation}
                    onChange={this.formChange}
                    required
                  />

             
                </div>
                <div className="form-group">
                  <label>NID <span style={{color:"red"}}>*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter  NID"
                    name="nid"
                    value={this.state.nid}
                    onChange={this.formChange}
                    required
                  />
                </div>

       
            
  
  
       
  
  
              <div className="kt-portlet__foot">
                <div className="kt-form__actions">
                  <button
                   
                 
                    className="btn btn-primary"
                  >
                    Add
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    onClick={()=>{Router.push("/company-user-list");}}
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

export default AddUser;