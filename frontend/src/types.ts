export type Plant = {
  countInStock: number;
  createdAt: string;
  description: string;
  filterByLightRequirements: string;
  filterByPlantSize: string;
  id: number;
  image: string;
  light: string;
  name: string;
  potSize: string;
  price: string;
  tips: string;
  toxicity: string;
  userId: number;
  water: string;
};

export type LogInData = {
  username: string;
  password: string;
};

export type RegisterData = {
  name: string;
  username: string;
  password: string;
};

export type LogInResponse = {
  refresh: string;
  access: string;
  id: number;
  username: string;
  email: string;
  name: string;
  isAdmin: boolean;
  token: string;
};

export type UserProfileResponse = {
  email: string;
  id: number;
  isAdmin: boolean;
  name: string;
  username: string;
};

export type HeaderProps = {
  hasCartItems: boolean;
  hasTokenInLocalStorage: boolean;
};

export type CreateOrEditPlantData = {
  name: string;
  price: string;
  potSize: string;
  description: string;
  countInStock: number;
  filterByPlantSize: string;
  filterByLightRequirements: string;
  light: string;
  water: string;
  tips: string;
  toxicity: string;
};

export type ShippingAddress = {
  id: number;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  shippingPrice: string;
  order: number;
};

export type User = {
  id: number;
  username: string;
  email: string;
  name: string;
  isAdmin: boolean;
};

export type OrderItem = {
  id: number;
  name: string;
  qty: number;
  price: string;
  image: string;
  plant: number;
  order: number;
};

export type Order = {
  id: number;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  user: User;
  paymentMethod: 'stripe';
  taxPrice: string;
  shippingPrice: string;
  totalPrice: string;
  isPaid: boolean;
  paidAt: string | null;
  isDelivered: boolean;
  deliveredAt: string | null;
  createdAt: string;
  userId: number;
};

export type PostOrderData = {
  orderItems: {
    plantId: number;
    qty: number;
    price: number;
  }[];
  shippingAddress: Partial<ShippingAddress>;
} & Pick<Order, 'paymentMethod' | 'taxPrice' | 'totalPrice' | 'shippingPrice'>;

export type PostPaymentIntentData = {
  id: number;
  totalPrice: number;
};
