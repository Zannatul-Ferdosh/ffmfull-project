import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Card, Button, Table, Space, Image, Switch, Popconfirm, Tag, Input, Modal,DatePicker } from 'antd';
import { PlusOutlined ,EyeOutlined } from '@ant-design/icons'
import moment from 'moment'
import {useHistory} from 'react-router-dom'
const Search = Input.Search;

function ServiceList() {
    let history = useHistory()
    const { user } = useSelector(state => state.auth)
    const [isLoading, setIsLoading] = useState(false)
    const [services, setServices] = useState([])

    const [showForm, setShowForm] = useState(false)



    useEffect(() => {
        if (user.sub) {
            setIsLoading(true)
            axios.get(`${process.env.REACT_APP_API_USER}/field-force/users/admin/company/service-list/${user.company_id}`)
                .then(res => {
      
                    setServices( res.data.data );
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



    const columns = [

        {
            title: 'ID',
            key: 'service_id',
            render: (service_id) =>
            <span>{service_id}</span>,
        },
        {
            title: 'Service Name',
            dataIndex: 'service_name',
            key: 'service_name',
            render: (service_name) =>
                <span>{service_name}</span>
        },
    ];


    const ServiceList = () => (
        <Card title={<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span> Company Service List</span>
            {/* <Button onClick={()=>history.push('/task/assign-task')} type='primary' icon={<PlusOutlined />} className='d_center'>Add Task</Button> */}
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
 
                <ServiceList  />

        </>
    )
}

export default ServiceList
