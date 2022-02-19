import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
var jwtDecode = require("jwt-decode");
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

class AttendenceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendence: [],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const admin_id = decoded.sub;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get(
        `/api/v1/field-force/attendence/attendences/admin/attendence-list/${admin_id}`,
        { headers: headers }
      )
      .then((res) => {
        console.log(res.data.data);
        this.setState({ attendence: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  removeAttendence(id, user_id) {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const post_data = {
      field_attendence_id: id,
      user_id: user_id,
    };

    axios
      .post(
        `/api/v1/field-force/attendence/attendences/remove-attendence`,
        post_data,
        { headers: headers }
      )
      .then((res) => {
        const resp = res.data;
        console.log(resp);
        this.notify(resp.message);
      })
      .catch((err) => {
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
            <h3 class="kt-portlet__head-title">Attendence List</h3>
          </div>

          <div class="kt-portlet__head-toolbar">
            <div class="kt-portlet__head-wrapper">
              <div class="kt-portlet__head-actions">
                <a
                  href="/add-attendence"
                  class="btn btn-brand btn-elevate btn-icon-sm"
                >
                  <i class="la la-plus"></i>
                  Add Attendence
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
                      <th>Attendence ID</th>

                      <th>Title</th>
                      <th>Assigned To</th>
                      {/* <th>Is Paid</th> */}
                      {/* <th>Assigned Latitude</th>
                    <th>Assigned Longitude</th> */}
                      <th>Assigned At</th>
                      <th>Update</th>

                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.attendence.map((item) => {
                      var str = item.assigned_time;
                      var parts = str.slice(0, -1).split("T");
                      var date = parts[0];
                      var d = new Date(item.assigned_time);
                      var time = d.toTimeString();
                      return (
                        <>
                          <tr>
                            <td>{item.id}</td>

                            <td>{item.title}</td>
                            <td>
                              {item.user_first_name}{" "}
                              {item.user_last_name}
                            </td>
                            {/* <td>{item.is_paid === true ? "Yes": "No"}</td> */}
                            {/* <td>{item.assigned_location_lattitude}</td>
                                                <td>{item.assigned_location_longitude}</td> */}
                            <td>
                              {date} &nbsp; {time}
                            </td>

                            <td>
                              <Link
                                href="/attendence/[attendence]"
                                as={`/attendence/${item.id}`}
                              >
                                <a
                                  className="btn btn-success"
                                  href="#"
                                  role="button"
                                >
                                  Update
                                </a>
                              </Link>
                            </td>

                            <td>
                              <Link
                                href="/attendence/a/[attendenceDetails]"
                                as={`/attendence/a/${item.id}`}
                              >
                                <a
                                  className="btn btn-success"
                                  href="#"
                                  role="button"
                                >
                                  Details
                                </a>
                              </Link>
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
        </div>
      </div>
    );
  }
}

AttendenceList.propTypes = {};

export default AttendenceList;
