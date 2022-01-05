import * as React from 'react';
import {
  Button,
  Divider,
  Grid,
  GridDirection,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { ResponsiveStyleValue } from '@mui/system/styleFunctionSx';
import Alert from '@mui/material/Alert';
import { Plant } from '../../types';
import { ShippingFormValues } from './CheckoutShipping';
import { useNavigate } from 'react-router-dom';
import { usePlants } from '../../hooks/usePlants';
import { useCreateOrder } from '../../hooks/useCreateOrder';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';

const SHIPPING_PRICE = 5;
const TAX_PRICE = 0.135;

type CheckoutPlaceOrderProps = {
  emptyCart: () => void;
};

const CheckoutPlaceOrder = ({ emptyCart }: CheckoutPlaceOrderProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const shippingInfo = useGetShippingInfo();
  const { plants, plantsLoading, plantsError } = useGetPlantsInCart();

  const createOrderSuccess = (id: number) => {
    emptyCart();
    navigate(`/order/${id}`);
  };

  const { createOrder, createOrderLoading, createOrderError } =
    useCreateOrder(createOrderSuccess);

  const containerDirection: ResponsiveStyleValue<GridDirection> = isMobile
    ? {
        direction: 'column-reverse',
      }
    : { direction: 'row' };

  if (!shippingInfo) {
    navigate('/checkout/shipping');
    return null;
  }

  const { address, city, postalCode, country } = shippingInfo;

  if (plantsLoading) {
    return <Loading />;
  }

  if (!plantsLoading && plantsError) {
    return <Error />;
  }
  const itemsTotal = plants.reduce(
    (sum, curr) => sum + +curr.price * curr.qty,
    0
  );
  const taxPrice = itemsTotal * TAX_PRICE;
  const totalPrice = itemsTotal + taxPrice + SHIPPING_PRICE;

  const handleCreateOrder = () => {
    createOrder({
      totalPrice: totalPrice.toString(),
      taxPrice: taxPrice.toString(),
      shippingPrice: SHIPPING_PRICE.toString(),
      shippingAddress: shippingInfo,
      paymentMethod: 'stripe',
      orderItems: plants.map(({ id, price, qty }) => ({
        qty,
        plantId: id,
        price: +price,
      })),
    });
  };

  return (
    <Grid container spacing={8} sx={{ p: 4 }} {...containerDirection}>
      <Grid item xs={12} lg={8}>
        <Typography variant="h5" gutterBottom component="h5">
          Shipping
        </Typography>
        <Typography variant="body1" gutterBottom>
          {address}, {city}, {postalCode}, {country}
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h5" gutterBottom component="h5">
          Payment method
        </Typography>
        <Typography variant="body1" gutterBottom>
          stripe
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Box>
          <Typography variant="h5" gutterBottom component="h5">
            Order items
          </Typography>
          {plants.map(({ name, qty, price }) => (
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
            <Box component="span">{taxPrice.toFixed(2)}</Box>
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
            <Box component="span">{SHIPPING_PRICE.toFixed(2)}</Box>
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
            <Box component="span">{totalPrice.toFixed(2)}</Box>
          </Typography>
        </Box>
        <Box sx={{ pt: 2 }}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            disabled={createOrderLoading}
            onClick={handleCreateOrder}
          >
            Place order
          </Button>
          {createOrderError && (
            <Alert sx={{ width: '90%', mt: 2 }} severity="error">
              Something went wrong, please try again.
            </Alert>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default CheckoutPlaceOrder;

function useGetShippingInfo() {
  const shippingInfo = React.useMemo(() => {
    const storedShippingInfo = localStorage.getItem('checkout.shipping');
    if (!storedShippingInfo) return null;
    return JSON.parse(storedShippingInfo) as ShippingFormValues;
  }, []);

  return shippingInfo;
}

type PlantWithQuantity = Plant & { qty: number };

function useGetPlantsInCart() {
  const cartPlants = React.useMemo(() => {
    const storedCartPlants = localStorage.getItem('cartItems');
    if (!storedCartPlants) return null;
    return JSON.parse(storedCartPlants) as {
      plantId: number;
      quantity: number;
    }[];
  }, []);

  const { plants, plantsLoading, plantsError } = usePlants({
    enabled: Boolean(cartPlants),
  });

  const plantsWithQuantity =
    cartPlants && plants
      ? //@ts-ignore
        plants.reduce((acc, currentPlant) => {
          const plantInCart = cartPlants.find(
            ({ plantId }) => plantId === currentPlant.id
          );
          if (!plantInCart) {
            return acc;
          }
          return [...acc, { ...currentPlant, qty: plantInCart.quantity }];
        }, [])
      : [];

  return {
    plants: plantsWithQuantity as PlantWithQuantity[],
    plantsLoading,
    plantsError,
  };
}
