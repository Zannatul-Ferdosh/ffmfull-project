import React, { Component } from "react";
import Link from "next/link";
import "../css/style.bundle.css";
import "../css/aside.css";
import "../css/dark.css";
import "bootstrap/dist/css/bootstrap.css";
import { DropdownButton, Dropdown } from "react-bootstrap";
import axios from "axios";
import Router from "next/router";
import jwt_decode from 'jwt-decode';

class Menu extends Component {   
  constructor(props) {
      super(props);
      this.state = {
        user_type: 2,
        username :"",
      }
    }

    componentDidMount() {
      console.log(this.state)
      const token = localStorage.getItem('token');
      const decoded = jwt_decode(token);
      const user_type = decoded.member_type;
      this.setState({user_type: user_type});
      this.setState({username:localStorage.getItem("username")});

  }

   logOut = () => {

    console.log("am in logout");
    axios
      .get(
        "/api/v1/field-force/auth/logout-dashboard-user",{ headers: {
          'Authorization': `Basic ${localStorage.getItem('token')}`
        }})
      .then((response) => {
        localStorage.clear();
        Router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateSuperPassword =()=>{
 Router.push("/update-super-admin-password");
  }

  updateAdminPassword = ()=>{
    Router.push("/update-admin-password");

  }
   
  render() {

  return (
    <div className="kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-header--fixed kt-header-mobile--fixed kt-subheader--enabled kt-subheader--fixed kt-subheader--solid kt-aside--enabled kt-aside--fixed kt-page--loading">
      <div
        className="kt-aside  kt-aside--fixed  kt-grid__item kt-grid kt-grid--desktop kt-grid--hor-desktop"
        id="kt_aside"
      >
        <div className="kt-aside__brand kt-grid__item " id="kt_aside_brand">
          <div className="kt-aside__brand-logo">
            <h3><b>Field Force Admin panel</b></h3>
          </div>
        </div>

        <div
          className="kt-aside-menu-wrapper kt-grid__item kt-grid__item--fluid"
          id="kt_aside_menu_wrapper"
        >
          <div
            id="kt_aside_menu"
            className="kt-aside-menu "
            data-ktmenu-vertical="1"
            data-ktmenu-scroll="1"
            data-ktmenu-dropdown-timeout="500"
          >
            <ul className="kt-menu__nav ">
              <li className="kt-menu__item " aria-haspopup="true">
                <Link href="/user-dashboard">
                  <a className="kt-menu__link ">
                    <i className="kt-menu__link-icon flaticon-home"></i>
                    <span className="kt-menu__link-text">Dashboard</span>
                  </a>
                </Link>
              </li>
              {/* <li className="kt-menu__item " aria-haspopup="true">
                <Link href="/Company">
                  <a className="kt-menu__link ">
                    <i className="kt-menu__link-icon flaticon-home"></i>
                    <span className="kt-menu__link-text">Company </span>
                  </a>
                </Link>
              </li> */}

              {/* <li className="kt-menu__item " aria-haspopup="true">
                <Link href="/Services">
                  <a className="kt-menu__link ">
                    <i className="kt-menu__link-icon flaticon-home"></i>
                    <span className="kt-menu__link-text">Services</span>
                  </a>
                </Link>
            </li>*/}
              { this.state.user_type == 1 ? 
              <>
                {/* <li className="kt-menu__item " aria-haspopup="true">
                  <Link href="/SuperAdmin">
                    <a className="kt-menu__link ">
                      <i className="kt-menu__link-icon flaticon-home"></i>
                      <span className="kt-menu__link-text">Super Admin</span>
                    </a>
                  </Link>
                </li> */}
              <li className="kt-menu__item  kt-menu__item--submenu kt-menu__item--open kt-menu__item--here" aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><a href="javascript:;" className="kt-menu__link kt-menu__toggle"><i className="kt-menu__link-icon flaticon2-browser-2"></i><span className="kt-menu__link-text">Super Admin</span><i className="kt-menu__ver-arrow la la-angle-right"></i></a>
									<div className="kt-menu__submenu "><span className="kt-menu__arrow"></span>
										<ul className="kt-menu__subnav">
											<li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Companies</span></span></li>
											<li className="kt-menu__item " aria-haspopup="true"><a href="/super-admin" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text"> List Super Admin</span></a></li>
											<li className="kt-menu__item " aria-haspopup="true"><a href="/add-super-admin" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">Add Super Admin</span></a></li>
										</ul>
									</div>
								</li>

                <li className="kt-menu__item  kt-menu__item--submenu kt-menu__item--open kt-menu__item--here" aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><a href="javascript:;" className="kt-menu__link kt-menu__toggle"><i className="kt-menu__link-icon flaticon2-browser-2"></i><span className="kt-menu__link-text">Service Management</span><i className="kt-menu__ver-arrow la la-angle-right"></i></a>
									<div className="kt-menu__submenu "><span className="kt-menu__arrow"></span>
										<ul className="kt-menu__subnav">
											<li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Services</span></span></li>
											<li className="kt-menu__item " aria-haspopup="true"><a href="/services" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">  List Services </span></a></li>
											{/* <li className="kt-menu__item " aria-haspopup="true"><a href="/add-service" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">Add Services</span></a></li> */}
										</ul>
									</div>
								</li>

                <li className="kt-menu__item  kt-menu__item--submenu kt-menu__item--open kt-menu__item--here" aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><a href="javascript:;" className="kt-menu__link kt-menu__toggle"><i className="kt-menu__link-icon flaticon2-browser-2"></i><span className="kt-menu__link-text"> Company Management</span><i className="kt-menu__ver-arrow la la-angle-right"></i></a>
									<div className="kt-menu__submenu "><span className="kt-menu__arrow"></span>
										<ul className="kt-menu__subnav">
											<li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Services</span></span></li>
											<li className="kt-menu__item " aria-haspopup="true"><a href="/super-admin-company" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text"> List Companies</span></a></li>
											<li className="kt-menu__item " aria-haspopup="true"><a href="/add-super-admin-company" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">Add Companies</span></a></li>
										</ul>
									</div>
								</li>


                <li className="kt-menu__item  kt-menu__item--submenu kt-menu__item--open kt-menu__item--here" aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><a href="javascript:;" className="kt-menu__link kt-menu__toggle"><i className="kt-menu__link-icon flaticon2-browser-2"></i><span className="kt-menu__link-text"> Company Admin </span><i className="kt-menu__ver-arrow la la-angle-right"></i></a>
									<div className="kt-menu__submenu "><span className="kt-menu__arrow"></span>
										<ul className="kt-menu__subnav">
											<li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Services</span></span></li>
											<li className="kt-menu__item " aria-haspopup="true"><a href="/list-company-admin" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text"> List Company Admin</span></a></li>
											<li className="kt-menu__item " aria-haspopup="true"><a href="/company-admin-add" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">Add Company Admin</span></a></li>
										</ul>
									</div>
								</li>
                </>
                  :
                  <>

              <li className="kt-menu__item " aria-haspopup="true">
                  <Link href="/company-admin">
                    <a className="kt-menu__link ">
                      <i className="kt-menu__link-icon flaticon-home"></i>
                      <span className="kt-menu__link-text">Company Admin List</span>
                    </a>
                  </Link>
                </li>

                <li className="kt-menu__item " aria-haspopup="true">
                  <Link href="/company-service">
                    <a className="kt-menu__link ">
                      <i className="kt-menu__link-icon flaticon-home"></i>
                      <span className="kt-menu__link-text">Company Service List</span>
                    </a>
                  </Link>
                </li>


                <li className="kt-menu__item  kt-menu__item--submenu kt-menu__item--open kt-menu__item--here" aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><a href="javascript:;" className="kt-menu__link kt-menu__toggle"><i className="kt-menu__link-icon flaticon2-browser-2"></i><span className="kt-menu__link-text">User Management</span><i className="kt-menu__ver-arrow la la-angle-right"></i></a>
									<div className="kt-menu__submenu "><span className="kt-menu__arrow"></span>
										<ul className="kt-menu__subnav">
											<li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Users</span></span></li>
											<li className="kt-menu__item " aria-haspopup="true"><a href="/company-user-list" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text"> List User</span></a></li>
											<li className="kt-menu__item " aria-haspopup="true"><a href="/add-company-user" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">Add User</span></a></li>
										</ul>
									</div>
								</li>


                <li className="kt-menu__item  kt-menu__item--submenu kt-menu__item--open kt-menu__item--here" aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><a href="javascript:;" className="kt-menu__link kt-menu__toggle"><i className="kt-menu__link-icon flaticon2-browser-2"></i><span className="kt-menu__link-text">Task Management</span><i className="kt-menu__ver-arrow la la-angle-right"></i></a>
									<div className="kt-menu__submenu "><span className="kt-menu__arrow"></span>
										<ul className="kt-menu__subnav">
											<li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Task Service</span></span></li>
											<li className="kt-menu__item " aria-haspopup="true"><a href="/task/list-tasks" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text"> List Task</span></a></li>
											<li className="kt-menu__item " aria-haspopup="true"><a href="/task/assign-task" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">Assign Task</span></a></li>
										</ul>
									</div>
								</li>

              {/* <li className="kt-menu__item " aria-haspopup="true">
                <Link href="/users">
                  <a className="kt-menu__link ">
                    <i className="kt-menu__link-icon flaticon-home"></i>
                    <span className="kt-menu__link-text">Users</span>
                  </a>
                </Link>
              </li> */}

              <li className="kt-menu__item  kt-menu__item--submenu kt-menu__item--open kt-menu__item--here" aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><a href="javascript:;" className="kt-menu__link kt-menu__toggle"><i className="kt-menu__link-icon flaticon2-browser-2"></i><span className="kt-menu__link-text">Attendance Management</span><i className="kt-menu__ver-arrow la la-angle-right"></i></a>
									<div className="kt-menu__submenu "><span className="kt-menu__arrow"></span>
										<ul className="kt-menu__subnav">
											<li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Companies</span></span></li>
											<li className="kt-menu__item " aria-haspopup="true"><a href="/attendence" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text"> List Attendence </span></a></li>
											<li className="kt-menu__item " aria-haspopup="true"><a href="/add-attendence" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text">Assign Attendance</span></a></li>
										</ul>
									</div>
							</li>
              <li className="kt-menu__item  kt-menu__item--submenu kt-menu__item--open kt-menu__item--here" aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><a href="javascript:;" className="kt-menu__link kt-menu__toggle"><i className="kt-menu__link-icon flaticon2-browser-2"></i><span className="kt-menu__link-text">Delivery Management</span><i className="kt-menu__ver-arrow la la-angle-right"></i></a>
									<div className="kt-menu__submenu "><span className="kt-menu__arrow"></span>
										<ul className="kt-menu__subnav">
											<li className="kt-menu__item " aria-haspopup="true"><a href="/deliveries" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text"> List Delivery</span></a></li>
											<li className="kt-menu__item " aria-haspopup="true"><a href="/assign-deliveries" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span></span></i><span className="kt-menu__link-text"> Assign Delivery</span></a></li>
										</ul>
									</div>
							</li>
              </>
  }
            </ul>
          </div>
        </div>
      </div>
      <div
        className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper"
        id="kt_wrapper"
      >
        <div
          id="kt_header"
          className="kt-header kt-grid__item  kt-header--fixed "
        >
          <div
            className="kt-header-menu-wrapper "
            id="kt_header_menu_wrapper"
          >

         
          </div>

          <div className="kt-header__topbar">
            <div className="kt-header__topbar-user">
              <DropdownButton
                id="dropdown-basic-button"
                title= {this.state.username}
              >
             
          {
            this.state.user_type == 1 ? 
            <Dropdown.Item onClick={this.updateSuperPassword}>Update Password</Dropdown.Item>

            :
            <Dropdown.Item onClick={this.updateAdminPassword}>Update Password</Dropdown.Item>
          }
              <Dropdown.Item onClick={this.logOut}>Log Out</Dropdown.Item>

              </DropdownButton>
            </div>
          </div>
        </div>
        <div
          className="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor"
          id="kt_content"
        >
          <div className="kt-container  kt-container--fluid  kt-grid__item kt-grid__item--fluid">
            {this.props.children}
          </div>
        </div>
      </div>
    </div>
  );
};
}

export default Menu;
