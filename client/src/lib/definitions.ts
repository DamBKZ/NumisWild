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

type Coin = {
  id: string;
  user_id: string;
  label: string;
  country: string;
  year: number;
  value: number;
  material: string;
  diameter: number;
  weight: number;
  money_condition: string;
  description: string;
  picture: string;
  is_banknote: boolean;
  created_at: string;
  updated_at: string;
};

type Collection = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

type CollectionItem = {
  collection_id: string;
  coin_id: string;
  added_at: string;
};

type CoinFormData = {
  name: string;
  country: string;
  year: number;
  value: number;
  material?: string;
  condition: string;
  diameter?: number | null;
  weight?: number | null;
  image_url?: string;
  description?: string;
  is_banknote?: boolean;
};

type CoinListProps = {
  searchQuery: string;
};

type EditCoinFormProps = {
  coin: Coin | null;
  onSave: (updatedCoin: Coin) => void;
  onClose: () => void;
};
