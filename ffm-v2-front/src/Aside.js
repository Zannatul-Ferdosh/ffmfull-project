import React from 'react';

import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt,FaListAlt, FaUserFriends,  FaClipboardList } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import sidebarBg from './assets/bg1.jpg';
import { Link } from 'react-router-dom'

const Aside = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {

  const { user } = useSelector(state => state.auth)

  return (
    <ProSidebar
      image={false}
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            textAlign:"center"
          }}
        >
          
          {
             user.member_type && user.member_type === 1 ?
             "FFM Platform ":
             "Company Web Portal"
          }
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaTachometerAlt />}

          >
            <Link to='/user-dashboard'>Dashboard</Link>
          </MenuItem>


          {
            user.member_type && user.member_type === 1 ?
              <>
                <SubMenu
                  title="FFM OT Member"
                  icon={<FaUserFriends />}
                >
                  <MenuItem><Link to='/ot-member-list'>FFM OT Member List</Link></MenuItem>
                  <MenuItem><Link to='/register-ot-member'>Register OT Member</Link></MenuItem>

                </SubMenu>

                <SubMenu
                  title="Service Management"
                  icon={<FaClipboardList />}
                >
                  <MenuItem><Link to='/services'>List Service</Link></MenuItem>
                  {/* <MenuItem><Link to='/add-service'>Add Service</Link></MenuItem> */}
                </SubMenu>


                <SubMenu
                  title="Company Manager"
                  icon={<FaUserFriends />}
                >
                  <MenuItem><Link to='/list-company-manager'>List Company Manager</Link></MenuItem>
                   <MenuItem><Link to='/company-manager-add'>Add Company Manager</Link></MenuItem> 
                </SubMenu>
                
                <SubMenu
                  title="Company Management"
                  icon={<FaClipboardList />}
                >
                  <MenuItem><Link to='/super-admin-company'>List Companies</Link></MenuItem>
                   <MenuItem><Link to='/add-super-admin-company'>Add Company</Link></MenuItem> 
                </SubMenu>
              </> :
              user.member_type === 2 ?
              <>
                <MenuItem icon={<FaListAlt />}><Link to='/company-manager'>Company Manager List</Link> </MenuItem>
                <MenuItem icon={<FaListAlt />}><Link to='/company-service'>Company Service List</Link> </MenuItem>
                <SubMenu
                  title="Field Employee Management"
                  icon={<FaUserFriends />}
                >
                  <MenuItem><Link to='/company-field-employee-list'>List Field Employee</Link></MenuItem>
                  <MenuItem><Link to='/add-company-field-employee'>Add Field Employee</Link></MenuItem>

                </SubMenu>


                <SubMenu
                  title="Task Management"
                  icon={<FaClipboardList />}
                >
                  <MenuItem><Link to='/task/list-tasks'>List Task</Link></MenuItem>
                  <MenuItem><Link to='/task/assign-task'>Assign Task</Link></MenuItem>

                </SubMenu>

                <SubMenu
                  title="Attendance Management"
                  icon={<FaClipboardList />}
                >
                  <MenuItem><Link to='/attendance'>List Attendance</Link></MenuItem>
                  <MenuItem><Link to='/add-attendance'>Assign Attendance</Link></MenuItem>

                </SubMenu>

                <SubMenu
                  title="Delivery Management"
                  icon={<FaClipboardList />}
                >
                  <MenuItem><Link to='/deliveries'>List Delivery</Link></MenuItem>
                  <MenuItem><Link to='/assign-deliveries'>Assign Delivery</Link></MenuItem>

                </SubMenu>
              </>:
              <span></span>
          }




          {/* <MenuItem icon={<FaCreditCard />}><Link to='/brands'>Brands</Link> </MenuItem>
          <MenuItem icon={<FaRegClock />}><Link to='/campaigns'>Campaigns</Link> </MenuItem>



          <SubMenu
            title="Products"
            icon={<FaShoppingCart />}
          >
            <MenuItem><Link to='/product/create'>Create Product</Link></MenuItem>
            <MenuItem><Link to='/product/productlist'>All products</Link></MenuItem>
            <MenuItem><Link to='/product/attribute'>Attribute</Link></MenuItem>
            <MenuItem><Link to='/product/bulk-import'>Bulk Import</Link></MenuItem>
            <MenuItem><Link to='/product/bulk-export'>Bulk Export</Link></MenuItem>

          </SubMenu>
          <MenuItem icon={<FaStackExchange />}><Link to='/product-reviews'>Product Reviews</Link> </MenuItem>
          <MenuItem icon={<FaMoneyCheck />}><Link to='/orders'>Orders</Link> </MenuItem>
          <MenuItem icon={<FaUserFriends />}><Link to='/customers'>Customers</Link> </MenuItem>
          <MenuItem icon={<FaDollarSign />}><Link to='/payment-method'>Payment Methods</Link> </MenuItem>

          <SubMenu
            title="Website Setup"
            icon={<FaDesktop />}
          >
            <MenuItem><Link to='/website/slider'>Homepage Slider</Link></MenuItem>
            <MenuItem><Link to='/website/analytics'>Analytics</Link></MenuItem>


          </SubMenu>


          <SubMenu
            title="Settings"
            icon={<FaRegSun />}
          >
            <MenuItem><Link to='/settings/smtp'>SMTP</Link></MenuItem>
            <MenuItem><Link to='/settings/image-storage'>Image Storage</Link></MenuItem>
            <MenuItem><Link to='/settings/live-chat'>Live Chat</Link></MenuItem>
            <MenuItem><Link to='/settings/import-demo'>Import Demo</Link></MenuItem>


          </SubMenu> */}
        </Menu>
      </SidebarContent>

      {/* <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >

          DCELL
        </div>
      </SidebarFooter> */}
    </ProSidebar>
  );
};

export default Aside;
