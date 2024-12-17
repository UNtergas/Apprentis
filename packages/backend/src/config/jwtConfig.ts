export const jwtConfig = {
  SECRET: process.env.JWT_SECRET,
  EXPIRE: 30 * 24 * 60 * 60,
};
