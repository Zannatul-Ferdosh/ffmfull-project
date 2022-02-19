import React, { useState,useEffect } from 'react'
import { Card, Input, TreeSelect, Select, Switch, Button, Alert } from 'antd';
import axios from 'axios'
import { useSelector } from 'react-redux'
import validator from 'validator'
import {useHistory} from 'react-router-dom'
const {Option} = Select

// company_id: 70
// createdAt: "2021-05-05T16:31:34.019Z"
// department: "IT Software Development"
// designation: "Test Lead"
// email: null
// first_name: "Pranto"
// id: 5
// last_name: "Mazumder"
// member_type: 3
// nid: "123456"
// phone_number: "01629111902"
// profile_photo: "https://randomuser.me/api/portraits/lego/5.jpg"
// registered_on: "2021-05-05T16:31:34.019Z"
// updatedAt: "2021-05-05T16:31:34.019Z"

function UserForm({ handleBack ,selectedUser}) {
    let history = useHistory()
    const { user } = useSelector(state => state.auth)
    const [errors, setErrors] = useState([])
    const [errorMessage, setErrorMessage] = useState([])

    const [isLoading, setIsloading] = useState(false)

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [iso, setIso] = useState('BD')
    const [phone, setPhone] = useState('')
    const [department, setDepartment] = useState('')
    const [designation, setDesignation] = useState('')
    const [nid, setNid] = useState('')

    const [editId, setEditId] = useState(null)


    const formValidator = (firstname, lastname,phone,department,designation,nid) => {
        let error = {}
        if (!firstname) {
            error.firstname = 'Please provide a first name'
        }
        if (!lastname) {
            error.lastname = 'Please provide a last name'
        }

        if (!phone) {
            error.phone = 'Please provide your Phone number'
        }

        if (!department) {
            error.department = 'Please provide a department'
        }

        if (!designation) {
            error.designation = 'Please provide a designation'
        }
        if (!nid) {
            error.nid = 'Please provide NID'
        }
        

        return {
            error,
            isError: Object.keys(error).length == 0
        }
    }

    useEffect(() => {
        if(selectedUser){
            setFirstname(selectedUser.first_name)
            setLastname(selectedUser.last_name)
            setIso(selectedUser?.iso_code||"BD")
            setPhone(selectedUser.phone_number)
            setDesignation(selectedUser.designation)
            setDepartment(selectedUser.department)
            setNid(selectedUser.nid)
            setEditId(selectedUser.id)
        }
    }, [selectedUser])


    const addUser = () => {
        const validate = formValidator(firstname, lastname,phone,department,designation,nid)

        if (!validate.isError) {
            return setErrors(validate.error)
        }


        setIsloading(true)
        const data = {
            first_name: firstname,
            last_name:lastname,
            phone_number:phone,
            department:department,
            designation:designation,
            nid:nid,
            company_id:user.company_id,
            iso_code : iso          

        };

        axios.post(`${process.env.REACT_APP_API_AUTH}/field-force/auth/register-user`, data)
            .then(res => {
                setIsloading(false)
                handleClear()
                history.push('/company-field-employee-list')
            })
            .catch(err => {
                setIsloading(false)
                err && err.response && setErrorMessage(Array.isArray(err.response.data?.message)?err.response.data?.message:[err.response.data?.message])
                console.log(err);
            })
    }

    const updateUser=(id)=>{
        const validate = formValidator(firstname, lastname,phone,department,designation,nid)

        if (!validate.isError) {
            return setErrors(validate.error)
        }


        setIsloading(true)
        const data = {
            first_name: firstname,
            last_name:lastname,
            phone_number:phone,
            department:department,
            designation:designation,
            nid:nid,
            company_id:user.company_id,
            iso_code : iso          

        };

        axios.put(`${process.env.REACT_APP_API_USER}/field-force/users/admin/user/update/${id}`, data)
            .then(res => {
                setIsloading(false)
                handleClear()
                handleBack()
            })
            .catch(err => {
                setIsloading(false)
                err && err.response && setErrorMessage(Array.isArray(err.response.data?.message)?err.response.data?.message:[err.response.data?.message])
                console.log(err);
            })
    }

    const handleClear = () => {
        setFirstname('')
        setLastname("")
        setIso("BD")
        setPhone('')
        setDepartment('')
        setDesignation('')
        setNid('')
        setEditId(null)
        setErrors([])
        setErrorMessage([])
    }
    return (
        <div className='admin_form'>
            <Card title={editId ? "Update Field Employee":"Add Field Employee"} >

                {
                    errorMessage.length > 0 &&
                    errorMessage.map((message, index) => (
                        <Alert style={{ marginBottom: "5px" }} key={index} message={message} type="error" showIcon />
                    ))
                }

                <div className='input_item'>
                    <label>First Name <span className='required'>*</span></label>
                    <div className='width_100'>
                        <Input
                            className={errors && errors.firstname && 'error'}
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            placeholder='Enter first name' />
                        {errors && errors.firstname && <span className='error_text'>{errors.firstname}</span>}

                    </div>

                </div>

                <div className='input_item'>
                    <label>Last Name <span className='required'>*</span></label>
                    <div className='width_100'>
                        <Input
                            className={errors && errors.lastname && 'error'}
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            placeholder='Enter last name' />
                        {errors && errors.lastname && <span className='error_text'>{errors.lastname}</span>}
                    </div>

                </div>

                <div className='input_item'>
                        <label>Phone Number </label>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <Select
                                style={{ width: "25%" }}
                                placeholder="select ISO Code"
                                optionFilterProp="children"
                                onChange={(value) => setIso(value)}
                                value={iso}
                            >
                                <Option value="BD">BD  +88</Option>
                            </Select>
                            <div style={{width:"70%"}}>
                            <Input  
                            className={errors && errors.phone && 'error'}
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                            style={{ width: "100%" }} 
                            placeholder='Enter phone Number' 
                            type='number' />
                            {errors && errors.phone && <span className='error_text'>{errors.phone}</span>}
                            </div>
                           
                        </div>

                    </div>


                <div className='input_item'>
                    <label>Department <span className='required'>*</span></label>
                    <div className='width_100'>
                        <Input
                            type='text'
                            className={errors && errors.department && 'error'}
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            placeholder='Enter department' />
                        {errors && errors.department && <span className='error_text'>{errors.department}</span>}
                    </div>

                </div>
                <div className='input_item'>
                    <label>Designation <span className='required'>*</span></label>
                    <div className='width_100'>
                        <Input
                            type='text'
                            className={errors && errors.designation && 'error'}
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            placeholder='Enter designation' />
                        {errors && errors.designation && <span className='error_text'>{errors.designation}</span>}
                    </div>

                </div>
                <div className='input_item'>
                    <label>NID <span className='required'>*</span></label>
                    <div className='width_100'>
                        <Input
                            type='text'
                            className={errors && errors.nid && 'error'}
                            value={nid}
                            onChange={(e) => setNid(e.target.value)}
                            placeholder='Enter NID' />
                        {errors && errors.nid && <span className='error_text'>{errors.nid}</span>}
                    </div>

                </div>

                <div style={{ float: "right" }}>
                    <Button onClick={handleBack} danger type='primary' style={{ marginRight: "10px" }}>Back</Button>
                    {
                        editId ?
                        <Button onClick={() => updateUser(editId)} loading={isLoading} type='primary'>Update</Button>:
                        <Button onClick={() => addUser()} loading={isLoading} type='primary'>Add</Button>

                    }
                </div>
            </Card>
        </div>
    )
}

export default UserForm
