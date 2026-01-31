import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import User from '../models/User.js';

//const authToken = async (req, res, next) => {
 // const authHeader = req.headers.authorization;
  //if (!authHeader) 
  //  return res.status(401).json({ error: 'Token missing' });

 // const token = authHeader.split(' ')[1];

 // try {
  //  const decoded = jwt.verify(token, env.jwtSecret);
   // const user = await User.findByPk(decoded.id);
   // if (!user) return res.status(401).json({ error: 'User not found' });

  //////  id: user.id,
    //  role: user.role,
    //  specialty: user.specialty, 
     // first_name: user.first_name,
    //  last_name: user.last_name
  //  };
  //  next();
 // } catch (err) {
 //   return res.status(401).json({ error: 'Invalid token' });
 // }
//};


const authToken = async (req, res, next) => {
  console.log("AUTH MIDDLEWARE HIT"); // <-- أضف هذا السطر
  next();
};



export default authToken;




