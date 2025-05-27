// import jwt from "jsonwebtoken";
// import mongoose from 'mongoose';
// import bcrypt from "bcrypt";
// import UserModel from "./models/User.js";

// import "dotenv/config";


// async function createAdmin() {
//   await mongoose.connect('mongodb://vkuhlmann:Vadik1990@cluster123-shard-00-00.dwucc.mongodb.net:27017,cluster123-shard-00-01.dwucc.mongodb.net:27017,cluster123-shard-00-02.dwucc.mongodb.net:27017/proj?ssl=true&replicaSet=atlas-gr7xm8-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster123');

//   const password = 'Vadik1990';
//   const salt = await bcrypt.genSalt(10);
//   const passwordHash = await bcrypt.hash(password, salt);

//   const admin = new UserModel({
//     fullName: 'Admin',
//     email: 'admin@example.com',
//     passwordHash,
//     role: 'admin',
//   });

//   await admin.save();
//   console.log('Admin user created');
//   mongoose.disconnect();
// }

// createAdmin();