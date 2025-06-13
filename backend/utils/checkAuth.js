import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  // next(); // это ретёрн вробе как
  if(token) {
    try {
      const decoded = jwt.verify(token,
        "secret1234",
        // process.env.JWT_SECRET
      );
      req.userId = decoded._id;
      return next();
  } catch (error) {
    // console.log(token);
      // console.error('JWT Verification Error:', error.message);
      return res.status(403).json({
          message: 'No access',
      });
  }

  } else {
    return res.status(403).json({
      message: "No access"
    })
  }

  res.send(token);
}

