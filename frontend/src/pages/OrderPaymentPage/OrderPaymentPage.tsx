import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Appearance, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../../components/PaymentForm/PaymentForm';
import { useOrder } from '../../hooks/useOrder';
import { Order } from '../../types';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useCreatePaymentIntent } from '../../hooks/useCreatePaymentIntent';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY!);

const appearance: Appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#1469bd',
  },
};

const OrderPaymentPage = () => {
  const { id } = useParams();
  const { orderDetails } = useOrder(id!);
  useOrderAlreadyPaid(orderDetails);
  const { createPaymentIntent, createPaymentIntentData } =
    useCreatePaymentIntent();

  React.useEffect(() => {
    if (orderDetails) {
      createPaymentIntent({
        id: orderDetails.id,
        totalPrice: +orderDetails.totalPrice,
      });
    }
  }, [createPaymentIntent, id, orderDetails]);

  if (!createPaymentIntentData || !id || !orderDetails) {
    return null;
  }

  const options = {
    clientSecret: createPaymentIntentData.clientSecret,
    appearance,
  };

  return (
    <Box
      sx={{
        pt: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5">Pay: €{orderDetails.totalPrice}</Typography>
      <Elements options={options} stripe={stripePromise}>
        <PaymentForm orderId={id} />
      </Elements>
    </Box>
  );
};

export default OrderPaymentPage;

function useOrderAlreadyPaid(orderDetails?: Order) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (orderDetails?.isPaid) {
      navigate(`/order/${orderDetails.id}/success`);
    }
  }, [navigate, orderDetails]);
}
