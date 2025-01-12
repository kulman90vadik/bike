import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { registerValidation, loginValidation } from './validations.js';
import { handleValidationErrors, checkAuth}  from './utils/index.js';
import { UserController } from './controllers/index.js';

const app = express();
app.use(express.json()); // научили понимать json файлы
app.use(cors()); // ВАЖНО ДЛЯ ЗАПРОСА МЕЖДУ ЛОКАЛЬНЫМИ ХОСТАМИ ФРОНТА И БЕКЕНДА


app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);


app.listen(5555, (err) => {
  if(err) {
    return console.log(err);
  }
  console.log('!!Server OK!! -- http://localhost:5555')
})


mongoose
.connect('mongodb://vkuhlmann:Vadik1990@cluster123-shard-00-00.dwucc.mongodb.net:27017,cluster123-shard-00-01.dwucc.mongodb.net:27017,cluster123-shard-00-02.dwucc.mongodb.net:27017/proj?ssl=true&replicaSet=atlas-gr7xm8-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster123')
.then(() => console.log('db okkkkkk'))
.catch((err) => console.log(`Error ${err}`))