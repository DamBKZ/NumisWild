type UserType = {
  id: number;
  content: string;
  firstname: string;
  lastname: string;
};

type FormValues = {
  firstname: string;
  lastname: string;
  email: string;
  hash_password: string;
  confirmed_password: string;
};

type UpdateFormValues = {
  firstname?: string;
  lastname?: string;
  email?: string;
  new_password?: string;
};

type ProfileFormData = {
  firstname: string;
  lastname: string;
  email: string;
};

type PasswordFormData = {
  password: string;
  confirmPassword: string;
};

type UserListType = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  hash_password: string;
  role_id: number;
  created_at: Date;
  updated_at: Date;
  label: string;
};

type UserProps = {
  user: UserListType;
  onDelete: (id: number) => void;
};

type AdminType = {
  id: number;
  isAdmin: boolean;
};
