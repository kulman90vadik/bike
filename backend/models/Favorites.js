import mongoose from 'mongoose';

const FavoritesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // так как есть id у пользователя в базе данных
    ref: 'User', // связь или ссылка на пользователя 
    required: true
  },
  price: {
    type: String,
    required: true
  },
  newproduct: {
    type: Boolean,
    required: true
  },
  category: {
    type: String
  },
  country: {
    type: String
  },
  sale: {
    type: String
  },
  description: {
    type: String
  },
  flag: {
    type: String
  },
  counter: {
    type: Number
  },
  image: {
    type: String
  },
 
}, {
  timestamps: true
});

export default mongoose.model('Favorites', FavoritesSchema);
