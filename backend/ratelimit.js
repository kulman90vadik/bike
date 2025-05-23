// const rateLimit = require('express-rate-limit');

import rateLimit from 'express-rate-limit';

export const readLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 час
  max: 500, // максимум 100 запросов
  message: 'Too many requests. Please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});