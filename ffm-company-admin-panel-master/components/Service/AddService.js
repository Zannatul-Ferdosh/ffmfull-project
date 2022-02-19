import React, { Component } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from "next/router";


class AddCompanyC extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            service_type: ""
          
        };
    } 

    componentDidMount() {
        console.log(this.state)
        
    }

    notify = (val) => toast(val);

    AddService = (e) => {
        e.preventDefault();

        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        const data = {
            name: this.state.name,
            service_type: this.state.service_type,
           
        }

        axios.post('/api/v1/field-force/users/superadmin/services/create',
                data,
                {headers:headers}
            ).then(res => {
                this.setState({
                    name: "",
                    service_type: "",
                 
                })

                if(res.data.statusCode ==403){

                    alert("Service Already exits");
                }else{
                const resp = res.data;
                Router.push("/services");
                console.log(resp);
                this.notify(resp.message);
                }
              
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


    render() {
        return (
            <div className="kt-portlet">
                <div className="kt-portlet__head">
                    <div className="kt-portlet__head-label">
                        <h3 className="kt-portlet__head-title">
                            Add New Service
                        </h3>
                    </div>
                </div>
                <ToastContainer />
                <form className="kt-form">
                    <div className="kt-portlet__body">
                        <div className="form-group">
                            <label>Service Name <span style={{color:"red"}}>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Name"
                                name="name"
                                value={this.state.name}
                                onChange={this.formChange}
                                required />
                        </div>
                        {/* <div className="form-group">
                            <label>Service Type</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Enter Service"
                                name="service_type"
                                value={this.state.service_type}
                                onChange={this.formChange} />
                        </div> */}
                        <div className="form-group">
                            <label>Service Type <span style={{color:"red"}}>*</span></label>
                            <select 
                                className="form-control"
                                
                                name="service_type"
                                value={this.state.service_type}
                                onChange={this.formChange}>
                                <option>-- Select --</option>
                                <option value="paid">Paid</option>
                                <option value="non_paid"> Not Paid</option>
                                </select>
                        </div>

               
     

                    </div>
                    <div className="kt-portlet__foot">
                        <div className="kt-form__actions">
                            <button type="reset" onClick={this.AddService} className="btn btn-primary">Submit</button>
                         
                        </div>
                    </div>
                </form>

            </div>

        )
    }
}

export default AddCompanyC;