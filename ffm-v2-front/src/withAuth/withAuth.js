import React, { Component } from "react";
import { Spin } from 'antd';
import Cookies from "js-cookie";
import axios from "axios";
import jwt from 'jwt-decode'


import store from "../store/index";

const configureAxiosHeader = () => {
   // axios.defaults.baseURL = process.env.REACT_APP_API
  const token = Cookies.get("ffm_token");
  axios.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
  };
};

const withAuth = (AuthComponent) => {
  return class Authenticated extends Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
      };
    }

    componentDidMount() {
     
      configureAxiosHeader();
      const token = Cookies.get("ffm_token");
      if(token){

        this.setState({ isLoading: true });
        axios
          .get(`${process.env.REACT_APP_API_AUTH}/field-force/auth/authenticate-dashboard-user`, {})
          .then((res) => {
            if (res.data.status === 'success') {
              //do some change state
              this.setState({ isLoading: false });
              store.dispatch({
                  type:"SET_USER",
                  payload:jwt(token)
              })
              if(window.location.pathname == '/'){
                window.location.pathname = '/user-dashboard'
             
            }
            }
          })
          .catch((err) => {
              this.setState({ isLoading: false });
            Cookies.remove("ffm_token");
            console.log(err.message);
            store.dispatch({
                type:"LOGOUT"
            })
            if(window.location.pathname !== '/'){
             
                //window.location.pathname='/login'

            }
            
          });
      }else{
        this.setState({ isLoading: false });
  
        if(window.location.pathname !== '/'){
            if(window.location.pathname === '/register'){
             return
            }else{
              window.location.pathname='/'
            }
         
        }
      }
     
    }

    render() {
      return (
        <div>
          {this.state.isLoading ? (
            <div style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}><Spin size={'large'}/></div>
          ) : (
            <AuthComponent {...this.props} userData={this.state.userData} />
          )}
        </div>
      );
    }
  };
};
export default withAuth;
