import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'
import { Card, Button, Table, Space, Image, Switch, Popconfirm, Tag, Input, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import SuperAdminForm from './RegisterOtMember';
const Search = Input.Search;

function OtMemberList() {
    let history = useHistory()
    const { user } = useSelector(state => state.auth)
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [superAdmins, setSuperAdmins] = useState([])
    const [records, setRecords] = useState([])

    const [showForm, setShowForm] = useState(false)


    useEffect(() => {
        if (user.sub) {
            setIsLoading(true)
            axios.get(`${process.env.REACT_APP_API_USER}/field-force/users/superadmin/list/superadmin-list/${user.sub}`)
                .then(res => {
                    setSuperAdmins(res.data.data);
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
        axios.delete('/api/v1/field-force/users/superadmin/remove/' + id)
            .then(res => {
                setSuperAdmins(prev => (prev.filter((item) => item.id !== id)))
                setRecords(prev => (prev.filter((item) => item.id !== id)))
            }).catch(err => {
                console.log(err);
            });
    }


    const handleSearch = val => {

        if (val == "")
            setSuperAdmins(records);
        else
            setSuperAdmins(records.filter(x => x.email.includes(val)))

    }


    const columns = [

        {
            title: 'SL No',
            key: 'index',
            render: (text, record, index) => (page - 1) * 10 + (index+1),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name, superadmin) =>
                <span>{superadmin.first_name} {superadmin.last_name}</span>
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
            <span>FFM OT Member List</span>
            <Button onClick={()=>history.push('/register-ot-member')} type='primary' icon={<PlusOutlined />} className='d_center'>Add OT member</Button>
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
                dataSource={superAdmins}
                pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'], showQuickJumper: true,onChange(current){setPage(current)} }}
            />

        </Card>
    )
    return (
        <>
            {
                showForm ?
                <SuperAdminForm handleBack={()=>handleBack()} />:
                <AdminList  />

             }
        </>
    )
}

export default OtMemberList
