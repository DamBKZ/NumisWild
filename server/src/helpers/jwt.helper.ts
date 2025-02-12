import jwt from "jsonwebtoken";

type PayloadType = {
  email: string;
};

export const tokenGenerator = async (payload: PayloadType) => {
  return jwt.sign(payload, process.env.APP_SECRET as string, {
    expiresIn: "24h",
  });
};

export const decodeToken = (token: string) => {
  return jwt.decode(token);
};
