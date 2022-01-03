import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Appearance, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../../components/PaymentForm/PaymentForm';
import { useMutation } from 'react-query';
import postPaymentIntent from '../../api/postPaymentIntent';
import { AxiosError } from 'axios';
import { useOrder } from '../../hooks/useOrder';
import { Order, PostPaymentIntentData } from '../../types';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

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
  const { mutate: createPaymentIntent, data } = useCreatePaymentIntent();

  React.useEffect(() => {
    if (orderDetails) {
      createPaymentIntent({
        id: orderDetails.id,
        totalPrice: +orderDetails.totalPrice,
      });
    }
  }, [createPaymentIntent, id, orderDetails]);

  if (!data || !id || !orderDetails) {
    return null;
  }

  const options = {
    clientSecret: data.clientSecret,
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

type PaymentIntentResponse = {
  clientSecret: string;
};

function useCreatePaymentIntent() {
  return useMutation<PaymentIntentResponse, AxiosError, PostPaymentIntentData>(
    postPaymentIntent
  );
}

function useOrderAlreadyPaid(orderDetails?: Order) {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (orderDetails?.isPaid) {
      navigate(`/order/${orderDetails.id}/success`);
    }
  }, [navigate, orderDetails]);
}
