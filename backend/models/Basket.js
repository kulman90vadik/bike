import mongoose from 'mongoose';

const BasketSchema = new mongoose.Schema({
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
  flag: {
    type: String
  },
  category: {
    type: String
  },
  sale: {
    type: String
  },
  counter: {
    type: Number
  },
  basePrice: {
    type: Number
  },
  _id: {
    type: String
  },
  image: {
    type: String
  },
 
}, {
  timestamps: true
});

export default mongoose.model('Basket', BasketSchema);
