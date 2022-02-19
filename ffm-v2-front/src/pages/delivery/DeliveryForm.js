import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Card, Button, Table, Space, Image, Switch, Popconfirm, Tag, Input, Modal, Alert, Select, DatePicker } from 'antd';
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined, EditOutlined } from '@ant-design/icons'
import MapRender from '../../components/Map/OpenStreet'
import moment from 'moment';
const { Option } = Select


function AssignDelivery() {
    const { user } = useSelector(state => state.auth)
    const [errors, setErrors] = useState([])
    const [errorMessage, setErrorMessage] = useState([])

    const [isLoading, setIsloading] = useState(false)
    const [users, setUsers] = useState([])

    const [title, setTitle] = useState('')
    const [isPaid, setIsPaid] = useState('')
    const [amount, setAmount] = useState(0)
    const [address, setAddress] = useState('')
    const [name, setName] = useState('')
    const [latlong, setLatlong] = useState('')
    const [deliveryTime, setDeliveryTime] = useState('')
    const [selectedUser, setSelectedUser] = useState('')

    useEffect(() => {
        if (user.company_id) {
            axios
                .get(`${process.env.REACT_APP_API_USER}/field-force/users/admin/user/list/${user.company_id}`)
                .then((res) => {
                    setUsers(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    }, [user])

    const onDateChange = (value, string) => {
        setDeliveryTime(string)
    }


    const formValidator = (title, isPaid, address, name, latlong, deliveryTime, selectedUser) => {
        let error = {}
        if (!title) {
            error.title = 'Please provide a title'
        }
        if (!isPaid) {
            error.isPaid = 'Please select an option'
        }

        if (!address) {
            error.address = 'Please provide address'
        }
        if (!name) {
            error.name = 'Please provide name'
        }

        if (!latlong) {
            error.latlong = 'Please provide latitude and longitude'
        } else if (!latlong.split(',')[0]) {
            error.latlong = 'Please provide latitude'
        } else if (!latlong.split(',')[1]) {
            error.latlong = 'Please provide longitude'
        }

        if (!deliveryTime) {
            error.deliveryTime = 'Please provide a delivery Time'
        }
        if (!selectedUser) {
            error.selectedUser = 'Please select an user'
        }


        return {
            error,
            isError: Object.keys(error).length == 0
        }
    }



    const saveTask = () => {
        const validate = formValidator(title, isPaid, address, name, latlong, deliveryTime, selectedUser)

        if (!validate.isError) {
            return setErrors(validate.error)
        }

        setIsloading(true)
        const data = {
            title,
            assigned_delivery_time: moment(deliveryTime).toISOString(),
            assigned_location_lattitude:  latlong.split(',')[0],
            assigned_location_longitude:latlong.split(',')[1],
            client_address: address,
            client_name: name,
            user_id:  Number(selectedUser),
            admin_id:  user.sub,
            is_paid:isPaid == 'Yes' ? true : false,
            bill_amount:isPaid == 'Yes' ? amount : 0,
        }
        axios.post(`${process.env.REACT_APP_API_DELIVERY}/field-force/delivery/deliveries`, data)
            .then(res => {
                const resp = res.data;
                console.log(resp);
                setIsloading(false)
                clearFields()
            }).catch(err => {
                setErrors([])
                setIsloading(false)
                err && err.response && setErrorMessage(Array.isArray(err.response.data?.message) ? err.response.data?.message : [err.response.data?.message])
            });
    }

    const clearFields = () => {
        setTitle('')
        setIsPaid('')
        setAmount(0)
        setLatlong('')
        setAddress('')
        setDeliveryTime('')
        setName('')
        setErrors([])
        setErrorMessage([])
    }
    return (
        <div>
            <Card title="Assign Delivery" >

                {
                    errorMessage.length > 0 &&
                    errorMessage.map((message, index) => (
                        <Alert style={{ marginBottom: "5px" }} key={index} message={message} type="error" showIcon />
                    ))
                }

                <div className='input_item'>
                    <label>Title <span className='required'>*</span></label>
                    <div className='width_100'>
                        <Input
                            className={errors && errors.title && 'error'}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Enter title' />
                        {errors && errors.title && <span className='error_text'>{errors.title}</span>}

                    </div>
                </div>

                <div className='input_item'>
                    <label>Assigned Time <span className='required'>*</span></label>
                    <div className='width_100'>
                        {/* <Input
                            className={errors && errors.firstname && 'error'}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder='Enter title' /> */}
                        <DatePicker showTime onChange={onDateChange} onOk={null} />
                        {errors && errors.deliveryTime && <span className='error_text'>{errors.deliveryTime}</span>}

                    </div>
                </div>

                <div className='input_item'>
                    <label>Paid Task <span className='required'>*</span></label>
                    <div className='width_100'>
                        <Select
                            style={{ width: "100%" }}
                            placeholder="select an option"
                            onChange={(value) => setIsPaid(value)}
                            value={isPaid}
                        >
                            <Option value=''>Select an option</Option>
                            <Option value="yes">Yes</Option>
                            <Option value="no">No</Option>
                        </Select>
                        {errors && errors.isPaid && <span className='error_text'>{errors.isPaid}</span>}

                    </div>
                </div>

                {
                    isPaid === 'yes' &&
                    <div className='input_item'>
                        <label>Bill Amount <span className='required'>*</span></label>
                        <div className='width_100'>
                            <Input
                                type='number'
                                className={errors && errors.amount && 'error'}
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder='Enter title' />
                            {errors && errors.amount && <span className='error_text'>{errors.amount}</span>}

                        </div>
                    </div>
                }

                <div className='input_item'>
                    <label>Lat-Long <span className='required'>*</span></label>
                    <div className='width_100'>
                        <Input
                            className={errors && errors.latlong && 'error'}
                            value={latlong}
                            onChange={(e) => setLatlong(e.target.value)}
                            style={{ marginBottom: "10px" }}
                            placeholder='Enter Lat-Long' />
                        {errors && errors.latlong && <span style={{ marginBottom: "10px" }} className='error_text'>{errors.latlong}</span>}
                        <MapRender onMarkerChange={(val) => setLatlong(val)} />
                    </div>
                </div>

                <div className='input_item'>
                    <label>Address <span className='required'>*</span></label>
                    <div className='width_100'>
                        <Input
                            className={errors && errors.address && 'error'}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder='Enter address' />
                        {errors && errors.address && <span className='error_text'>{errors.address}</span>}

                    </div>
                </div>

                <div className='input_item'>
                    <label>Client Name <span className='required'>*</span></label>
                    <div className='width_100'>
                        <Input
                            className={errors && errors.name && 'error'}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter Name' />
                        {errors && errors.name && <span className='error_text'>{errors.name}</span>}

                    </div>
                </div>




                <div className='input_item'>
                    <label>Select User <span className='required'>*</span></label>
                    <div className='width_100'>
                        <Select
                            style={{ width: "100%" }}
                            placeholder="select an option"
                            onChange={(value) => setSelectedUser(value)}
                            value={selectedUser}
                        >
                            <Option value=''>Select an user</Option>
                            {
                                users.map((user, index) => (
                                    <option key={index} value={user.id}>{`${user.first_name == '' ? 'No Name' : user.first_name}: ${user.phone_number}`}</option>
                                ))
                            }
                        </Select>
                        {errors && errors.selectedUser && <span className='error_text'>{errors.selectedUser}</span>}

                    </div>
                </div>



                <div style={{ float: "right" }}>
                    <Button onClick={null} danger type='primary' style={{ marginRight: "10px" }}>Back</Button>
                    <Button onClick={() => saveTask()} loading={isLoading} type='primary'>Save</Button>
                    {/* {
                        editId ?
                            <Button onClick={() => updateUser(editId)} loading={isLoading} type='primary'>Update</Button> :
                            <Button onClick={() => addUser()} loading={isLoading} type='primary'>Add</Button>

                    } */}
                </div>
            </Card>
        </div>
    )
}

export default AssignDelivery
