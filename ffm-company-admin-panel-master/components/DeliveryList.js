import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
var jwtDecode = require('jwt-decode');
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";


class DeliveryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveries: []
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const admin_id = decoded.sub;

    const headers = {
        'Authorization': `Bearer ${token}`
    }

    axios.get(`/api/v1/field-force/delivery/deliveries/admin/delivery-list/${admin_id}`, {headers:headers}).then(res => {
        console.log(res.data.data);
        this.setState({deliveries: res.data.data});
    }).catch(err => {
        console.log(err);
    });
  }

  

  removeDelivery(id,user_id) {
    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`
    }
  
    const post_data = {
      field_delivery_id:id,
      user_id:user_id
    }
  
    axios.post(`/api/v1/field-force/delivery/deliveries/remove-deliveries`,
                  post_data,
                  {headers:headers}
              ).then(res => {
                  const resp = res.data;
                  this.notify(resp.message);
                  window.location.reload
          }).catch(err => {
              console.log(err);
          });
   }

   notify = (val) => toast(val);

  render() {
    return (
      <div className="kt-portlet kt-portlet--mobile">
        <div className="kt-portlet__head kt-portlet__head--lg">
          <div class="kt-portlet__head-label">
            <span class="kt-portlet__head-icon">
              <i class="kt-font-brand flaticon2-line-chart"></i>
            </span>
            <h3 class="kt-portlet__head-title">Delivery List</h3>
          </div>

          <div class="kt-portlet__head-toolbar">
            <div class="kt-portlet__head-wrapper">
              <div class="kt-portlet__head-actions">
           
                <a href="/assign-deliveries" class="btn btn-brand btn-elevate btn-icon-sm">
                  <i class="la la-plus"></i>
                 Add Delivery
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="kt-portlet__body">
          <div
            id="kt_table_1_wrapper"
            className="dataTables_wrapper dt-bootstrap4 no-footer"
          >
            <div className="row">
              <div className="col-md-12">
                <table
                  class="table table-striped- table-bordered table-hover table-checkable dataTable no-footer dtr-inline"
                  id="kt_table_1"
                  role="grid"
                  aria-describedby="kt_table_1_info"
              
                >
                  <thead>
                  <tr>
                    <th>Delivery ID</th>
                   
                    <th>Title</th>
                    <th>Assigned To </th>
                    <th>Is Paid</th>
                    {/* <th>Assigned Latitude</th>
                    <th>Assigned Longitude</th> */}
                    <th>Assigned Time</th>
                    <th>Update</th>
                    {/* <th>Delete</th> */}
                    <th>Details</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.deliveries.map(item => {
                        var str = item.assigned_delivery_time;
                        var parts = str.slice(0, -1).split("T");
                        var date = parts[0];
                        var d = new Date(item.assigned_delivery_time);
                        var time = d.toTimeString();
                                    return (
                                        <>
                                            <tr>
                                                <td>{item.id}</td>
                                   
                                                <td>{item.title}</td>
                                                <td>{item.user_first_name}  {item.user_last_name}</td>
                                                <td>{item.is_paid === true ? "Yes": "No"}</td>
                                                {/* <td>{item.assigned_location_lattitude}</td>
                                                <td>{item.assigned_location_longitude}</td> */}
                                                <td>{date} &nbsp; {time}</td>
                                                <td><Link href="/delivery/[deliveryId]" as={`/delivery/${item.id}`}><a className="btn btn-success" href="#" role="button">Update</a></Link></td>
                                                {/* <td><button type="reset" onClick={() => this.removeDelivery(item.id,item.user_id)} className="btn btn-danger">Delete</button></td> */}
                                                <td><Link href="/delivery/d/[deliveryDetails]" as={`/delivery/d/${item.id}`}><a className="btn btn-success" href="#" role="button">Details</a></Link></td>
                                            </tr>

                                        </>
                                    )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

         
          </div>
        </div>
      </div>
    );
  }
}




DeliveryList.propTypes = {};


export default DeliveryList;
