import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Card, Button, Table, Space, Image, Switch, Popconfirm, Tag, Input, Modal,DatePicker } from 'antd';
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined,EditOutlined,EyeOutlined } from '@ant-design/icons'
import AttendanceForm from './AttendanceForm';
import moment from 'moment'
import {useHistory} from 'react-router-dom'
const Search = Input.Search;

function ListAttendence() {
    let history = useHistory()
    const { user } = useSelector(state => state.auth)
    const [isLoading, setIsLoading] = useState(false)
    const [attendences, setAttendences] = useState([])
    const [records, setRecords] = useState([])

    const [showForm, setShowForm] = useState(false)

    const [selectedUser, setSelectedUser] = useState(null)


    useEffect(() => {
        if (user.sub) {
            setIsLoading(true)
            axios.get(`${process.env.REACT_APP_API_ATTENDENCE}/field-force/attendence/attendences/admin/attendence-list/${user.sub}`)
                .then(res => {
                    console.log(res.data);
                   setAttendences( res.data.data);
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



    const deleteUser = (id) => {
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
            title: 'Attendance ID',
            key: 'id',
            render: (id) =>
            <span>{id}</span>,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (title) =>
                <span>{title}</span>
        },
        
        {
            title: 'Assigned To',
            key: 'name',
            render: (text,record) =>
                <span>{record.user_first_name}{" "}{record.user_last_name}</span>
        },
        {
            title: 'Assigned At',
            dataIndex: 'assigned_time',
            key: 'assigned_time',
            render: (assigned_time) =>
                <span>{moment(assigned_time).format("DD MMM YYYY")}</span>
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() =>null} className='d-center' type='primary' icon={<EyeOutlined />}></Button>
                    {/* <Button onClick={() =>handleSelectToEdit(record)} className='d-center' type='primary' icon={<EditOutlined />}></Button> */}
                    {/* <Popconfirm onConfirm={() => deleteUser(record.id)} title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                        <Button className='d-center' icon={<DeleteOutlined />} danger></Button>
                    </Popconfirm> */}

                </Space>
            ),
        },
    ];


    const AttendanceList = () => (
        <Card title={<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Attendance List</span>
            <Button onClick={()=>history.push('/add-attendance')} type='primary' icon={<PlusOutlined />} className='d_center'>Add Attendance</Button>
        </div>}>

            <Table
                rowKey="_id"
                loading={isLoading}
                columns={columns}
                dataSource={attendences}
                pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'], showQuickJumper: true }}
            />

        </Card>
    )
    return (
        <>
            {
                showForm ?
                <AttendanceForm selectedUser={selectedUser} handleBack={()=>handleBack()} />:
                <AttendanceList  />

             }
        </>
    )
}

export default ListAttendence
