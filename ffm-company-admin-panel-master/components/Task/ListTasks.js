import React, { Component } from "react";
import Link from 'next/link';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import NavbarCollapse from "react-bootstrap/NavbarCollapse";

class ListTasks extends Component {   
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
    } 

    componentDidMount() {
        const token = localStorage.getItem('token');
        const decoded = jwt_decode(token);
        const admin_id = decoded.sub;

        const headers = {
            'Authorization': `Bearer ${token}`
        }

        axios.get(`/api/v1/field-force/task/admin-get-tasks/${admin_id}`, {headers:headers}).then(res => {
            this.setState({tasks: res.data.message});
        }).catch(err => {
            console.log(err);
        });
    }

    // rowClick = (task_id) => {
    //     console.log(task_id);
    // }

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
                                Task List
                            </h3>
                        </div>
                        <div className="kt-portlet__head-toolbar">
                            <div className="kt-portlet__head-wrapper">
                                <div className="kt-portlet__head-actions">
                          
                                    &nbsp;
                                    <a href="/task/assign-task" className="btn btn-brand btn-elevate btn-icon-sm">
                                        <i className="la la-plus"></i>
                                        Add Task
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="kt-portlet__body">

                        <table className="table table-striped- table-bordered table-hover table-checkable" id="kt_table_1">
                            <thead>
                                <tr>
                                    <th>Task ID</th>
                                    <th>Title</th>
                                    <th>Is Paid</th>
                                    <th>Assigned At</th>
                                    <th>Assigned To</th>
                                    
                                    <th>Status</th>
                                    <th>Show Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.tasks.map(task => {

                                    var str = task.assigned_time;
                                    var parts = str.slice(0, -1).split('T');
                                    var date = parts[0];
                                    var d = new Date(task.assigned_time);
                                    var time = d.toTimeString();

                                    return (
                                        <>
                                            <tr tabIndex="0" key={task.task_id}>
                                              <td>{task.task_id}</td>
                                                <td>{task.title}</td>
                                                <td>{task.is_paid === true ? "Yes": "No"}</td>
                                    <td>{date} &nbsp; {time}</td>
                                                <td>{task.assigned_to}</td>
                                            
                                                <td>{task.task_complete_status === null ? "False": "True"}</td>
                                                <td><Link href="/task/t/[user_id]/[id]" as={`/task/t/${task.user_id}/${task.task_id}`}><a className="btn btn-success" href="#" role="button">Details</a></Link></td>
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

export default ListTasks;