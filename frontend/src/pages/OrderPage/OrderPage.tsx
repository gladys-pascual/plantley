import {
  Alert,
  Button,
  Divider,
  Grid,
  GridDirection,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Link as RouterLink, useParams, useLocation } from 'react-router-dom';
import { useOrder } from '../../hooks/useOrder';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ResponsiveStyleValue } from '@mui/system/styleFunctionSx';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';

const OrderPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const theme = useTheme();

  const { orderDetails, orderDetailsLoading, orderDetailsError } = useOrder(
    id!
  );

  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  if (orderDetailsLoading) {
    return <Loading />;
  }

  if (orderDetailsError) {
    return <Error />;
  }

  const {
    shippingAddress: { address, city, postalCode, country },
    paymentMethod,
    orderItems,
    taxPrice,
    shippingPrice,
    totalPrice,
    isDelivered,
    deliveredAt,
    isPaid,
    paidAt,
  } = orderDetails!;

  const itemsTotal = orderItems.reduce(
    (total, item) => +total + +item.price,
    0
  );

  const containerDirection: ResponsiveStyleValue<GridDirection> = isMobile
    ? {
        direction: 'column-reverse',
      }
    : { direction: 'row' };

  return (
    <Grid container spacing={8} sx={{ p: 4 }} {...containerDirection}>
      <Grid item xs={12} lg={8}>
        <Typography variant="h5" gutterBottom component="h5">
          Shipping
        </Typography>
        <Typography variant="body1" gutterBottom>
          {address}, {city}, {postalCode}, {country}
        </Typography>
        {isDelivered ? (
          <Alert>Delivered on {deliveredAt}</Alert>
        ) : (
          <Alert severity="warning">Not delivered</Alert>
        )}
        <Divider sx={{ my: 3 }} />
        <Typography variant="h5" gutterBottom component="h5">
          Payment method
        </Typography>
        <Typography variant="body1" gutterBottom>
          {paymentMethod}
        </Typography>
        {isPaid && paidAt ? (
          <Alert>
            Paid on{' '}
            {new Date(paidAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              weekday: 'long',
              hour: '2-digit',
              hour12: false,
              minute: '2-digit',
              second: '2-digit',
            })}
          </Alert>
        ) : (
          <Alert severity="warning">Not paid</Alert>
        )}
        <Divider sx={{ my: 3 }} />
        <Box>
          <Typography variant="h5" gutterBottom component="h5">
            Order items
          </Typography>
          {orderItems.map(({ name, qty, price }) => (
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}
              key={name}
            >
              <Box component="span">{name}</Box>
              <Box component="span">
                {qty} x € {price}
              </Box>
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Box sx={{ border: 1, borderRadius: 1, color: 'text.primary' }}>
          <Typography
            variant="h5"
            component="h5"
            sx={{ p: 1, color: 'text.primary' }}
          >
            Order summary
          </Typography>
          <Typography
            variant="body1"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: 1,
              p: 1,
              color: 'text.primary',
            }}
          >
            <Box component="span">Items:</Box>
            <Box component="span">{itemsTotal.toFixed(2)}</Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: 1,
              p: 1,
              color: 'text.primary',
            }}
          >
            <Box component="span">Tax:</Box>
            <Box component="span">{taxPrice}</Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: 1,
              p: 1,
              color: 'text.primary',
            }}
          >
            <Box component="span">Shipping:</Box>
            <Box component="span">{shippingPrice}</Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: 1,
              p: 1,
              color: 'text.primary',
            }}
          >
            <Box component="span">Total:</Box>
            <Box component="span">{totalPrice}</Box>
          </Typography>
        </Box>
        {!isPaid && (
          <Box sx={{ pt: 2 }}>
            <Button
              variant="contained"
              fullWidth
              component={RouterLink}
              to={`${pathname}/pay`}
            >
              Pay now
            </Button>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default OrderPage;
