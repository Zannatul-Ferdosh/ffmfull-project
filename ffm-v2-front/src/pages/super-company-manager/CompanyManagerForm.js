import React, { useState, useEffect } from 'react'
import { Card, Input, Button, Alert, Select } from 'antd';
import axios from 'axios'
import { useSelector } from 'react-redux'
import validator from 'validator'
import { useHistory } from 'react-router-dom'

const { Option } = Select

function CompanyAdminForm({ handleBack }) {
    const history = useHistory()
    const { user } = useSelector(state => state.auth)
    const [errors, setErrors] = useState([])
    const [errorMessage, setErrorMessage] = useState([])

    const [isLoading, setIsloading] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPasssword] = useState('')
    const [username, setUsername] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [company, setCompany] = useState('')

    const [companies, setCompanies] = useState([])


    const formValidator = (email, password, username, firstname, lastname,company) => {
        let error = {}


        if (!email) {
            error.email = 'Please provide your email address'
        } else if (!validator.isEmail(email)) {
            error.email = 'Invalid email address'
        }

        if (!password) {
            error.password = 'Please provide a password'
        }

        if (!username) {
            error.username = 'Please provide a username'
        }
        if (!firstname) {
            error.firstname = 'Please provide a first name'
        }
        if (!lastname) {
            error.lastname = 'Please provide a last name'
        }
        if (!company) {
            error.company = 'Please provide an company'
        }

        return {
            error,
            isError: Object.keys(error).length == 0
        }
    }

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_AUTH}/field-force/auth/get-company-list`)
            .then((res) => {
                setCompanies(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])


    const addAdmin = () => {
        const validate = formValidator(email, password, username, firstname, lastname,company)
        console.log(validate);

        if (!validate.isError) {
            return setErrors(validate.error)
        }


        setIsloading(true)
        const data = {
            email,
            password,
            username,
            firstname,
            lastname,
            company_id: company,
            member_type: 2,

        };

        axios.post(`${process.env.REACT_APP_API_AUTH}/field-force/auth/register-dashboard-user`, data)
            .then(res => {
                setIsloading(false)
                //handleBack()
                handleClear()
                history.push('/list-company-admin')
            })
            .catch(err => {
                setIsloading(false)
                err && err.response && setErrorMessage(Array.isArray(err.response.data?.message) ? err.response.data?.message : [err.response.data?.message])
                console.log(err);
            })
    }

    const handleClear = () => {
        setEmail('')
        setFirstname("")
        setLastname("")
        setUsername('')
        setPasssword('')
        setCompany("")
        setErrors([])
        setErrorMessage([])
    }
    return (
        <div className='admin_form'>
            <Card title="Register Manager" >

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
                    <label>Email <span className='required'>*</span></label>
                    <div className='width_100'>
                        <Input
                            type='email'
                            className={errors && errors.email && 'error'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter email' />
                        {errors && errors.email && <span className='error_text'>{errors.email}</span>}
                    </div>

                </div>
                <div className='input_item'>
                    <label>Username <span className='required'>*</span></label>
                    <div className='width_100'>
                        <Input
                            type='text'
                            className={errors && errors.username && 'error'}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Enter username' />
                        {errors && errors.username && <span className='error_text'>{errors.username}</span>}
                    </div>

                </div>
                <div className='input_item'>
                    <label>Password <span className='required'>*</span></label>
                    <div className='width_100'>
                        <Input
                            type='password'
                            className={errors && errors.password && 'error'}
                            value={password}
                            onChange={(e) => setPasssword(e.target.value)}
                            placeholder='Enter password' />
                        {errors && errors.password && <span className='error_text'>{errors.password}</span>}
                    </div>

                </div>

                <div className='input_item'>
                    <label>Company <span className='required'>*</span></label>
                    <div className='width_100'>
                        <Select
                            value={company}
                            onChange={val=>setCompany(val)}
                            style={{width:"100%"}}
                            showSearch={true}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                        >
                            <Option value=''>Select an option</Option>
                            {companies?.map((company) => {
                                return <Option value={company.id}>{company.name}</Option>;
                            })}
                        </Select>
                        {errors && errors.company && <span className='error_text'>{errors.company}</span>}
                    </div>

                </div>

                <div style={{ float: "right" }}>
                    <Button onClick={()=>history.push('/list-company-admin')} danger type='primary' style={{ marginRight: "10px" }}>Back</Button>
                    <Button onClick={() => addAdmin()} loading={isLoading} type='primary'>Add</Button>
                </div>
            </Card>
        </div>
    )
}

export default CompanyAdminForm
