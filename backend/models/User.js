import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,  
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
    role: {
    type: String,
    enum: ['user', 'admin'],  // роли, которые разрешены
    default: 'user'           // по умолчанию обычный пользователь
  },
  avatarUrl: String,
 
}, {
  timestamps: true
});

export default mongoose.model('User', UserSchema);