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
