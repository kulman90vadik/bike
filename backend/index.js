import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';

import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import { registerValidation, loginValidation } from './validations.js';
import { readLimiter } from './ratelimit.js';
import { handleValidationErrors, checkAuth}  from './utils/index.js';
import { UserController, ProductController, BasketController, FavoritesController, BranchController  } from './controllers/index.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
// app.use(express.static(path.join(__dirname, 'build')));

// // Для всех остальных маршрутов (кроме API) отдаем index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
// });

app.use(express.json()); // научили понимать json файлы
app.use(cors()); // ВАЖНО ДЛЯ ЗАПРОСА МЕЖДУ ЛОКАЛЬНЫМИ ХОСТАМИ ФРОНТА И БЕКЕНДА

const swaggerDocument = YAML.load('./openapi.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const PORT = process.env.PORT || 5555;
const storage = multer.diskStorage({
  // выполниться функция ниже с параметрами, пропускаем сейчас их
  // и выполняем ф-ию cb
  destination: (_, file, cb) => {
    // получавет путь
    cb(null, 'uploads'); // НЕ получает ошибок и сохраняет данный в папку uploads
  },
  // прежде чем как сохранить он скажет как называется файл
  // filename: (_, file, cb) => {
  //   cb(null, file.originalname); // НЕ получает ошибок и сохраняет данный в папку uploads
  // },
  filename: (_, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  }
});






const upload = multer({
  storage,
   fileFilter: (_, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // файл принят
    } else {
      cb(new Error('Invalid file type. Only image files are allowed.'));

    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // ограничение размера: 5 МБ
  }, 
});
app.use('/uploads', express.static('uploads')); // если убрать то он не будет знать что лежит в папке с файлами. 


// app.post('/uploads', checkAuth, upload.single('image'), (req, res) => {
app.post('/uploads', (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Ошибка Multer (например, слишком большой файл)
      return res.status(400).json({ message: err.message });
    } else if (err) {
      // Другая ошибка (например, неверный тип файла)
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Файл не загружен.' });
    }

    res.json({
      url: `/uploads/${req.file.filename}`,
    });
  });
});

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);

app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/auth/users', checkAuth, readLimiter, UserController.getUsers);


app.get("/products/topproducts", readLimiter, ProductController.topProducts);
app.get("/products/sort", readLimiter, ProductController.sortProducts);


app.get('/products', readLimiter, ProductController.getAll);
app.get('/productspag', readLimiter, ProductController.getPagination);
  

app.get('/products/:id', readLimiter, ProductController.getOne);

app.patch('/products/:id/comments', checkAuth, handleValidationErrors, readLimiter, ProductController.addComment);
app.patch('/products/:productId/comments/:reviewId', checkAuth, ProductController.editComment);
app.delete('/products/:id/comments/:idComment', checkAuth, ProductController.removeComment);
// handleValidationErrors

app.patch('/products/:id/comments/:idComment/:action', checkAuth, ProductController.likeComment);

app.post('/basket/:id', checkAuth, readLimiter, handleValidationErrors, BasketController.addToBasket);
app.post('/basket/counter/:id/:action', checkAuth, handleValidationErrors, BasketController.counterBasket);
app.get('/basket', checkAuth, readLimiter, BasketController.getAllBasket);

app.post('/favorites/:id', checkAuth, readLimiter, handleValidationErrors, FavoritesController.addToFavorites);
app.get('/favorites', checkAuth, readLimiter, FavoritesController.getAllFavorites);

// app.listen(PORT, (err) => {
//   if(err) {return console.log(err, '------------------------')}
//   console.log(`!!Server OK!! -- https://localhost:${PORT}`)
// })

app.get('/', (req, res) => {
  res.send('🚴‍♂️ BikeApp API работает!');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`!!Server OK!! -- http://0.0.0.0:${PORT}`);
  console.log(`📘 Swagger UI: http://0.0.0.0:${PORT}/api-docs`)
});


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Успешное подключение"))
  .catch(err => console.error("Ошибка подключения: к базе", err));
