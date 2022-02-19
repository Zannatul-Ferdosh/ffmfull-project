import Layout from "../../../components/Layout";
import fetch from 'isomorphic-unfetch';
import DeliveryDetails from "../../../components/DeliveryDetails";
const Delivery = props => (
  <Layout>
      <DeliveryDetails delivery_data={props.delivery_data}/>
  </Layout>
);

Delivery.getInitialProps = async function(context) {
  const { deliveryDetails } = context.query;

  const delivery_data = deliveryDetails;

  return { delivery_data };
};

export default Delivery;

