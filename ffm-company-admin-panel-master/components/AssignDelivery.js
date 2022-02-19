import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import dynamic from 'next/dynamic';
var jwtDecode = require("jwt-decode");
import Router from "next/router";


const MapRender = dynamic(() => import('../components/Map/OpenStreet'), {
    ssr: false
  });

  const mapUI ={
    height:"400px",
    width:"700px"
  }
  

class AssignDelivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      assigned_delivery_time: "",
      client_name: "",
      client_address: "",
      user_id: "",
      admin_id: "",
      attendence_status: "",
      startDate: new Date(),
      users: [],
      latlong:"",
      is_paid: "",
      bill_amount: 0,
    };
  }
 
  componentDidMount() {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const admin_id = decoded.sub;
    const company_id = decoded.company_id;
    this.setState({ admin_id: admin_id });

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `/api/v1/field-force/users/admin/user/list/${company_id}`,
        { headers: headers }
      )
      .then((res) => {
        console.log(res);
        this.setState({ users: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(this.state);
  }

  notify = (val) => toast(val);

  assignDelivery = (e) => {
    e.preventDefault();

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
   
    let latlong = this.state.latlong.split(",");
 
    let assigned_location_lattitude = latlong[0];
    let assigned_location_longitude = latlong[1];

    const post_data = {
      title: this.state.title,
      assigned_delivery_time: this.state.startDate.toISOString(),
      assigned_location_lattitude: assigned_location_lattitude,
      assigned_location_longitude: assigned_location_longitude,
      client_address: this.state.client_address,
      client_name: this.state.client_name,
      user_id: parseInt(this.state.user),
      admin_id: parseInt(this.state.admin_id),
      is_paid: this.state.is_paid == 'Yes' ? true : false,
      bill_amount: this.state.bill_amount,
    };

    axios
      .post(
        "/api/v1/field-force/delivery/deliveries",
        post_data,
        { headers: headers }
      )
      .then((res) => {
        this.setState({
          title: "",
          assigned_delivery_time: this.state.startDate.toISOString(),
          client_name: "",
          client_address: "",
          user_id: "",
          admin_id: "",
          attendence_status: "",
          is_paid:""
        });
        const resp = res.data;
        console.log(resp);
        this.notify(resp.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changeLatLong = (val) => {


     
    this.setState({latlong: val});
}

  formChange = (e) => {
    const tar = e.target;
    const val = tar.value;
    const name = tar.name;

    this.setState({
      [name]: val,
    });
  };

  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

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
                        id="example-text-input" />
                </div>
            </div>
        
        }
    return (
      <div className="kt-portlet">
        <div className="kt-portlet__head">
          <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title">Assign Delivery</h3>
          </div>
        </div>
        <ToastContainer />
        <form className="kt-form kt-form--label-right"     onSubmit={this.assignDelivery}>
          <div className="kt-portlet__body">
            <div className="form-group row">
              <label for="example-text-input" className="col-2 col-form-label">
                Title <span style={{color:"red"}}>*</span>
              </label>
              <div className="col-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.formChange}
                  required
                />
              </div>
            </div>
            <div className="form-group row">
              <label for="example-text-input" className="col-2 col-form-label">
                Assigned Time <span style={{color:"red"}}>*</span>
              </label>
              <div className="col-10">
                <DatePicker
                  showTimeSelect
                  dateFormat="Pp"
                  selected={this.state.startDate}
                  onChange={this.handleChange}

                  required
                />
              </div>
            </div>
            {/* 
                        <div className="form-group row">
                            <label for="example-text-input" className="col-2 col-form-label" >Assigned Latitude</label>
                            <div className="col-10">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Location"
                                name="assigned_location_lattitude"
                                value={this.state.assigned_location_lattitude}
                                onChange={this.formChange} />
                                </div>
                        </div>

                        <div className="form-group row">
                            <label for="example-text-input" className="col-2 col-form-label">Assigned Longitude</label>
                            <div className="col-10">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Location"
                                name="assigned_location_longitude"
                                value={this.state.assigned_location_longitude}
                                onChange={this.formChange} />
                                </div>
                        </div> */}


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
                                    <option value="">--select --</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>
                        </div>
                  
                    {billable}

            <div className="form-group row">
              <label for="example-text-input" className="col-2 col-form-label">
                Lat-Long <span style={{color:"red"}}>*</span>
              </label>
              <div className="col-10">
                <input
                  class="form-control"
                  type="text"
                  name="latlong"
                  placeholder="Select from the map or enter manually"
                  value={this.state.latlong}
                  onChange={this.formChange}
                  id="example-text-input"
                  required
                />
              </div>
            </div>

            <div className="form-group row">
                        <label for="example-text-input" className="col-2 col-form-label"></label> 
                        <div className="col-10" style={mapUI}>
                        <MapRender onMarkerChange={this.changeLatLong} />
                        </div>
                        </div>

            <div className="form-group row">
              <label for="example-text-input" className="col-2 col-form-label">
                Client Address <span style={{color:"red"}}>*</span>
              </label>
              <div className="col-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter address"
                  name="client_address"
                  value={this.state.client_address}
                  onChange={this.formChange}
                  required
                />
              </div>
            </div>

            <div className="form-group row">
              <label for="example-text-input" className="col-2 col-form-label">
                Client Name <span style={{color:"red"}}>*</span>
              </label>
              <div className="col-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter client name "
                  name="client_name"
                  value={this.state.client_name}
                  onChange={this.formChange}
                  required
                />
              </div>
            </div>

            <div className="form-group row">
              <label for="example-text-input" className="col-2 col-form-label">
                Select User <span style={{color:"red"}}>*</span>
              </label>
              <div className="col-10">
                <select
                  class="form-control"
                  id="exampleSelect1"
                  name="user"
                  value={this.state.user}
                  onChange={this.formChange}
                  required
                >
                  <option  value="" disabled selected>
                    Select User
                  </option>
                  {this.state.users.map((item) => {
                    return (
                      <>
                        <option value={item.id}>{`${item.first_name == '' ? 'No Name' : item.first_name}: ${item.phone_number}`}</option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="kt-portlet__foot">
            <div className="kt-form__actions">
              <div className="row">
                <div className="col-2"></div>
                <div className="col-10">
                  <button
                    type="submit"
                
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                  &nbsp;
                  &nbsp;
                  <button type="reset" className="btn btn-secondary"  onClick={()=>{
                    Router.push("/deliveries");
                  }}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AssignDelivery;
