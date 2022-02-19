import React, { Component } from "react";
import dynamic from 'next/dynamic';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import jwt_decode from 'jwt-decode';

import Router from "next/router";
const MapRender = dynamic(() => import('../Map/OpenStreet'), {
    ssr: false
  });

  const mapUI ={
    height:"400px",
    width:"700px"
  }
  
class AssignTaskC extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            is_paid: "",
            bill_amount: 0,
            address: "",
            latlong: "",
            user: "",
            task_time: "",
            company_id: "",
            admin_id: "",
            company_users: [],
            startDate: new Date()
            
        };
    } 

    changeLatLong = (val) => {
        this.setState({latlong: val});
    }

    componentDidMount() {
        console.log(this.state)
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        const c_id = decoded.company_id;
        const a_id = decoded.sub;
        this.setState({company_id: c_id});
        this.setState({admin_id: a_id});
        this.getUserList(c_id);
    }

    notify = (val) => toast(val);

    pushCompany = (e) => {
        e.preventDefault();
        // console.log(this.state.startDate.toISOString())

        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        const post_data = {
            title: this.state.title,
            is_paid: this.state.is_paid == 'Yes' ? true : false,
            assigned_time: this.state.startDate.toISOString(),
            bill_amount: this.state.bill_amount,
            assigned_location_lattitude: this.state.latlong.split(',')[0],
            assigned_location_longitude: this.state.latlong.split(',')[1],
            assigned_address: this.state.address,
            admin_id: this.state.admin_id,
            user_id: Number(this.state.user)
        }
        console.log(post_data);
        axios.post('/api/v1/field-force/task/assign-task',
                post_data,
                {headers:headers}
            ).then(res => {
                this.setState({
                    title: "",
                    is_paid: "",
                    bill_amount: "",
                    address: "",
                    latlong: "",
                    user: ""
                });
                const resp = res.data;
                console.log(resp);
                this.notify(resp.message);
        }).catch(err => {
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

    handleChange = date => {
        this.setState({
          startDate: date
        });
      }; 
    
    getUserList = (company_id) => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        console.log(headers);
        axios.get(`/api/v1/field-force/auth/get-company-users/${company_id}`, {headers:headers}).then(res => {
            console.log(res.data);
            
            this.setState({company_users: res.data});
        }).catch(err => {
            console.log(err);
        });
    }
    
    render() {

   let billable ="" ;
    if(this.state.is_paid=="Yes"){
       
      billable =
            
                <div className="form-group row">
                <label for="example-text-input" className="col-2 col-form-label">Bill Amount</label>
                <div class="col-10">
                    <input 
                        className="form-control" 
                        type="number" 
                        name="bill_amount"
                        value={this.state.bill_amount}
                        onChange={this.formChange}
                        id="example-text-input"
                         />
                </div>
            </div>
        
        }
        return (
            <div className="kt-portlet">
                <div className="kt-portlet__head">
                    <div className="kt-portlet__head-label">
                        <h3 className="kt-portlet__head-title">
                            Assign New Task
                        </h3>
                    </div>
                </div>
                <ToastContainer />
                <form className="kt-form kt-form--label-right" onSubmit={this.pushCompany}>
                    <div className="kt-portlet__body">
                        {/* <div class="form-group form-group-last">
                            <div class="alert alert-secondary" role="alert">
                                <div class="alert-icon"><i class="flaticon-warning kt-font-brand"></i></div>
                                <div class="alert-text">
                                    Here are examples of <code>.form-control</code> applied to each textual HTML5 input type:
                                </div>
                            </div>
                        </div> */}
                        <div className="form-group row">
                            <label for="example-text-input" class="col-2 col-form-label">Title <span style={{color:"red"}}>*</span></label>
                            <div class="col-10">
                                <input 
                                    className="form-control" 
                                    type="text" 
                                    name="title"
                                    value={this.state.title}
                                    required
                                    onChange={this.formChange}
                                    id="example-text-input" 
                                   />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label for="exampleSelect1" className="col-2 col-form-label">Paid Task <span style={{color:"red"}}>*</span></label>
                            <div class="col-10">
                                <select className="form-control" 
                                    id="exampleSelect1" 
                                    name="is_paid"
                                    value={this.state.is_paid}
                                    onChange={this.formChange}

                                    required
                                >
                                    <option value= "">--select --</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>
                        </div>
                  
                    {billable}

                        
                        
                        <div className="form-group row">
                            <label for="example-text-input" className="col-2 col-form-label">Address <span style={{color:"red"}}>*</span></label>
                            <div class="col-10">
                                <input 
                                    className="form-control" 
                                    type="text" 
                                    name="address"
                                    value={this.state.address}
                                    onChange={this.formChange}
                                    id="example-text-input"
                                    required />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label for="example-text-input" className="col-2 col-form-label">Lat-Long <span style={{color:"red"}}>*</span></label>
                            <div className="col-10">
                                <input 
                                    class="form-control" 
                                    type="text" 
                                    name="latlong"
                                    placeholder="Select from the map or enter manually"
                                    value={this.state.latlong}
                                    onChange={this.formChange}
                                    id="example-text-input" 
                                    required/>
                            </div>
                        </div>
                        <div className="form-group row">
                        <label for="example-text-input" className="col-2 col-form-label"></label> 
                        <div className="col-10" style={mapUI}>
                        <MapRender onMarkerChange={this.changeLatLong} />
                        </div>
                        </div>
                        <div class="form-group row">
                            <label for="example-datetime-local-input" class="col-2 col-form-label">Date and time <span style={{color:"red"}}>*</span></label>
                            <div className="col-10">
                            <DatePicker
                                showTimeSelect
                                dateFormat="Pp"
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                            />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label for="exampleSelect1" className="col-2 col-form-label">Select User <span style={{color:"red"}}>*</span></label>
                            <div className="col-10">
                                <select 
                                    className="form-control" 
                                    id="exampleSelect1"
                                    name="user"
                                    value={this.state.user}
                                    onChange={this.formChange}
                                    required
                                    >
                                    <option value="">--select--</option>
                                    {this.state.company_users.map(user => {
                                        return <option value={user.id}>{`${user.first_name == '' ? 'No Name' : user.first_name}: ${user.phone_number}`}</option>
                                    })}
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="kt-portlet__foot">
                        <div className="kt-form__actions">
                            <div className="row">
                                <div className="col-2">
                                </div>
                                <div className="col-10">
                                <button type="submit"  className="btn btn-primary">Submit</button> 
                                &nbsp;
                                    <button type="reset" onClick={()=>{Router.push("/task/list-tasks")}} className="btn btn-secondary">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                {/* <form className="kt-form">
                    <div className="kt-portlet__body">
                        <div className="form-group">
                            <label>Task Title</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Name"
                                name="name"
                                value={this.state.name}
                                onChange={this.formChange} />
                        </div>
                        <div className="form-group">
                            <label>Company Address</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Enter a full address"
                                name="address"
                                value={this.state.address}
                                onChange={this.formChange} />
                        </div>
                        <div className="form-group">
                            <label>TIN</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Enter your TIN"
                                name="tin"
                                value={this.state.tin}
                                onChange={this.formChange} />
                        </div>

                    </div>
                    <div className="kt-portlet__foot">
                        <div className="kt-form__actions">
                            <button type="reset" onClick={this.pushCompany} className="btn btn-primary">Submit</button>
                            <button type="reset" className="btn btn-secondary">Cancel</button>
                        </div>
                    </div>
                </form> */}

            </div>

        )
    }
}

export default AssignTaskC;