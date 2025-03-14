import jwt from 'jsonwebtoken';

export const generateToken = (payload,expiresIn) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiresIn });
}
