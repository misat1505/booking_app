import jwt from "jsonwebtoken";

export const encode = (payload: any, options?: jwt.SignOptions) => {
  const secretKey = process.env.JWT_SECRET!;
  const signed = jwt.sign(payload, secretKey, options);
  return signed;
};

export const decode = (token: any) => {
  const secretKey = process.env.JWT_SECRET!;
  const decoded = jwt.verify(token, secretKey);
  return decoded;
};
