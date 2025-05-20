import mongoose from 'mongoose';

const BasketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, // так как есть id у пользователя в базе данных
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
  description: {
    type: String
  },
  country: {
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
  // _id: {
  //   type: String
  // },
  image: {
    type: String
  },

  comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId, // ID пользователя, который оставил комментарий
          ref: 'User', // Ссылка на модель User
          required: true
        },
        text: {
          type: String,
          required: true // Текст комментария
        },
        rating: {
          type: Number, // Можно добавить рейтинг, например от 1 до 5
          min: 1,
          max: 5,
          required: true 
        },
        fullName: String,
        avatarUrl: String,
        date: {
          type: Date,
          default: Date.now // Дата создания комментария
        }
      }
    ]
      ,
 
}, {
  timestamps: true
});

export default mongoose.model('Basket', BasketSchema);
