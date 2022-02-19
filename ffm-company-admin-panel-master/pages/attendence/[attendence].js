import Layout from "../../components/Layout";
import fetch from 'isomorphic-unfetch';
import UpdateAttendence from "../../components/UpdateAttendence";
const Attendence = props => (
  <Layout>
      <UpdateAttendence attendence_data={props.attendence_data}/>
  </Layout>
);

Attendence.getInitialProps = async function(context) {
  const { attendence } = context.query;
  // const token = localStorage.getItem('token');

  // const headers = {
  //     'Authorization': `Bearer ${token}`
  // }

  // const res = await fetch(`http://localhost:4000/attendences/get-attendence/${attendence}`, {headers: headers});
  // const show = await res.json();
  const attendence_data = attendence;

  return { attendence_data };
};

export default Attendence;

