import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Card, Button, Table, Space, Image, Switch, Popconfirm, Tag, Input, Modal, Alert, Select, DatePicker } from 'antd';
import { PlusOutlined, DeleteOutlined, QuestionCircleOutlined, EditOutlined } from '@ant-design/icons'
import MapRender from '../../components/Map/OpenStreet'
import moment from 'moment'
const { Option } = Select


function AttendenceForm() {
    const { user } = useSelector(state => state.auth)
    const [errors, setErrors] = useState([])
    const [errorMessage, setErrorMessage] = useState([])

    const [isLoading, setIsloading] = useState(false)
    const [users, setUsers] = useState([])

    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [latlong, setLatlong] = useState('')
    const [attendenceTime, setAttendenceTime] = useState('')
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
        setAttendenceTime(string)
    }


    const formValidator = (title, address, latlong, attendenceTime, selectedUser) => {
        let error = {}
        if (!title) {
            error.title = 'Please provide a title'
        }

        if (!address) {
            error.address = 'Please provide address'
        }

        if (!latlong) {
            error.latlong = 'Please provide latitude and longitude'
        } else if (!latlong.split(',')[0]) {
            error.latlong = 'Please provide latitude'
        } else if (!latlong.split(',')[1]) {
            error.latlong = 'Please provide longitude'
        }

        if (!attendenceTime) {
            error.attendenceTime = 'Please provide a attendence time'
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
        const validate = formValidator(title, address, latlong, attendenceTime, selectedUser)

        if (!validate.isError) {
            return setErrors(validate.error)
        }

        setIsloading(true)
        const data = {
            title,
            assigned_time:moment(attendenceTime).toISOString(),
            assigned_location_lattitude: latlong.split(',')[0],
            assigned_location_longitude: latlong.split(',')[1],
            address,
            user_id: parseInt(selectedUser),
            admin_id:user.sub,
            attendence_status: false,
        }
        axios.post(`${process.env.REACT_APP_API_ATTENDENCE}/field-force/attendence/attendences`, data)
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
        setLatlong('')
        setAddress('')
        setAttendenceTime('')

        setErrors([])
        setErrorMessage([])
    }
    return (
        <div>
            <Card title="Assign attendance" >

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
                        {errors && errors.attendenceTime && <span className='error_text'>{errors.attendenceTime}</span>}

                    </div>
                </div>


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
                    <label>Select Employee <span className='required'>*</span></label>
                    <div className='width_100'>
                        <Select
                            style={{ width: "100%" }}
                            placeholder="select an option"
                            onChange={(value) => setSelectedUser(value)}
                            value={selectedUser}
                        >
                            <Option value=''>Select an employee</Option>
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
                    <Button onClick={() => saveTask()} loading={isLoading} type='primary'>Save Attendence</Button>
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

export default AttendenceForm
