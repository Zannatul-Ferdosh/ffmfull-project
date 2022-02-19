import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Card, Button, Table, Space, Image, Switch, Popconfirm, Tag, Input, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined,EditOutlined } from '@ant-design/icons'
import SuperAdminCompanyForm from './SuperAdminCompanyForm';
import moment from 'moment'
import {useHistory} from 'react-router-dom'
const Search = Input.Search;

function ListSuperAdminCompany() {
    let history = useHistory()
    const { user } = useSelector(state => state.auth)
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [companies, setCompanies] = useState([])
    const [records, setRecords] = useState([])

    const [showForm, setShowForm] = useState(false)

    const [selectedCompany, setSelectedCompany] = useState(null)


    useEffect(() => {
        if (user.sub) {
            setIsLoading(true)
            axios.get(`${process.env.REACT_APP_API_USER}/field-force/users/superadmin/company/list`)
                .then(res => {
                    setCompanies(res.data.data);
                    //setRecords(res.data.data);
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

    const handleSelectToEdit=(campany)=>{
        setSelectedCompany(campany)
        setShowForm(true)
    }



    const deleteCompany = (id) => {
        axios.delete(`${process.env.REACT_APP_API_USER}/field-force/users/superadmin/company/remove/` + id)
            .then(res => {
                setCompanies(prev => (prev.filter((item) => item.id !== id)))
                //setRecords(prev => (prev.filter((item) => item.id !== id)))
            }).catch(err => {
                console.log(err);
            });
    }


    // const handleSearch = val => {

    //     if (val == "")
    //         setUsers(records);
    //     else
    //         setUsers(records.filter(x => x.phone_number.includes(val)))

    // }


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
            render: (name) =>
                <span>{name}</span>
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (address) =>
                <span>{address}</span>
        },
        {
            title: 'TIN',
            dataIndex: 'tin',
            key: 'tin',
            render: (tin) =>
                <span>{tin}</span>
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() =>handleSelectToEdit(record)} className='d-center' type='primary' icon={<EditOutlined />}></Button>
                    <Popconfirm onConfirm={() => deleteCompany(record.id)} title="Are you sure？" icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                        <Button className='d-center' icon={<DeleteOutlined />} danger></Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ];


    const AdminList = () => (
        <Card title={<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Company List</span>
            <Button onClick={()=>history.push('/add-company-user')} type='primary' icon={<PlusOutlined />} className='d_center'>Add User</Button>
        </div>}>
            {/* <Search
                placeholder="Enter Contact"
                onSearch={handleSearch}
                style={{ width: 200 }}
            /> */}
            <Table
                rowKey="_id"
                loading={isLoading}
                columns={columns}
                dataSource={companies}
                pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'], showQuickJumper: true,onChange(current){setPage(current)} }}
            />

        </Card>
    )
    return (
        <>
            {
                showForm ?
                <SuperAdminCompanyForm selectedCompany={selectedCompany} handleBack={()=>handleBack()} />:
                <AdminList  />

             }
        </>
    )
}

export default ListSuperAdminCompany
