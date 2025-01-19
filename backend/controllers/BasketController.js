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
      _id: id, // Сравниваем ID продукта
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
        _id: id,
        user: req.userId,
        name: product.name,
        price: product.price,
        image: product.image,
        flag: product.flag,
        stocked: product.stocked,
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
