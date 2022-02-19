import Layout from "../../components/Layout";
import fetch from 'isomorphic-unfetch';
import UpdateDeliveries from "../../components/UpdateDeliveries";
const Delivery = props => (
  <Layout>
      <UpdateDeliveries delivery_data={props.delivery_data}/>
  </Layout>
);

Delivery.getInitialProps = async function(context) {
  const { deliveryId } = context.query;
  // const token = localStorage.getItem('token');

  // const headers = {
  //     'Authorization': `Bearer ${token}`
  // }

  // const res = await fetch(`http://localhost:4000/attendences/get-attendence/${attendence}`, {headers: headers});
  // const show = await res.json();
  const delivery_data = deliveryId;

  return { delivery_data };
};

export default Delivery;

