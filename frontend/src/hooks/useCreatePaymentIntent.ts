import { useMutation } from 'react-query';
import postPaymentIntent from '../api/postPaymentIntent';
import { PostPaymentIntentData } from '../types';

export const useCreatePaymentIntent = () => {
  const { mutate: createPaymentIntent, data: createPaymentIntentData } =
    useMutation((paymentData: PostPaymentIntentData) =>
      postPaymentIntent(paymentData).then((data) => data)
    );
  return {
    createPaymentIntent,
    createPaymentIntentData,
  };
};
