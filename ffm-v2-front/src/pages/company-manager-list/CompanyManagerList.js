import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Card, Button, Table, Space, Image, Switch, Popconfirm, Tag, Input, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import CompanyManagerForm from './CompanyManagerForm';
const Search = Input.Search;

function CompanyAdminList() {
    const { user } = useSelector(state => state.auth)
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [records, setRecords] = useState([])

    const [showForm, setShowForm] = useState(false)


    useEffect(() => {
        if (user.sub) {
            setIsLoading(true)
            axios.get(`${process.env.REACT_APP_API_USER}/field-force/users/admin/list/admin-list/${user.sub}/${user.company_id}`)
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


    const deleteUser = (id) => {
        axios.delete(`${process.env.REACT_APP_API_USER}/api/v1/field-force/users/admin/remove/` + id)
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
            setUsers(records.filter(x => x.email.includes(val)))

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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: email =>
                <span>{email ? email : "N/A"}</span>
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm onConfirm={() => deleteUser(record.id)} title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                        <Button className='d-center' icon={<DeleteOutlined />} danger></Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ];


    const AdminList = () => (
        <Card title={<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Company Manager List</span>
            <Button onClick={()=>setShowForm(true)} type='primary' icon={<PlusOutlined />} className='d_center'>Add Company Manager</Button>
        </div>}>
            <Search
                placeholder="email"
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
                <CompanyManagerForm handleBack={()=>handleBack()} />:
                <AdminList  />

             }
        </>
    )
}

export default CompanyAdminList
