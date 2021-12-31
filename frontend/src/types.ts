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
