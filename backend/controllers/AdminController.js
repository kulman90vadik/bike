
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// import AdminUserModel from '../models/AdminUser.js';
// import "dotenv/config";

// const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN || 'super-secret-key';




// export const loginAdmin = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const admin = await AdminUserModel.findOne({ username });
//     if (!admin) return res.status(400).json({ message: 'Invalid credentials - админ не найден' });

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials - пароль' });

//     const token = jwt.sign({ id: admin._id }, JWT_SECRET_ADMIN, { expiresIn: '1d' });

//     res.json({ tokenAdmin });

//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };
