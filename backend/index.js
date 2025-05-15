import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';

import { registerValidation, loginValidation } from './validations.js';
import { handleValidationErrors, checkAuth}  from './utils/index.js';
import { UserController, ProductController, BasketController, FavoritesController } from './controllers/index.js';

import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(express.json()); // научили понимать json файлы
app.use(cors()); // ВАЖНО ДЛЯ ЗАПРОСА МЕЖДУ ЛОКАЛЬНЫМИ ХОСТАМИ ФРОНТА И БЕКЕНДА
// const allowedOrigins = [
//   'https://bike-ten.vercel.app',
//   // можно добавить другие домены если нужно
// ];

// app.use(cors({
//   origin: allowedOrigins,
//   // credentials: true, // если используешь куки или авторизацию
// }));


const PORT = process.env.PORT || 5555;


const storage = multer.diskStorage({
  // выполниться функция ниже с параметрами, пропускаем сейчас их
  // и выполняем ф-ию cb
  destination: (_, file, cb) => {
    // получавет путь
    cb(null, 'uploads'); // НЕ получает ошибок и сохраняет данный в папку uploads
  },
  // прежде чем как сохранить он скажет как называется файл
  filename: (_, file, cb) => {
    cb(null, file.originalname); // НЕ получает ошибок и сохраняет данный в папку uploads
  },
});

const upload = multer({storage});
app.use('/uploads', express.static('uploads')); // если убрать то он не будет знать что лежит в папке с файлами. 


// app.post('/uploads', checkAuth, upload.single('image'), (req, res) => {
app.post('/uploads', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})


app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
// app.post('/auth/register', (req, res) => {
//   console.log('Зашли в /auth/register без валидации');
//   res.json({ message: 'test' });
// });
app.get('/auth/me', checkAuth, UserController.getMe);


app.get("/products/topproducts", ProductController.topProducts);
app.get("/products/sort", ProductController.sortProducts);
app.get('/products', ProductController.getAll);
app.get('/products/:id', ProductController.getOne);



app.patch('/products/:id/comments', checkAuth, handleValidationErrors, ProductController.addComment);
app.patch('/products/:productId/comments/:reviewId', checkAuth, ProductController.editComment);
app.delete('/products/:id/comments/:idComment', checkAuth, ProductController.removeComment);
// handleValidationErrors

app.patch('/products/:id/comments/:idComment/:action', checkAuth, ProductController.likeComment);



app.post('/basket/:id', checkAuth, handleValidationErrors, BasketController.addToBasket);
app.post('/basket/counter/:id/:action', checkAuth, handleValidationErrors, BasketController.counterBasket);
app.get('/basket', checkAuth, BasketController.getAllBasket);


app.post('/favorites/:id', checkAuth, handleValidationErrors, FavoritesController.addToFavorites);
app.get('/favorites', checkAuth, FavoritesController.getAllFavorites);


// app.listen(PORT, (err) => {
//   if(err) {return console.log(err, '------------------------')}
//   console.log(`!!Server OK!! -- https://localhost:${PORT}`)
// })

app.get('/', (req, res) => {
  res.send('🚴‍♂️ BikeApp API работает!');
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`!!Server OK!! -- http://0.0.0.0:${PORT}`);
});


// mongoose
// .connect('mongodb://vkuhlmann:Vadik1990@cluster123-shard-00-00.dwucc.mongodb.net:27017,cluster123-shard-00-01.dwucc.mongodb.net:27017,cluster123-shard-00-02.dwucc.mongodb.net:27017/proj?ssl=true&replicaSet=atlas-gr7xm8-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster123')
// .then(() => console.log('db okkkkkk'))
// .catch((err) => console.log(`Error ${err}`))

// const uri = "mongodb://vkuhlmann:Vadik1990@cluster123-shard-00-00.dwucc.mongodb.net:27017,cluster123-shard-00-01.dwucc.mongodb.net:27017,cluster123-shard-00-02.dwucc.mongodb.net:27017/proj?ssl=true&replicaSet=atlas-gr7xm8-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster123";
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Успешное подключение"))
  .catch(err => console.error("Ошибка подключения: к базе", err));

