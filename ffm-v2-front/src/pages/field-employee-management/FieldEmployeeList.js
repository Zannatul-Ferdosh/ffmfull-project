import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Card, Button, Table, Space, Image, Switch, Popconfirm, Tag, Input, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined,EditOutlined } from '@ant-design/icons'
import UserForm from './FieldEmployeeForm';
import moment from 'moment'
import {useHistory} from 'react-router-dom'
const Search = Input.Search;

function ListUser() {
    let history = useHistory()
    const { user } = useSelector(state => state.auth)
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [records, setRecords] = useState([])

    const [showForm, setShowForm] = useState(false)

    const [selectedUser, setSelectedUser] = useState(null)


    useEffect(() => {
        if (user.sub) {
            setIsLoading(true)
            axios.get(`${process.env.REACT_APP_API_USER}/field-force/users/admin/user/list/${user.company_id}`)
                .then(res => {
                    setUsers(res.data.data);
                    setRecords(res.data.data);
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
        axios.delete(`${process.env.REACT_APP_API_USER}/field-force/users/admin/user/remove/` + id)
            .then(res => {
                setUsers(prev => (users.filter((item) => item.id !== id)))
                setRecords(prev => (users.filter((item) => item.id !== id)))
            }).catch(err => {
                console.log(err);
            });
    }


    const handleSearch = val => {

        if (val == "")
            setUsers(records);
        else
            setUsers(records.filter(x => x.phone_number.includes(val)))

    }


    const columns = [

        {
            title: 'SL No',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name, users) =>
                <span>{users.first_name} {users.last_name}</span>
        },
        {
            title: 'Contact',
            dataIndex: 'phone_number',
            key: 'phone_number',
            render: (phone_number) =>
                <span>{phone_number}</span>
        },
        {
            title: 'Registered On',
            dataIndex: 'registered_on',
            key: 'registered_on',
            render: (registered_on) =>
                <span>{moment(registered_on).format("DD MMM YYYY")}</span>
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            render: department =>
                <span>{department}</span>
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
            render: designation =>
                <span>{designation}</span>
        },
        {
            title: 'NID',
            dataIndex: 'nid',
            key: 'nid',
            render: nid =>
                <span>{nid}</span>
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() =>handleSelectToEdit(record)} className='d-center' type='primary' icon={<EditOutlined />}></Button>
                    <Popconfirm onConfirm={() => deleteUser(record.id)} title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                        <Button className='d-center' icon={<DeleteOutlined />} danger></Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ];


    const AdminList = () => (
        <Card title={<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Field Employee List</span>
            <Button onClick={()=>history.push('/add-company-field-employee')} type='primary' icon={<PlusOutlined />} className='d_center'>Add Field Employee</Button>
        </div>}>
            <Search
                placeholder="Enter Contact"
                onSearch={handleSearch}
                style={{ width: 200 }}
            />
            <Table
                rowKey="_id"
                loading={isLoading}
                columns={columns}
                dataSource={users}
                pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'], showQuickJumper: true }}
            />

        </Card>
    )
    return (
        <>
            {
                showForm ?
                <UserForm selectedUser={selectedUser} handleBack={()=>handleBack()} />:
                <AdminList  />

             }
        </>
    )
}

export default ListUser
