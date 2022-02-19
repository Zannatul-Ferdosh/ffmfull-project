import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Card, Button, Table, Space, Image, Switch, Popconfirm, Tag, Input, Modal,DatePicker } from 'antd';
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined,EditOutlined,EyeOutlined } from '@ant-design/icons'
import AdminServiceForm from './AdminServiceForm';
import moment from 'moment'
import {useHistory} from 'react-router-dom'
const Search = Input.Search;

function AdminListService() {
    let history = useHistory()
    const { user } = useSelector(state => state.auth)
    const [isLoading, setIsLoading] = useState(false)
    const [services, setServices] = useState([])
    const [records, setRecords] = useState([])

    const [showForm, setShowForm] = useState(false)

    const [selectedUser, setSelectedUser] = useState(null)


    useEffect(() => {
        if (user.sub) {
            setIsLoading(true)
            axios.get(`${process.env.REACT_APP_API_USER}/field-force/users/superadmin/services/list`)
                .then(res => {
                    console.log(res.data);
                    setServices( res.data.data);
                    // setRecords(res.data.data);
                    setIsLoading(false)
                })
                .catch(err => {
                    setIsLoading(false)
                    console.log(err);
                })
        }

    }, [user,showForm])

 

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

    const handleBack=()=>{

    }



    const columns = [

        {
            title: 'Service ID',
            key: 'id',
            dataIndex: 'id',
            render: (id) =>
            <span>{id}</span>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name) =>
                <span>{name}</span>
        },
        {
            title: 'Service Type',
            dataIndex: 'service_type',
            key: 'service_type',
            render: (service_type) =>
                <span>{service_type === 'paid'?"Paid":"Not Paid"}</span>
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, service) => (
                <Space size="middle">
                    <Button onClick={() =>handleSelectToEdit(service)} className='d-center' type='primary' icon={<EditOutlined />}></Button> 
                     <Popconfirm onConfirm={() => deleteTask(service)} title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                        <Button className='d-center' icon={<DeleteOutlined />} danger></Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ];


    const ServiceList = () => (
        <Card title={<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Service List</span>
            {/* <Button onClick={()=>history.push('/task/assign-task')} type='primary' icon={<PlusOutlined />} className='d_center'>Add Service</Button> */}
        </div>}>

            <Table
                rowKey="_id"
                loading={isLoading}
                columns={columns}
                dataSource={services}
                pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'], showQuickJumper: true }}
            />

        </Card>
    )
    return (
        <>
            {
                showForm ?
                <AdminServiceForm selectedUser={selectedUser} handleBack={()=>handleBack()} />:
                <ServiceList  />

             }
        </>
    )
}

export default AdminListService
