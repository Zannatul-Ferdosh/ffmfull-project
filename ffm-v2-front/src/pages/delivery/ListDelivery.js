import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Card, Button, Table, Space, Image, Switch, Popconfirm, Tag, Input, Modal,DatePicker } from 'antd';
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined,EditOutlined,EyeOutlined } from '@ant-design/icons'
import AssignDelivery from './DeliveryForm';
import moment from 'moment'
import {useHistory} from 'react-router-dom'
const Search = Input.Search;

function ListDelivery() {
    let history = useHistory()
    const { user } = useSelector(state => state.auth)
    const [isLoading, setIsLoading] = useState(false)
    const [deliveries, setDeliveries] = useState([])
    const [records, setRecords] = useState([])

    const [showForm, setShowForm] = useState(false)

    const [selectedUser, setSelectedUser] = useState(null)


    useEffect(() => {
        if (user.sub) {
            setIsLoading(true)
            axios.get(`${process.env.REACT_APP_API_DELIVERY}/field-force/delivery/deliveries/admin/delivery-list/${user.sub}`)
                .then(res => {
                    console.log(res.data);
                    setDeliveries( res.data.data);
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
            title: 'Delivery ID',
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
            key: 'user',
            render: (text,item) =>
                <span>{item.user_first_name}  {item.user_last_name}</span>
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
            dataIndex: 'assigned_delivery_time',
            key: 'assigned_delivery_time',
            render: (assigned_delivery_time) =>
                <span>{moment(assigned_delivery_time).format("DD MMM YYYY")}</span>
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


    const DeliveryList = () => (
        <Card title={<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Delivery List</span>
            <Button onClick={()=>history.push('/assign-deliveries')} type='primary' icon={<PlusOutlined />} className='d_center'>Add Delivery</Button>
        </div>}>

            <Table
                rowKey="_id"
                loading={isLoading}
                columns={columns}
                dataSource={deliveries}
                pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'], showQuickJumper: true }}
            />

        </Card>
    )
    return (
        <>
            {
                showForm ?
                <AssignDelivery selectedUser={selectedUser} handleBack={()=>handleBack()} />:
                <DeliveryList  />

             }
        </>
    )
}

export default ListDelivery
