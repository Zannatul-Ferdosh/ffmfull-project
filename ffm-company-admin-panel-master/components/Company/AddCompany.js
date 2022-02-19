import React, { Component } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class AddCompanyC extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            tin: ""
        };
    } 

    componentDidMount() {
        console.log(this.state)
        
    }

    notify = (val) => toast(val);

    pushCompany = (e) => {
        e.preventDefault();

        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        const post_data = {
            name: this.state.name,
            address: this.state.address,
            tin: this.state.tin
        }

        axios.post('/api/v1/field-force/auth/register-company',
                post_data,
                {headers:headers}
            ).then(res => {
                this.setState({
                    name: "",
                    address: "",
                    tin: ""
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


    render() {
        return (
            <div className="kt-portlet">
                <div className="kt-portlet__head">
                    <div className="kt-portlet__head-label">
                        <h3 className="kt-portlet__head-title">
                            Add New company
                        </h3>
                    </div>
                </div>
                <ToastContainer />
                <form className="kt-form">
                    <div className="kt-portlet__body">
                        <div className="form-group">
                            <label>Company Name</label>
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
                </form>

            </div>

        )
    }
}

export default AddCompanyC;