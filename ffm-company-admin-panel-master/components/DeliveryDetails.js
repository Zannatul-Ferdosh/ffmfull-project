import React, { Component } from "react";
import Link from "next/link";
import axios from "axios";
import dynamic from "next/dynamic";
import Router from "next/router";
import DeleteModal from "../components/DeleteModal";

const MapRender = dynamic(() => import("../components/Map/Map"), {
  ssr: false,
});


const mapUI ={
  height:"400px",
  width:"700px"
}

class DeliveryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delivery_details: [],
      delivery: {
        assigned_location_lattitude: 23.8103,
        assigned_location_longitude: 90.4125,
      },
      modalToggle:false,
      photo_urls: [],
    };
  }
  HideModal= ()=>{
    this.setState({
      modalToggle:false
    })
   
     };

     
     RemoveDelivery =()=>{

    let data ={
      field_delivery_id: this.state.delivery.id,
      user_id:this.state.delivery.user_id
    }
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    axios.post("/api/v1/field-force/delivery/deliveries/remove-deliveries",data,
    { headers: headers }
    ).then(res=>{
    Router.push("/deliveries");
    }).catch(err=>{
    
    })
    
    
      }

  componentDidMount() {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    console.log(this.props.delivery_data);
    axios
      .get(
        `/api/v1/field-force/delivery/deliveries/get-delivery/${this.props.delivery_data}`,
        { headers: headers }
      )
      .then((res) => {
        console.log(res.data.data);
        this.setState({
          delivery: res.data.data.deliveries[0],
          photo_urls: res.data.data.photo_urls,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
                      {this.state.delivery.delivery_status === false ? (
                        <span className="btn btn-warning">
                          <b>Status:</b> Not Completed
                        </span>
                      ) : (
                        <span className="btn btn-success">
                          <b>Status:</b> Completed
                        </span>
                      )}
                      &nbsp;
                      {this.state.delivery.delivery_status === false ? (
                        <span class="btn btn-warning">
                          <b>Payment Status:</b> False
                        </span>
                      ) : (
                        <span class="btn btn-success">
                          <b>Payment Status:</b> Done
                        </span>
                      )}
                      &nbsp;
                      <button type="button" className="btn btn-danger" onClick={()=>{
                            this.setState({modalToggle:true})

                          }}>
                        Delete Task
                      </button>
                      
                      <DeleteModal  Show={this.state.modalToggle} Hide={this.HideModal} Confirm={()=>{
                        
                        this.RemoveDelivery( );
                       this.setState({modalToggle:false})
                    
                    }}/>

                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    <h3>Delivery: {this.state.delivery.title}</h3>

                    <h6>
                      Delivery Notes:{" "}
                      <span>
                        {" "}
                        {this.state.delivery.note === null
                          ? "No delivery notes given"
                          : this.state.delivery.note}
                      </span>{" "}
                    </h6>
                  </div>
                  <div className="col-8"></div>
                </div>

                <div className="row">
                  <div className="col-4 mt-4">
                    <p>
                      <b>Assigned To: </b> {this.state.delivery.user_name}
                    </p>
                    {/* <p>
                          <b>Phone: </b> {this.state.task_details.assigned_to_phone}
                        </p> */}

                    <p>
                      <b>Assigned By: </b>
                      {this.state.delivery.admin_name}
                    </p>
                    {/* <p>
                          <b>Designation: </b>{" "}
                          {this.state.task_details.admin_designation}
                        </p> */}
                    {/* <p>
                          <b>Is Paid:  </b>
                          {this.state.task_details.is_paid === true ? "Yes" : "No"}
                        </p> */}
                    <p>
                      {" "}
                      <b>Bill Amount: </b>
                      {this.state.delivery.bill_amount === null
                        ? "0"
                        : this.state.delivery.bill_amount}
                    </p>
                    <p>
                      <b>Assigned Address: </b>{" "}
                      {this.state.delivery.client_address}
                    </p>

                    <p>
                      <b>Assigned Time : </b>{" "}
                      <span className="btn btn-label-brand btn-sm btn-bold btn-upper">
                        {this.state.delivery.assigned_delivery_time}
                      </span>{" "}
                    </p>

                    <p>
                      <b>Completed At: </b>{" "}
                      <span className="btn btn-label-danger btn-sm btn-bold btn-upper">
                        {this.state.delivery.delivery_time === null
                          ? "Not Completed"
                          : this.state.delivery.delivery_time}
                      </span>
                    </p>
                  </div>
                  <div className="col-8" style={mapUI}>
                    <MapRender
                      assigned_lat={
                        this.state.delivery.assigned_location_lattitude
                      }
                      assigned_long={
                        this.state.delivery.assigned_location_longitude
                      }
                      showMarkerOnly={true}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    {this.state.photo_urls
                      ? this.state.photo_urls.map((photo) => {
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

export default DeliveryDetails;
