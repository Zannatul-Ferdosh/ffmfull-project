import React, { Component } from "react";
import Link from "next/link";
import axios from "axios";
import jwt_decode from "jwt-decode";
import dynamic from "next/dynamic";
import DeleteModal from "../DeleteModal";
import Router from "next/router";
const MapRender = dynamic(() => import("../Map/Map"), {
  ssr: false,
});

const mapUI ={
  height:"400px",
  width:"400px"
}

class TaskDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task_details: [],

      modalToggle: false,
      TaskId: "",
      userId: "",
    };
  }

  componentDidMount() {
    console.log(this.props.task_data);

    this.setState({ task_details: this.props.task_data });
  }
  HideModal = () => {
    this.setState({
      modalToggle: false,
    });
  };

  RemoveTask = () => {
    let task_id = this.state.task_details.task_id;
    let admin_id = this.state.task_details.admin_id;


    console.log(task_id);

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios
      .delete(
        "/api/v1/field-force/task/admin-delete-tasks/" +
        admin_id +
          "/" +
          task_id,
        { headers: headers }
      )
      .then((res) => {
        Router.push("/task/list-tasks");
      })
      .catch((err) => {});
  };

  render() {
    return (
      <div className="kt-portlet ">
        <div className="kt-portlet__body">
          <div className="kt-widget kt-widget--user-profile-3">
            <div className="kt-widget__top">
              <div className="kt-widget__content">
                <div className="row">
                  <div className="col-4"></div>
                  <div className="col-8">
                    <div className="float-right">
                      {this.state.task_details.task_complete_status === null ? (
                        <span className="btn btn-warning">
                          <b>Status:</b> Not Completed
                        </span>
                      ) : (
                        <span className="btn btn-success">
                          <b>Status:</b> Completed
                        </span>
                      )}
                      &nbsp;
                      {this.state.task_details.payment_status === false ? (
                        <span class="btn btn-warning">
                          <b>Payment Status:</b> False
                        </span>
                      ) : (
                        <span class="btn btn-success">
                          <b>Payment Status:</b> Done
                        </span>
                      )}
                      &nbsp;
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          this.setState({
                            modalToggle: true,
                          });

                          console.log(this.state.task_details.user_id);
                        }}
                      >
                        Delete Task
                      </button>
                      <DeleteModal
                        Show={this.state.modalToggle}
                        Hide={this.HideModal}
                        Confirm={() => {
                          this.RemoveTask();
                          this.setState({ modalToggle: false });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    <h3>Task: {this.state.task_details.title}</h3>

                    <h6>
                      Task Notes:{" "}
                      <span>
                        {" "}
                        {this.state.task_details.notes === null
                          ? "No task notes given"
                          : this.state.task_details.notes}
                      </span>{" "}
                    </h6>
                  </div>
                  <div className="col-8"></div>
                </div>

                <div className="row">
                  <div className="col-4 mt-4">
                    <p>
                      <b>Assigned To: </b> {this.state.task_details.assigned_to}
                    </p>
                    <p>
                      <b>Phone: </b> {this.state.task_details.assigned_to_phone}
                    </p>

                    <p>
                      <b>Assigned By: </b>
                      {this.state.task_details.admin_name}
                    </p>
                    <p>
                      <b>Designation: </b>{" "}
                      {this.state.task_details.admin_designation}
                    </p>
                    <p>
                      <b>Is Paid: </b>
                      {this.state.task_details.is_paid === true ? "Yes" : "No"}
                    </p>
                    <p>
                      {" "}
                      <b>Bill Amount: </b>
                      {this.state.task_details.bill_amount === null
                        ? "0"
                        : this.state.task_details.bill_amount}
                    </p>
                    <p>
                      <b>Assigned Address: </b>{" "}
                      {this.state.task_details.assigned_address}
                    </p>
                    {/* <p>
                      <b> Lat-Long: </b>
                      {this.state.task_details.assigned_location_lattitude +
                        ", " +
                        this.state.task_details
                          .assigned_location_longitude}{" "}
                    </p> */}

                    <p>
                      <b>Assigned Time : </b>{" "}
                      <span className="btn btn-label-brand btn-sm btn-bold btn-upper">
                        {this.state.task_details.assigned_time}
                      </span>{" "}
                    </p>

                    <p>
                      <b>Completed At: </b>{" "}
                      <span className="btn btn-label-danger btn-sm btn-bold btn-upper">
                        {this.state.task_details.task_complete_time === null
                          ? "Not Completed"
                          : this.state.task_details.task_complete_time}
                      </span>
                    </p>
                  </div>
                  <div className="col-8"  style={mapUI}>
                    <MapRender
                      assigned_lat={
                        this.state.task_details.assigned_location_lattitude
                      }
                      assigned_long={
                        this.state.task_details.assigned_location_longitude
                      }
                      showMarkerOnly={true}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    {this.state.task_details.photos
                      ? this.state.task_details.photos.map((photo) => {
                          return (
                            <img src={photo} width="300px" height="300px" />
                          );
                        })
                      : "No Image"}
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}



export default TaskDetails;
