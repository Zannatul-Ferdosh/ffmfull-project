import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
var jwtDecode = require("jwt-decode");
import dynamic from "next/dynamic";
import Router from "next/router";

//import MapRender from "../components/Map/Map";


const MapRender = dynamic(() => import("../components/Map/OpenStreet"), {
  ssr: false,
});

const mapUI ={
  height:"400px",
  width:"700px"
}


class AssignAttendence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      assigned_time: "",
      latlong: "",
      address: "",
      user_id: "",
      admin_id: "",
      attendence_status: "",
      startDate: new Date(),
      users: [],
    };
  }


 


  componentDidMount() {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    console.log(decoded);
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
        console.log(res.data.data);
        this.setState({ users: res.data.data });


        
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(this.state);
  }

  notify = (val) => toast(val);

  assignAttendance = (e) => {
    e.preventDefault();

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const post_data = {
      title: this.state.title,
      assigned_time: this.state.startDate.toISOString(),
      assigned_location_lattitude: this.state.latlong.split(',')[0],
      assigned_location_longitude: this.state.latlong.split(',')[1],
      address: this.state.address,
      user_id: parseInt(this.state.user),
      admin_id: this.state.admin_id,
      attendence_status: false,
    };

    axios
      .post(
        "/api/v1/field-force/attendence/attendences",
        post_data,
        { headers: headers }
      )
      .then((res) => {
        this.setState({
          title: "",
          assigned_time: this.state.startDate.toISOString(),
          latlong: "",
          address: "",
          user_id: "",
          admin_id: "",
          attendence_status: "",
        });
        const resp = res.data;
        this.notify(resp.message);
        Router.push("/attendence");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  changeLatLong = (val) => {
    this.setState({ latlong: val });
  };
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
    return (
      <div className="kt-portlet">
        <div className="kt-portlet__head">
          <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title">Assign Attendance</h3>
          </div>
        </div>
        <ToastContainer />
        <form className="kt-form kt-form--label-right"  onSubmit={this.assignAttendance}>
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
              <div class="col-10">
                <DatePicker
                  showTimeSelect
                  dateFormat="Pp"
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>
            {/* <div className="form-group">
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
                        </div> */}

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
              <label
                for="example-text-input"
                className="col-2 col-form-label"
              ></label>
              <div className="col-10 " >
            <MapRender 
            
            onMarkerChange={this.changeLatLong}
        
            ></MapRender>
              </div>
            </div>

            <div className="form-group row">
              <label for="example-text-input" className="col-2 col-form-label">
                Address <span style={{color:"red"}}>*</span>
              </label>
              <div className="col-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter address"
                  name="address"
                  value={this.state.address}
                  onChange={this.formChange}
                  required
                />
              </div>
            </div>

            <div class="form-group row">
              <label for="exampleSelect1" class="col-2 col-form-label">
                Select User <span style={{color:"red"}}>*</span>
              </label>
              <div class="col-10">
                <select
                  class="form-control"
                  id="exampleSelect1"
                  name="user"
                  value={this.state.user}
                  onChange={this.formChange}
                  required
                >
                  <option value="" disabled selected>
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
                  <button type="reset" onClick={()=>{Router.push("/attendence")}} className="btn btn-secondary">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AssignAttendence;
