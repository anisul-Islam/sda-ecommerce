export type Error = {
  status?: number;
  message?: string;
};

export type EmailDataType = {
  email: string;
  subject: string;
  html: string;
};

export type UserType = {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  image?: string;
  isAdmin?: boolean;
  isBanned?: boolean;
};
