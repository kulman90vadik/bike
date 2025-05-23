import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js';

import 'dotenv/config';

// ВЫПОЛНЯ.ТСЯ ЭТИ ФУНКЦИИ ЗАПРОШЕННЫЕ ИЗ ФРОНТЕНДА!

export const register = async (req, res) => {

  console.log('Вызов /auth/register с телом:', req.body);
console.log('JWT_SECRET:', process.env.JWT_SECRET); // ← Добавь это прямо тут



  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10); // алгоритм шифрования
    const hash = await bcrypt.hash(password, salt);

// запись данных в бекенд
    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      passwordHash: hash, // пароль теперь зашифрован!!!
      avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      // process.env.JWT_SECRET, // 
      "secret1234",
      {
        expiresIn: "30d", // окен будет действителен в течение 30 дней.
      }
    );

//     const token = jwt.sign(
//   { _id: user._id },
//   process.env.JWT_SECRET || 'myTempHardcodedSecret',
//   { expiresIn: '30d' }
// );

    const { passwordHash, ...userData } = user._doc;

    // если всё ок то возвращаем что либо что нужно
    res.json({ ...userData, token }); ///    ВОТ ЧТО ВЕРНЁТСЯ НА ФРОНТЕНД

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось зарегиться",
    });

  }
};

export const login = async (req, res) => {
  try {
    // проверка в базе данных пользователя
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        massage: "Пользователь не найден",
        // для реального проекта надо писать --- НЕВЕРНЫЙ ЛОГИН ИЛИ ПАРОЛЬ
      });
    }
    // ЕСЛИ ВСЁ ОК ТО ПРОВЕРЯЕМ ЭТОТ ЕМАИЛ И ТО ЧТ ОПРИСЛАЛ ПОЛЬЗОВАТЕЛЬ
    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!isValidPass) {
      return res.status(400).json({
        massage: "НЕВЕРНЫЙ ЛОГИН ИЛИ ПАРОЛЬ",
      });
    }
    // если всё ок
    const token = jwt.sign({ _id: user._id }, 
      // process.env.JWT_SECRET,
       "secret1234",
      {
      expiresIn: "30d",
    });

    // const userData = user.toObject();
    const { passwordHash, ...userData } = user._doc;
    // если всё ок то возвращаем что либо что нужно
    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось залагиниться авторизоваться",
    });
  }
};


export const getMe = async (req, res) => {
  // при запуске запроса включиться ф-ия checkAuth и если она одобрит то тогда выролнятся будет (req, res)
  try {
    // получить инфомацию о пользователе
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    } 
    const { passwordHash, ...userData } = user._doc;
    // если всё ок то возвращаем что либо что нужно
    res.json( userData );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};
