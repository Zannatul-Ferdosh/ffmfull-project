import React, { useState ,useEffect} from 'react'
import { Card, Input, Button, Alert } from 'antd';
import axios from 'axios'
import { useSelector } from 'react-redux'
import validator from 'validator'
import { useHistory } from 'react-router-dom'

function SuperAdminCompanyForm({ handleBack ,selectedCompany}) {
    const history = useHistory()
    const { user } = useSelector(state => state.auth)
    const [errors, setErrors] = useState([])
    const [errorMessage, setErrorMessage] = useState([])

    const [isLoading, setIsloading] = useState(false)

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [aggrementFile, setAggrementFile] = useState('')
    const [verificationFile, setVerificationFile] = useState('')
    const [tin, setTin] = useState('')

    const [editId, setEditId] = useState(null)


    const formValidator = (name, address, aggrementFile, verificationFile, tin) => {
        let error = {}


        if (!name) {
            error.name = 'Please provide company name'
        } 
        

        if (!address) {
            error.address = 'Please provide a company address'
        }

        if (!aggrementFile) {
            error.aggrementFile = 'Please select a file'
        }
        if (!verificationFile) {
            error.verificationFile = 'Please provide a file'
        }
        if (!tin) {
            error.tin = 'Please provide Tin number'
        }

        return {
            error,
            isError: Object.keys(error).length == 0
        }
    }

    useEffect(() => {
        if(selectedCompany){
            setName(selectedCompany.name)
            setAddress(selectedCompany.address)
            setTin(selectedCompany.tin)
            setEditId(selectedCompany.id)
        }
    }, [selectedCompany])


    const addCompany = () => {
        const validate = formValidator(name, address, aggrementFile, verificationFile, tin)
        console.log(validate);

        if (!validate.isError) {
            return setErrors(validate.error)
        }
        setIsloading(true)

        //   let formData = new FormData()
        //   formData.append('name',name)
        //   formData.append('address',address)
        //   formData.append('tin',tin)
        //   formData.append('verification_file',verificationFile)
        //   formData.append('agreement_file',aggrementFile)

          let data ={
              name,
              address,
              tin
          }

        axios.post(`${process.env.REACT_APP_API_USER}/field-force/users/superadmin/company/create`, data)
            .then(res => {
                setIsloading(false)
                //handleBack()
                handleClear()
                history.push('/super-admin-company')
            })
            .catch(err => {
                setIsloading(false)
                err && err.response && setErrorMessage(Array.isArray(err.response.data?.message) ? err.response.data?.message : [err.response.data?.message])
                console.log(err);
            })
    }

    const updateCompany=(id)=>{
          let formData = new FormData()
          formData.append('name',name)
          formData.append('address',address)
          formData.append('tin',tin)
          formData.append('verification_file',verificationFile)
          formData.append('agreement_file',aggrementFile)
        axios.put(`${process.env.REACT_APP_API_USER}/field-force/users/superadmin/company/update/`+id, formData)
        .then(res => {
            setIsloading(false)
            handleBack()
            handleClear()
        })
        .catch(err => {
            setIsloading(false)
            err && err.response && setErrorMessage(Array.isArray(err.response.data?.message) ? err.response.data?.message : [err.response.data?.message])
            console.log(err);
        })
    }

    const handleClear = () => {
        setName('')
        setAddress("")
        setAggrementFile("")
        setVerificationFile('')
        setTin('')
        setErrors([])
        setErrorMessage([])
    }
    return (
        <div className='admin_form'>
            <Card title={editId?"Update Company":"Add New Company"} >

                {
                    errorMessage.length > 0 &&
                    errorMessage.map((message, index) => (
                        <Alert style={{ marginBottom: "5px" }} key={index} message={message} type="error" showIcon />
                    ))
                }

                <div className='input_item'>
                    <label>Company Name<span className='required'>*</span></label>
                    <div className='width_100'>
                        <Input
                            className={errors && errors.name && 'error'}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter company name' />
                        {errors && errors.name && <span className='error_text'>{errors.name}</span>}

                    </div>

                </div>

                <div className='input_item'>
                    <label>Company Address <span className='required'>*</span></label>
                    <div className='width_100'>
                        <Input
                            className={errors && errors.address && 'error'}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder='Enter company address' />
                        {errors && errors.address && <span className='error_text'>{errors.address}</span>}
                    </div>

                </div>
                <div className='input_item'>
                    <label>
                        Company Agreement File{" "}
                        <span className='required'>(PDF only)*</span>
                    </label>
                    <div className='width_100'>
                        <Input
                            type='file'
                            accept="application/pdf"
                            className={errors && errors.aggrementFile && 'error'}
                            onChange={(e) => setAggrementFile(e.target.files[0])} />
                        {errors && errors.aggrementFile && <span className='error_text'>{errors.aggrementFile}</span>}
                    </div>

                </div>
                <div className='input_item'>
                    <label>
                        Verification File{" "}
                        <span className='required'>(PDF only)*</span>
                    </label>
                    <div className='width_100'>
                        <Input
                            type='file'
                            accept="application/pdf"
                            className={errors && errors.verificationFile && 'error'}
                            onChange={(e) => setVerificationFile(e.target.files[0])}/>
                        {errors && errors.verificationFile && <span className='error_text'>{errors.verificationFile}</span>}
                    </div>

                </div>
                <div className='input_item'>
                    <label> Company Tin Number <span className='required'>*</span></label>
                    <div className='width_100'>
                        <Input
                            type='text'
                            className={errors && errors.tin && 'error'}
                            value={tin}
                            onChange={(e) => setTin(e.target.value)}
                            placeholder='Enter Tin number' />
                        {errors && errors.tin && <span className='error_text'>{errors.tin}</span>}
                    </div>

                </div>

                <div style={{ float: "right" }}>
                    <Button onClick={handleBack} danger type='primary' style={{ marginRight: "10px" }}>Back</Button>
                    
                    {
                        editId ?
                        <Button onClick={() => updateCompany(editId)} loading={isLoading} type='primary'>Update</Button>:
                        <Button onClick={() => addCompany()} loading={isLoading} type='primary'>Add</Button>
                    }
                </div>
            </Card>
        </div>
    )
}

export default SuperAdminCompanyForm
