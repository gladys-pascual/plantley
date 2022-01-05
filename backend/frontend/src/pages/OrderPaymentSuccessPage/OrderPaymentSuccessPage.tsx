import * as React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useOrder } from '../../hooks/useOrder';
import { Grid } from '@mui/material';
import { useUpdateOrderToPaid } from '../../hooks/useUpdateOrderToPaid';
import Loading from '../../components/Loading/Loading';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const OrderPaymentSuccessPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { orderDetails, orderDetailsError, orderDetailsLoading } = useOrder(
    id!
  );

  const {
    updateOrderToPaid,
    updateOrderToPaidError,
    updateOrderToPaidLoading,
  } = useUpdateOrderToPaid();

  React.useEffect(() => {
    const paymentIntentId = searchParams.get('payment_intent');
    if (paymentIntentId && orderDetails && !orderDetails.isPaid) {
      updateOrderToPaid({
        orderId: orderDetails.id,
        paymentIntentId,
      });
    }
  }, [orderDetails, updateOrderToPaid, searchParams]);

  if (orderDetailsLoading || updateOrderToPaidLoading) {
    return <Loading />;
  }

  if (updateOrderToPaidError || orderDetailsError) {
    // if (true) {
    return (
      <Grid container sx={{ p: 4 }}>
        <Alert severity="error" sx={{ width: '100%' }}>
          <AlertTitle>Error updating order to paid</AlertTitle>
        </Alert>
      </Grid>
    );
  }

  return (
    <Grid container direction="column" sx={{ p: 4 }}>
      <Alert severity="success">
        <AlertTitle>Successful payment for order {id}</AlertTitle>
        See order info{' '}
        <Link to={`/order/${id}`} style={{ color: 'black' }}>
          here
        </Link>
      </Alert>
    </Grid>
  );
};

export default OrderPaymentSuccessPage;
