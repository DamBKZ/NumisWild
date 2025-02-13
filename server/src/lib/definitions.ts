type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  hash_password: string;
  created_at: number;
  updated_at: number;
  role_id: number;
};

type UpdatedUserType = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  hash_password: string;
};

type NewUserType = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  hash_password: string;
};

type user = {
  firstname: string;
  lastname: string;
  email: string;
  hash_password: string;
};

type PayloadType = {
  email: string;
  iat: number;
  exp: number;
};

type MoneyType = {
  id: number;
  label: string;
  country: string;
  year: number;
  value: number;
  material: string | null;
  diameter: number | null;
  weight: number | null;
  money_condition: string;
  description: string | null;
  picture: string | null;
  collection_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
};

type NewMoneyType = {
  label: string;
  country: string;
  year: number;
  value: number;
  material: string | null;
  diameter: number | null;
  weight: number | null;
  money_condition: string;
  description: string | null;
  picture: string | null;
  collection_id: number;
  user_id: number;
};

type UpdatedMoneyType = NewMoneyType & {
  id: number;
};
