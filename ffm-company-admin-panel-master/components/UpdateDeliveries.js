import React, { Component } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
var jwtDecode = require('jwt-decode');





class UpdateDeliveries extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            title:"",
            assigned_delivery_time: "",
            client_name: "",
            client_address: "",
            user_id:"",
            admin_id:"",
            attendence_status:"",
            startDate: new Date(),
            users:[],
            delivery_data:"",
            delivery_details:[]
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
        axios.get(`/api/v1/field-force/delivery/deliveries/get-delivery/${this.props.delivery_data}`, {headers:headers}).then(res => {
            console.log(res.data);
            this.setState({
                delivery_details: res.data.data.deliveries[0],
                title:res.data.data.deliveries[0].title,
                assigned_location_lattitude:res.data.data.deliveries[0].assigned_location_lattitude,
                assigned_location_longitude:res.data.data.deliveries[0].assigned_location_longitude,
                client_address:res.data.data.deliveries[0].client_address,
                client_name:res.data.data.deliveries[0].client_name
            });
        }).catch(err => {
            console.log(err);
        });


        this.setState({delivery_data: this.props.delivery_data});
    }

    notify = (val) => toast(val);

    updateDelivery = (e) => {
        e.preventDefault();

        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        const post_data = {
            title:this.state.title,
            assigned_delivery_time: this.state.startDate.toISOString(),
            assigned_location_lattitude: this.state.assigned_location_lattitude,
            assigned_location_longitude: this.state.assigned_location_longitude,
            client_address:this.state.client_address,
            client_name:this.state.client_name,
        }

        axios.post(`/api/v1/field-force/delivery/deliveries/update-deliveries/${this.props.delivery_data}`,
                post_data,
                {headers:headers}
            ).then(res => {
                this.setState({
                    title:"",
                    assigned_delivery_time: this.state.startDate.toISOString(),
                    client_name: "",
                    client_address: "",
                    user_id:"",
                    admin_id:"",
                    attendence_status:""
                })
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



    render() {
        return (
            <div className="kt-portlet">
                <div className="kt-portlet__head">
                    <div className="kt-portlet__head-label">
                        <h3 className="kt-portlet__head-title">
                           Assign Delivery
                        </h3>
                    </div>
                </div>
                <ToastContainer />
                <form className="kt-form kt-form--label-right">
                    <div className="kt-portlet__body">
                        <div className="form-group row">
                            <label>Title</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Title"
                                name="title"
                                value={this.state.title}
                                onChange={this.formChange} />
                        </div>
                        <div className="form-group row">
                            <label>Assigned Time</label>
                            <DatePicker
                                    showTimeSelect
                                    dateFormat="Pp"
                                    selected={this.state.startDate}
                                    onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group row">
                            <label>Assigned Latitude</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Location"
                                name="assigned_location_lattitude"
                                value={this.state.assigned_location_lattitude}
                                onChange={this.formChange} />
                        </div>

                        <div className="form-group row">
                            <label>Assigned Longitude</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Location"
                                name="assigned_location_longitude"
                                value={this.state.assigned_location_longitude}
                                onChange={this.formChange} />
                        </div>

                        <div className="form-group row">
                            <label>Client Address</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter address"
                                name="client_address"
                                value={this.state.client_address}
                                onChange={this.formChange} />
                        </div>

                        <div className="form-group row">
                            <label>Client Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter address"
                                name="client_name"
                                value={this.state.client_name}
                                onChange={this.formChange} />
                        </div>

                    </div>
                    <div className="kt-portlet__foot">
                        <div className="kt-form__actions">
                            <button type="reset" onClick={this.updateDelivery} className="btn btn-primary">Submit</button>
                            <button type="reset" className="btn btn-secondary">Cancel</button>
                        </div>
                    </div>
                </form>

            </div>

        )
    }
}

export default UpdateDeliveries;