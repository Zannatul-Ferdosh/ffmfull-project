import React, { useEffect } from 'react';

import Layout from './Layout';
import './styles/App.scss';
import 'antd/dist/antd.css'
import Dashboard from './pages/dashboard/Dashboard';
import {
  Route, Switch
} from "react-router-dom";
import withAuth from './withAuth/withAuth'
import {useDispatch,useSelector} from 'react-redux'



import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CompanyManagerList from './pages/company-manager-list/CompanyManagerList';
import FieldEmployeeList from './pages/field-employee-management/FieldEmployeeList';
import FieldEmployeeForm from './pages/field-employee-management/FieldEmployeeForm';
import ListTask from './pages/task/ListTask';
import AssignTask from './pages/task/AssignTask';
import ListAttendance from './pages/attendance/ListAttendance';
import AttendanceForm from './pages/attendance/AttendanceForm';
import ListDelivery from './pages/delivery/ListDelivery';
import AssignDelivery from './pages/delivery/DeliveryForm';
import ServiceList from './pages/company-service/ServiceList';
import TaskDetails from './pages/task/TaskDetails';
import ListOtMember from './pages/ot-member/ListOtMember';
import RegisterOtMember from './pages/ot-member/RegisterOtMember';
import AdminListService from './pages/service-management/AdminListService';
import ListSuperAdminCompany from './pages/super-admin-company/ListSuperAdminCompany';
import SuperAdminCompanyForm from './pages/super-admin-company/SuperAdminCompanyForm';
import ListSuperComanyManager from './pages/super-company-manager/ListSuperComanyManager';
import CompanyManagerForm from './pages/super-company-manager/CompanyManagerForm';







function App() {
  let dispatch = useDispatch()
  const {authenticated} = useSelector(state => state.auth)


  return (
    

      <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
        <Layout>
          <Route path="/user-dashboard" component={Dashboard} />
          <Route path="/company-manager" component={CompanyManagerList} />

          <Route path="/company-service" component={ServiceList} />

          <Route path="/company-field-employee-list" component={FieldEmployeeList} />
          <Route path="/add-company-field-employee" component={FieldEmployeeForm} />

          <Route path="/task/list-tasks" component={ListTask} />
          <Route path="/task/assign-task" component={AssignTask} />
          <Route path="/task/:userid/:taskid" component={TaskDetails} />

          <Route path="/attendance" component={ListAttendance} />
          <Route path="/add-attendance" component={AttendanceForm} />

          <Route path="/deliveries" component={ListDelivery} />
          <Route path="/assign-deliveries" component={AssignDelivery} />


          <Route path="/ot-member-list" component={ListOtMember} />
          <Route path="/register-ot-member" component={RegisterOtMember} />

          <Route path="/services" component={AdminListService} />

          <Route path="/super-admin-company" component={ListSuperAdminCompany} />
          <Route path="/add-super-admin-company" component={SuperAdminCompanyForm} />

          <Route path="/list-company-manager" component={ListSuperComanyManager} />
          <Route path="/company-manager-add" component={CompanyManagerForm} />

        </Layout>
      </Switch>


  );
}

export default withAuth(App);
