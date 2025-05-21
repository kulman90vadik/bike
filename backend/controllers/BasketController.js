import BasketModel from '../models/Basket.js';
import ProductModel from '../models/Product.js';



export const getAllBasket = async (req, res) => {
  try {
    const basketItems = await BasketModel.find({ user: req.userId });
    res.json(basketItems);
  } catch (err) {
    console.warm(err);
    res.status(500).json({
      message: "Ошибка при загрузке корзины",
    });
  }
};


export const addToBasket = async (req, res) => {
  try {
    const { id } = req.params; // Получаем ID товара
    // Проверяем, есть ли товар в корзине пользователя
    const existingProduct = await BasketModel.findOne({
      user: req.userId,
      productId: id, // Сравниваем ID продуктаa
    });
    
    
    if (existingProduct) {
      // Удаляем товар из корзины, если он уже существует
      await BasketModel.deleteOne({ _id: existingProduct._id });
    } else {
      // Получаем данные товара из базы, если его нет в корзине
      const product = await ProductModel.findById(id);


      if (!product) {
        return res.status(404).json({
          message: "Товар не найден",
        });
      }
    
      // Создаём новый объект товара для корзины
      const newBasketItem = new BasketModel({
        productId: id, // <-- сохраняем ID товара отдельно
        user: req.userId,
        name: product.name,
        category: product.category,
        price: product.price,
        basePrice: Number(product.price),
        image: product.image,
        flag: product.flag,
        newproduct: product.newproduct,
        counter: product.counter,
        sale: product.sale,
        country: product.country,
        comments: product.comments
      });
    
      // Сохраняем новый товар в корзину
      await newBasketItem.save();
    }
    
    // Возвращаем обновлённую корзину
    const basketItems = await BasketModel.find({ user: req.userId });
    res.json(basketItems);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Ошибка при добавлении товара в корзину",
    });
  }
};



export const counterBasket = async (req, res) => {
  try {
    const { id, action } = req.params; // Получаем ID товара и действие (плюс или минус)

const existingProduct = await BasketModel.findOne({
  user: req.userId,
  productId: id,
});

    if (existingProduct) {
      // Если товар есть в корзине, увеличиваем/уменьшаем счетчик и цену
      if (action === 'plus') {
        existingProduct.counter += 1;
        existingProduct.price = Number(existingProduct.price) + existingProduct.basePrice;
      } else if (action === 'minus' && existingProduct.counter > 1) {
        existingProduct.counter -= 1;
        existingProduct.price = Number(existingProduct.price) - existingProduct.basePrice;
      }

      // Здесь не создаем новый продукт, а просто обновляем данные в корзине
      await existingProduct.save(); // Сохраняем изменения в существующем объекте
    } else {
      // Если товара нет в корзине, возвращаем ошибку
      return res.status(404).json({
        message: "Товар не найден в корзине",
      });
    }

    // Возвращаем обновленную корзину
    const basketItems = await BasketModel.find({ user: req.userId });
    res.json(basketItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Ошибка при добавлении товара в корзину",
      error: err.message,
    });
  }
};




// export const counterBasket = async (req, res) => {
//   try {
//     const { id } = req.params; // Получаем ID товара
//     const { action } = req.params; // Получаем ID товара

//     // Проверяем, есть ли товар в корзине пользователя
//     const existingProduct = await BasketModel.findOne({
//       user: req.userId,
//       _id: id,
//     });

//     if (existingProduct) {
//       // Увеличиваем значение счетчика
//       if(action === 'plus') {
//         existingProduct.counter += 1;
//         existingProduct.price = Number(existingProduct.price) + existingProduct.basePrice;
//       }
//       // Увеличиваем значение счетчика
//       if(action === 'minus' & existingProduct.counter > 1) {
//         // console.log(action);
//         existingProduct.counter -= 1;
//         existingProduct.price = Number(existingProduct.price) - existingProduct.basePrice;
//       }

//       await existingProduct.save(); // Сохраняем изменения
//     } else {
//       // Если товара нет в корзине, проверяем, существует ли он в общем списке товаров
//       const product = await ProductModel.findById(id);

//       if (!product) {
//         return res.status(404).json({
//           message: "Товар не найден",
//         });
//       }

//       // Создаем новый товар в корзине
//       const newBasketItem = new BasketModel({
//         user: req.userId,
//         _id: id,
//         counter: 1, // Начальное значение счетчика
//         ...product.toObject(), // Копируем данные товара
//       });

//       await newBasketItem.save(); // Сохраняем товар в корзину
//     }

//     // Возвращаем обновленную корзину
//     const basketItems = await BasketModel.find({ user: req.userId });
//     res.json(basketItems);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: "Ошибка при добавлении товара в корзину",
//     });
//   }
// };
