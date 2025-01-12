import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  // console.log(token);
  // next(); // это ретёрн вробе как
  if(token) {
    console.log('Authorization Header:', req.headers.authorization);
    try {
      const decoded = jwt.verify(token, 'secret1234');
      req.userId = decoded._id;
      console.log(req.userId = decoded._id);
      return next();
  } catch (error) {
    console.log(token);
      console.error('JWT Verification Error:', error.message);
      return res.status(403).json({
          message: 'Нет доступа (ошибка токена)',
      });
  }

  } else {
    return res.status(403).json({
      message: "Нет доступаa"
    })
  }

  res.send(token);
}

