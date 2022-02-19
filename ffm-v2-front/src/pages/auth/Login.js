import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Form, Input, Button, Checkbox,Alert } from 'antd';
import './auth.scss'
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

function Login() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const onFinish = (values) => {
    setLoading(true)
      axios.post(`${process.env.REACT_APP_API_AUTH}/field-force/auth/dashboard-user-login`,values)
      .then(res=>{
        setLoading(false)
        console.log( res.data);
        if(res.data.status === 'success'){
          Cookies.set("ffm_token", res.data.auth_token);
          
            window.location.pathname = '/user-dashboard'
        
      }
      })
      .catch(err=>{
        setLoading(false)
        setError(err && err.response && err.response.data);
        //console.log(err && err.response && err.response.data);
      })
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onCloseAlert=()=>{
      setError(null)
  }



  return (
    <div className="auth_container">
    <div className="auth">
      <div className='mb-3'>
        {
          error && error.message && <Alert
            message={error.message}
            type="error"
            closable
            onClose={onCloseAlert}
            style={{marginBottom:"10px"}}
          />
        }
      </div>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          className="label mb-3"
          validateStatus={error && error.email ? "error" : "succcess"}
          help={error && error.email ? error.email : null}

        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          className="label"
          validateStatus={error && error.password ? "error" : "succcess"}
          help={error && error.password ? error.password : null}
        >
          <Input.Password />
        </Form.Item>



        <div style={{textAlign:"center"}}>
          <Button style={{margin:"10px 0"}} loading={loading} className="primary_btn" type="primary" htmlType="submit">
            Login
    </Button>
          {/* <span className='register'> Dont't have an account ? <Link href="/auth/register"><a>register now!</a></Link></span> */}
        </div>
      </Form>
    </div>
    </div>
  )
}

export default Login
