import React, { Component } from 'react';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import DeleteModal from "../components/DeleteModal";
class CompanyUser extends Component {



    constructor(props) {
        super(props);
        this.state = {
         users:[],
         editToggle:false,
         password:"",
         confirmPassword:"",
    deleteItem:"",
    modalToggle:false
    
        };
      }

      HideModal= ()=>{
        this.setState({
          modalToggle:false
        })
       
         };

      notify = (val) => toast(val);
      componentDidMount(){

        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      
        let id = localStorage.getItem("userId");
        let companyId = localStorage.getItem("companyId");
        
        axios.get('/api/v1/field-force/users/admin/list/admin-list/'+ id +'/' + companyId, {headers:headers})
        .then(res => {
            console.log(res);
            this.setState({users: res.data.data});
        }).catch(err => {
            console.log(err);
        });


      }

      removeUser =()=>{
       
        const headers = {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }

      let id= this.state.deleteItem;
      console.log(id);
        axios.delete('/api/v1/field-force/users/admin/remove/'+ id, {headers:headers})
        .then(res => {
            console.log(res);
    
            let userlist = this.state.users.filter((item) => item.id !== id);
            this.setState({
                users: userlist,
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
    
          axios.put('/api/v1/field-force/users/admin/update/password-update', data,{headers:headers})
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
                      <h3 className="kt-portlet__head-title">Company Admin List</h3>
                    </div>
                    <div className="kt-portlet__head-toolbar">
                      <div className="kt-portlet__head-wrapper">
                      <div className="kt-portlet__head-actions">
                    <div className="dropdown dropdown-inline"></div>
                    &nbsp;
                    <a
                      href="/add-company-admin"
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
                       
                      
                          <th>Action</th>
    
                        </tr>
                      </thead>
                      <tbody>
                      {this.state.users.map((users,index) => {
                        return (
                          <>
                            <tr>
                              <td>{index+1}</td>
                        <td>{users.first_name } {users.last_name}</td>
                              <td>{users.email}</td>
                            
                              <td>
                                {/* <button
                            
                                  className="btn btn-info btn-sm"
                                  onClick={() => {
                                    this.setState({
                                      editToggle: true,
                                    
                                      editData: {
                                      admin_id:users.id
                                      }
                                    });
                                  }}
                                >
                                  Edit
                                </button> */}
    
                                <button
                                 onClick={
                                   ()=>{
                                    
                                    this.setState({
                                    deleteItem:users.id,
                                      modalToggle:true});
                                   }
                                 }
                                  className="btn btn-danger btn-sm"
                                >
                                  Delete
                                </button>
                                <DeleteModal  Show={this.state.modalToggle} Hide={this.HideModal} 
                                
                                Confirm={()=>{
                                  
                                  this.removeUser();
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

export default CompanyUser;