import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Card, Button, Table, Space, Image, Switch, Popconfirm, Tag, Input, Modal,DatePicker } from 'antd';
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined,EditOutlined,EyeOutlined } from '@ant-design/icons'
import AssignTask from './AssignTask';
import moment from 'moment'
import {useHistory} from 'react-router-dom'
const Search = Input.Search;

function ListTask() {
    let history = useHistory()
    const { user } = useSelector(state => state.auth)
    const [isLoading, setIsLoading] = useState(false)
    const [tasks, setTasks] = useState([])
    const [records, setRecords] = useState([])

    const [showForm, setShowForm] = useState(false)

    const [selectedUser, setSelectedUser] = useState(null)


    useEffect(() => {
        if (user.sub) {
            setIsLoading(true)
            axios.get(`${process.env.REACT_APP_API_TASK}/field-force/task/admin-get-tasks/${user.sub}`)
                .then(res => {
                    console.log(res.data);
                   setTasks( res.data.message);
                    // setRecords(res.data.data);
                    setIsLoading(false)
                })
                .catch(err => {
                    setIsLoading(false)
                    console.log(err);
                })
        }

    }, [user,showForm])

    const handleBack=()=>{
        setShowForm(false)
    }

    const handleSelectToEdit=(user)=>{
        setSelectedUser(user)
        setShowForm(true)
    }



    const deleteTask = (task) => {
        console.log(task);
        // axios.delete('/api/v1/field-force/users/admin/user/remove/' + id)
        //     .then(res => {
        //         setTasks(prev => (users.filter((item) => item.id !== id)))
        //         setRecords(prev => (users.filter((item) => item.id !== id)))
        //     }).catch(err => {
        //         console.log(err);
        //     });
    }



    const columns = [

        {
            title: 'Task ID',
            key: 'task_id',
            dataIndex: 'task_id',
            render: (task_id) =>
            <span>{task_id}</span>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (title) =>
                <span>{title}</span>
        },
        {
            title: 'Is Paid',
            dataIndex: 'is_paid',
            key: 'is_paid',
            render: (is_paid) =>
                <span>{is_paid?"Yes":"No"}</span>
        },
        {
            title: 'Assigned At',
            dataIndex: 'assigned_time',
            key: 'assigned_time',
            render: (assigned_time) =>
                <span>{moment(assigned_time).format("DD MMM YYYY")}</span>
        },
        {
            title: 'Assigned To',
            dataIndex: 'assigned_to',
            key: 'assigned_to',
            render: assigned_to =>
                <span>{assigned_to}</span>
        },
        {
            title: 'Status',
            dataIndex: 'task_complete_status',
            key: 'task_complete_status',
            render: task_complete_status =>
                <span>{task_complete_status === null ? "False": "True"}</span>
        },
        {
            title: 'Show Details',
            key: 'action',
            render: (text, task) => (
                <Space size="middle">
                    <Button onClick={() =>history.push(`/task/${task.user_id}/${task.task_id}`)} className='d-center' type='primary' icon={<EyeOutlined />}></Button>
                    {/* <Button onClick={() =>handleSelectToEdit(record)} className='d-center' type='primary' icon={<EditOutlined />}></Button> */}
                    {/* <Popconfirm onConfirm={() => deleteTask(task)} title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                        <Button className='d-center' icon={<DeleteOutlined />} danger></Button>
                    </Popconfirm> */}

                </Space>
            ),
        },
    ];


    const TaskList = () => (
        <Card title={<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Task List</span>
            <Button onClick={()=>history.push('/task/assign-task')} type='primary' icon={<PlusOutlined />} className='d_center'>Add Task</Button>
        </div>}>

            <Table
                rowKey="_id"
                loading={isLoading}
                columns={columns}
                dataSource={tasks}
                pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'], showQuickJumper: true }}
            />

        </Card>
    )
    return (
        <>
            {
                showForm ?
                <AssignTask selectedUser={selectedUser} handleBack={()=>handleBack()} />:
                <TaskList  />

             }
        </>
    )
}

export default ListTask
