import React, { useEffect, useState } from 'react'
import { useParams,useHistory } from 'react-router-dom'
import axios from 'axios'
import { Card, Button, Spin ,Popconfirm} from 'antd'
import MapRender from '../../components/Map/Map'
import {  QuestionCircleOutlined } from '@ant-design/icons'

function TaskDetails() {
    const [task, setTask] = useState(null)
    const [loading, setLoading] = useState(true)
    let { userid, taskid } = useParams()
    let history = useHistory()
    useEffect(() => {
        if (userid && taskid) {
            setLoading(true)
            axios.get(`${process.env.REACT_APP_API_TASK}/field-force/task/get-task-details/${userid}/${taskid}`)
                .then(res => {
                    setTask(res.data.data[0]);
                    setLoading(false)
                })
                .catch(err => {
                    setLoading(false)
                    console.log(err);
                })
        }
    }, [userid, taskid])

    const mapUI = {
        height: "400px",
        width: "400px"
    }

    const deleteTask=(task)=>{
        axios
        .delete(`${process.env.REACT_APP_API_TASK}/field-force/task/admin-delete-tasks/${task.admin_id}/${task.task_id}`)
        .then((res) => {
          history.push("/task/list-tasks");
        })
        .catch((err) => {});
    }

    const TaskDetailsContainer = () => (
        <Card>
            <div className="row">
                <div className="col-4"></div>
                <div className="col-8">
                    <div style={{ float: 'right' }}>
                        {task.task_complete_status === null ? (
                            <span className="btn btn-warning">
                                <b>Status:</b> Not Completed
                            </span>
                        ) : (
                            <span className="btn btn-success">
                                <b>Status:</b> Completed
                            </span>
                        )}
                      &nbsp;
                      {task.payment_status === false ? (
                            <span class="btn btn-warning">
                                <b>Payment Status:</b> False
                            </span>
                        ) : (
                            <span class="btn btn-success">
                                <b>Payment Status:</b> Done
                            </span>
                        )}
                      &nbsp;

                     <Popconfirm onConfirm={() => deleteTask(task)} title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                            <button type="button" className="btn btn-danger">Delete Task</button>
                        </Popconfirm>

                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-4">
                    <h3>Task: {task.title}</h3>

                    <h6>
                        Task Notes:{" "}
                        <span>
                            {" "}
                            {task.notes === null
                                ? "No task notes given"
                                : task.notes}
                        </span>{" "}
                    </h6>
                </div>
                <div className="col-8"></div>
            </div>

            <div className="row">
                <div className="col-4 mt-4">
                    <p>
                        <b>Assigned To: </b> {task.assigned_to}
                    </p>
                    <p>
                        <b>Phone: </b> {task.assigned_to_phone}
                    </p>

                    <p>
                        <b>Assigned By: </b>
                        {task.admin_name}
                    </p>
                    <p>
                        <b>Designation: </b>{" "}
                        {task.admin_designation}
                    </p>
                    <p>
                        <b>Is Paid: </b>
                        {task.is_paid === true ? "Yes" : "No"}
                    </p>
                    <p>
                        {" "}
                        <b>Bill Amount: </b>
                        {task.bill_amount === null
                            ? "0"
                            : task.bill_amount}
                    </p>
                    <p>
                        <b>Assigned Address: </b>{" "}
                        {task.assigned_address}
                    </p>
                    {/* <p>
                      <b> Lat-Long: </b>
                      {task.assigned_location_lattitude +
                        ", " +
                        task
                          .assigned_location_longitude}{" "}
                    </p> */}

                    <p>
                        <b>Assigned Time : </b>{" "}
                        <span className="btn btn-label-brand btn-sm btn-bold btn-upper">
                            {task.assigned_time}
                        </span>{" "}
                    </p>

                    <p>
                        <b>Completed At: </b>{" "}
                        <span className="btn btn-label-danger btn-sm btn-bold btn-upper">
                            {task.task_complete_time === null
                                ? "Not Completed"
                                : task.task_complete_time}
                        </span>
                    </p>
                </div>
                <div className="col-8" style={mapUI}>
                    <MapRender
                        assigned_lat={
                            task.assigned_location_lattitude
                        }
                        assigned_long={
                            task.assigned_location_longitude
                        }
                        showMarkerOnly={true}
                    />
                </div>
            </div>


            <div className="row">
                <div className="col-12">
                    {task.photos
                        ? task.photos.map((photo) => {
                            return (
                                <img src={photo} width="300px" height="300px" />
                            );
                        })
                        : "No Image"}
                </div>
            </div>
        </Card>
    )
    return (
        <div className='task_details'>
            {
                loading ? <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",width:"100%"}}><Spin size='large' /></div>:
                task ? <TaskDetailsContainer />:<div>No task found</div>
            }
        </div>
    )
}

export default TaskDetails
