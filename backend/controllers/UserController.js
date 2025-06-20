import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";

import "dotenv/config";

// ВЫПОЛНЯ.ТСЯ ЭТИ ФУНКЦИИ ЗАПРОШЕННЫЕ ИЗ ФРОНТЕНДА!

export const register = async (req, res) => {
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
      role: 'user'
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

    const { passwordHash, ...userData } = user._doc;

    // если всё ок то возвращаем что либо что нужно
    res.json({ ...userData, token }); ///    ВОТ ЧТО ВЕРНЁТСЯ НА ФРОНТЕНД
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Registration failed",
    });
  }
};


export const login = async (req, res) => {
  try {
    // проверка в базе данных пользователя
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        massage: "Invalid credentials",
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
        massage: "Invalid credentials",
      });
    }
    // если всё ок
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      // process.env.JWT_SECRET,
      "secret1234",
      {
        expiresIn: "30d",
      }
    );

    // const userData = user.toObject();
    const { passwordHash, ...userData } = user._doc;
    // если всё ок то возвращаем что либо что нужно
    res.json({
      ...userData,
      token,
      role: user.role
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
     message: "Authorization error. Please try again later.",
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
        message: "Invalid credentials",
      });
    }
    const { passwordHash, ...userData } = user._doc;
    // если всё ок то возвращаем что либо что нужно
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error",
    });
  }
};



// getUsers

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find(); 
    const safeUsers = users.map(user => ({
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      avatarUrl: user.avatarUrl,
      // createdAt: user.createdAt,
    }));


    res.json(safeUsers);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении пользователей' });
  }
};

