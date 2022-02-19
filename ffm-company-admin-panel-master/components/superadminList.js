import React, { Component } from 'react';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import DeleteModal from "../components/DeleteModal";
import {Modal,Button,Row,Col,Form} from "react-bootstrap";
class superadminList extends Component {

  constructor(props) {
    super(props);
    this.state = {
     superAdmin:[],
     editToggle:false,
     password:"",
     confirmPassword:"",
     deleteItem: "",
     modalToggle:false


    };
  }

  notify = (val) => toast(val);

  componentDidMount(){
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
  }

  let id = localStorage.getItem("userId");
  
  axios.get('/api/v1/field-force/users/superadmin/list/superadmin-list/'+ id, {headers:headers})
  .then(res => {
      console.log(res);
      this.setState({superAdmin: res.data.data});
  }).catch(err => {
      console.log(err);
  });


  }


  removeAdmin= ()=>{
    
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
  }

  let id = this.state.deleteItem;
  
  console.log(id);
    axios.delete('/api/v1/field-force/users/superadmin/remove/'+ id, {headers:headers})
    .then(res => {
        console.log(res);

        let adminlist = this.state.superAdmin.filter((item) => item.id !== id);
        this.setState({
          superAdmin: adminlist,
        });
        this.notify(res.message);
    }).catch(err => {
        console.log(err);
    });

  }

  passwordhandler =(e)=>{

    this.setState({
      [e.target.name]: e.target.value,
    });
  }


  UpdatePassword =()=>{
    const data = {
      admin_id: this.state.editData.admin_id,
      password: this.state.confirmPassword,
     
  }
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
    
    if (this.state.password===this.state.confirmPassword){

      axios.put('/api/v1/field-force/users/superadmin/update/password-update', data,{headers:headers})
      .then(res => {
          console.log(res);
  
      
        this.setState({editToggle:false});
          this.notify(res.message);
      }).catch(err => {
          console.log(err);
      });

    }else{

      alert("Password dont match");
    }
  }



  HideModal= ()=>{
 this.setState({
   modalToggle:false
 })

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
                  <h3 className="kt-portlet__head-title">Super Admin List</h3>
                </div>
                <div className="kt-portlet__head-toolbar">
                  <div className="kt-portlet__head-wrapper">
                    <div className="kt-portlet__head-actions">
                      <div className="dropdown dropdown-inline"></div>
                      &nbsp;
                      <a
                        href="/add-super-admin"
                        className="btn btn-brand btn-elevate btn-icon-sm"
                      >
                        <i className="la la-plus"></i>
                        Add Super Admin
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
                      <th style={{ maxWidth: "100px" }}>SL No</th>
                      <th> Name</th>
                      <th>Email</th>
                      {/* <th>Phone</th> */}
                  
                      <th>Action</th>

                    </tr>
                  </thead>
                  <tbody>
                  {this.state.superAdmin.map((superadmin,index) => {
                    return (
                      <>
                        <tr>
                          <td>{index+1}</td>
                          <td>{superadmin.first_name } {superadmin.last_name }</td>
                          <td>{superadmin.email}</td>
                          {/* <td>{superadmin.phone_number}</td> */}
                          <td>
                      

                            <button
                             onClick={
                               ()=>{
                                // this.removeAdmin(superadmin.id);

                                this.setState({
                                  deleteItem: superadmin.id,
                                  modalToggle:true

                                });
                              

                               }
                             }
                              className="btn btn-danger btn-sm"
                            >
                              Delete
                            </button>
                             <DeleteModal  Show={this.state.modalToggle} Hide={this.HideModal} Confirm={()=>{this.removeAdmin();
                               this.setState({modalToggle:false})
                            
                            }}/>
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

    
        




        );}else {

          return (


            <div className="kt-portlet">
            <div className="kt-portlet__head">
                <div className="kt-portlet__head-label">
                    <h3 className="kt-portlet__head-title">
                    Edit password
                    </h3>
                </div>
            </div>
            <ToastContainer />
            <form className="kt-form">
                <div className="kt-portlet__body">
                    <div className="form-group">
                        <label>password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.passwordhandler} />
                    </div>

                
             
                    <div className="form-group">
                        <label>Confirm password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm password"
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={this.passwordhandler} />
                    </div>

                </div>
                <div className="kt-portlet__foot">
                    <div className="kt-form__actions">
                        <button type="reset" onClick={this.UpdatePassword} className="btn btn-primary">Update</button>
          
                    </div>
                </div>
            </form>

        </div>
          )
        }
    }
}

export default superadminList;