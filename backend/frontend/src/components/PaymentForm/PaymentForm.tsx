import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';

type PaymentFormProps = {
  orderId: string;
};

export default function PaymentForm({ orderId }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState<string | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = searchParams.get('payment_intent_client_secret');

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        setMessage('Something went wrong.');
        return;
      }
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order/${orderId}/success`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        p: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" />
        {isLoading ? (
          <Box sx={{ pt: 2 }}>
            <LoadingButton
              loading
              variant="contained"
              disabled
              loadingPosition="end"
              fullWidth
            >
              Loading
            </LoadingButton>
          </Box>
        ) : (
          <Box sx={{ pt: 2 }}>
            <Button
              // Disable form submission until Stripe.js has loaded.
              disabled={!stripe || !elements}
              fullWidth
              variant="contained"
              type="submit"
            >
              Pay now
            </Button>
          </Box>
        )}
        {message && (
          <Typography variant="body1" sx={{ pt: 2 }}>
            {message}
          </Typography>
        )}
      </form>
    </Box>
  );
}
