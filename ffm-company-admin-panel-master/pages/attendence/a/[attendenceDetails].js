import Layout from "../../../components/Layout";
import fetch from 'isomorphic-unfetch';
import AttendenceDetails from "../../../components/AttendenceDetails";
const Attendence = props => (
  <Layout>
      <AttendenceDetails attendence_data={props.attendence_data}/>
  </Layout>
);

Attendence.getInitialProps = async function(context) {
  const { attendenceDetails } = context.query;

  const attendence_data = attendenceDetails;

  return { attendence_data };
};

export default Attendence;

