import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
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
  counter: {
    type: Number
  },
  sale: {
    type: String
  },
  image: {
    type: String
  },

  viewsCount: { // количесвто просмотров статьи
    type: Number,
    default: 0
  },
 
}, {
  timestamps: true
});

export default mongoose.model('Product', ProductSchema);
