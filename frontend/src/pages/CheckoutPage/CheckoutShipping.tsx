import { Button, Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ShippingAddress } from '../../types';

export type ShippingFormValues = Pick<
  ShippingAddress,
  'address' | 'city' | 'postalCode' | 'country'
>;

const formDefaultValues: ShippingFormValues = {
  address: '',
  city: '',
  postalCode: '',
  country: '',
};

const CheckoutShipping = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<ShippingFormValues>({
    defaultValues: formDefaultValues,
  });

  const onSubmit = (values: ShippingFormValues) => {
    localStorage.setItem('checkout.shipping', JSON.stringify(values));
    navigate('/checkout/place-order');
  };

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item>
        <h1>Shipping</h1>
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Controller
                control={control}
                name="address"
                rules={{ required: 'Address is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    {...field}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    label="Address"
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                control={control}
                name="city"
                rules={{ required: 'City is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    {...field}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    label="City"
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                control={control}
                name="postalCode"
                rules={{ required: 'Postal code is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    {...field}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    label="Postal code"
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                control={control}
                name="country"
                rules={{ required: 'Country is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    fullWidth
                    {...field}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    label="Country"
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" size="large" type="submit">
                Continue
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default CheckoutShipping;
