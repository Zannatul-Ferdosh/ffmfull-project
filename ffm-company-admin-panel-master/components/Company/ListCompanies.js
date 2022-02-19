import React, { Component } from "react";
import axios from 'axios';


class ListCompanies extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            companies: []
        };
    } 

    componentDidMount() {
        
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
        axios.get('/api/v1/field-force/auth/get-company-list', {headers:headers}).then(res => {
            console.log(res);
            this.setState({companies: res.data});
        }).catch(err => {
            console.log(err);
        });
    }
    render() {
        return (
            <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
                <div className="kt-portlet kt-portlet--mobile">
                    <div className="kt-portlet__head kt-portlet__head--lg">
                        <div className="kt-portlet__head-label">
                            <span className="kt-portlet__head-icon">
                                <i className="kt-font-brand flaticon2-line-chart"></i>
                            </span>
                            <h3 className="kt-portlet__head-title">
                                Company List
                            </h3>
                        </div>
                        <div className="kt-portlet__head-toolbar">
                            <div className="kt-portlet__head-wrapper">
                                <div className="kt-portlet__head-actions">
                                    <div className="dropdown dropdown-inline">
                                    </div>
                                    &nbsp;
                                    <a href="" className="btn btn-brand btn-elevate btn-icon-sm">
                                        <i className="la la-plus"></i>
                                       Add New Company Admin
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="kt-portlet__body">

                        <table className="table table-striped- table-bordered table-hover table-checkable" id="kt_table_1">
                            <thead>
                                <tr>
                                    <th>Company ID</th>
                                    <th>Namy</th>
                                    <th>Address</th>
                                    <th>TIN</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.companies.map(company => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{company.id}</td>
                                                <td>{company.name}</td>
                                                <td>{company.address}</td>
                                                <td>{company.tin}</td>
                                            </tr>

                                        </>
                                    )
                                })}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

        )
    }
}

export default ListCompanies;