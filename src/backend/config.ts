import jwt from "jsonwebtoken";

export const config = {
  jwt: {
    secret: "foidsDWS82Svg",
    options: {
      algorithm: "HS256" as jwt.Algorithm,
      expiresIn: "1d" as string | number,
    },
  },
};
