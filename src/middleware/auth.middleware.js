import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../../DB/models/user.model.js';
import { asyncHandler } from '../utils/asyncHandling.js';

export const protectRoute = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization?.startsWith('Bearer'))
      token = req.headers.authorization.split(' ')[1];
  
    if (!token) return next(new Error('You are not login', { cause: 401 }));
  
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
    const user = await User.findByPk(decode.id);
    if (!user) return next(new Error('user is not exist'), { cause: 401 });
    req.user = user;
    next();
  });
  