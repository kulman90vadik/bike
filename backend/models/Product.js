import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId, // так как есть id у пользователя в базе данных
  //   ref: 'User', // связь или ссылка на пользователя 
  //   required: false
  // },
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
  flag: {
    type: String
  },
  counter: {
    type: Number
  },
  sale: {
    type: String
  },
  country: {
    type: String
  },
  image: {
    type: String
  },
  description: {
    type: String
  },

  viewsCount: { // количесвто просмотров статьи
    type: Number,
    default: 0
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

      likesUp: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId, // ID пользователя, который оставил комментарий
            ref: 'User', // Ссылка на модель User
            required: true
          },
          like: {
            type: Boolean
          }
        }
      ],

      likesDown: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId, // ID пользователя, который оставил комментарий
            ref: 'User', // Ссылка на модель User
            required: true
          },
          like: {
            type: Boolean
          }
        }
      ],

      avatarUrl: String,
      date: {
        type: Date,
        default: Date.now // Дата создания комментария
      }
    }
  ]



 
}, {
  timestamps: true
});

export default mongoose.model('Product', ProductSchema);

