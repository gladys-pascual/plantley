import * as React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Grid, Stepper, Step, StepLabel } from '@mui/material';

const steps = [
  { id: 0, url: 'shipping', label: 'Shipping' },
  { id: 1, url: 'place-order', label: 'Place Order' },
];

const CheckoutPage = () => {
  const { pathname } = useLocation();
  const activeStep = steps.find(({ url }) => pathname.includes(url))?.id ?? 0;

  return (
    <Grid container direction="column" sx={{ py: 4, px: 8 }}>
      <Grid item xs={12}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(({ url, label }) => (
            <Step key={url}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Outlet />
    </Grid>
  );
};

export default CheckoutPage;
