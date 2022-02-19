import React, { Component } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
var jwtDecode = require('jwt-decode');



class UpdateAttendence extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            attendence_data: "",
            admin_id:"",
            attendence_details:[],
            title:"",
            assigned_time: "",
            assigned_location_lattitude: "",
            assigned_location_longitude: "",
            address:"",
            startDate: new Date(),
        };
    } 

    componentDidMount() {
        
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const admin_id = decoded.sub;
        const company_id = decoded.company_id;
        this.setState({admin_id:admin_id});
        const headers = {
            'Authorization': `Bearer ${token}`
        }


        axios.get(`/api/v1/field-force/attendence/attendences/get-attendence/${this.props.attendence_data}`, {headers:headers}).then(res => {
            console.log(res.data.data.attendence[0]);
            this.setState({
                attendence_details: res.data.data.attendence[0],
                title:res.data.data.attendence[0].title,
                assigned_location_lattitude:res.data.data.attendence[0].assigned_location_lattitude,
                assigned_location_longitude:res.data.data.attendence[0].assigned_location_longitude,
                address:res.data.data.attendence[0].address
            });
        }).catch(err => {
            console.log(err);
        });

        // console.log(this.state);
        console.log(this.props.attendence_data);
        this.setState({attendence_data: this.props.attendence_data});
        
    }

    notify = (val) => toast(val);

    assignAttendance = (e) => {
        e.preventDefault();

        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }

        const post_data = {
            title:this.state.title,
            assigned_time: this.state.startDate.toISOString(),
            assigned_location_lattitude: this.state.assigned_location_lattitude,
            assigned_location_longitude: this.state.assigned_location_longitude,
            address:this.state.address
        }

        axios.post(`/api/v1/field-force/attendence/attendences/update-attendence/${this.state.attendence_data}`,
                post_data,
                {headers:headers}
            ).then(res => {
                this.setState({
                    title:"",
                    assigned_time: this.state.startDate.toISOString(),
                    assigned_location_lattitude: "",
                    assigned_location_longitude: "",
                    address:""
                })
                const resp = res.data;
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


    render() {
        return (
            <div className="kt-portlet">
                <div className="kt-portlet__head">
                    <div className="kt-portlet__head-label">
                        <h3 className="kt-portlet__head-title">
                           Update Attendance
                        </h3>
                    </div>
                </div>
                <ToastContainer />
                <form className="kt-form kt-form--label-right">
                    <div className="kt-portlet__body">
                        <div className="form-group">
                            <label >Title</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Title"
                                name="title"
                                value={this.state.title}
                                onChange={this.formChange} />
                        </div>
                        <div className="form-group">
                            <label >Assigned Time</label>
                                <div class="col-10">
                                <DatePicker
                                    showTimeSelect
                                    dateFormat="Pp"
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Assigned Latitude</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Location"
                                name="assigned_location_lattitude"
                                value={this.state.assigned_location_lattitude}
                                onChange={this.formChange} />
                        </div>

                        <div className="form-group">
                            <label>Assigned Longitude</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Location"
                                name="assigned_location_longitude"
                                value={this.state.assigned_location_longitude}
                                onChange={this.formChange} />
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter address"
                                name="address"
                                value={this.state.address}
                                onChange={this.formChange} />
                        </div>

                        

                        



                    </div>
                    <div className="kt-portlet__foot">
                        <div className="kt-form__actions">
                            <button type="reset" onClick={this.assignAttendance} className="btn btn-primary">Submit</button>
                            <button type="reset" className="btn btn-secondary">Cancel</button>
                        </div>
                    </div>
                </form>

            </div>

        )
    }
}

export default UpdateAttendence;