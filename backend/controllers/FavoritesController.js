import FavoritesModel from '../models/Favorites.js';
import ProductModel from '../models/Product.js';



export const getAllFavorites = async (req, res) => {
  try {
    const favoritesItems = await FavoritesModel.find({ user: req.userId });
    res.json(favoritesItems);
  } catch (err) {
    // console.war m(err);
    res.status(500).json({
      message: "Ошибка при загрузке favorites",
    });
  }
};


export const addToFavorites = async (req, res) => {
  try {
    const { id } = req.params; // Получаем ID товара

    // Проверяем, есть ли товар в корзине пользователя
    const existingProduct = await FavoritesModel.findOne({
      user: req.userId,
      _id: id, // Сравниваем ID продуктаa
    });
    
    if (existingProduct) {
      // Удаляем товар из корзины, если он уже существует
      await FavoritesModel.deleteOne({ _id: existingProduct._id });
    } else {
      // Получаем данные товара из базы, если его нет в 
      const product = await ProductModel.findById(id);
    
      if (!product) {
        return res.status(404).json({
          message: "Товар не найден",
        });
      }
    
      // Создаём новый объект товара для корзины
      const newFavoritesItem = new FavoritesModel({
        _id: id,
        user: req.userId,
        name: product.name,
        price: product.price,
        image: product.image,
        flag: product.flag,
        newproduct: product.newproduct,
        sale: product.sale
      });
    
      // Сохраняем новый товар в корзину
      await newFavoritesItem.save();
    }
    
    // Возвращаем обновлённую корзину
    const FavoritesItems = await FavoritesModel.find({ user: req.userId });
    
    res.json(FavoritesItems);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Ошибка при добавлении товара в избранное",
    });
  }
};

