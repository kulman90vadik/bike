import ProductModel from '../models/Product.js';
import UserModel from '../models/User.js';

export const addComment = async (req, res) => {
  try {
    const { text, rating } = req.body;
    const productId = req.params.id;
    const userId = req.userId; // Получен из токена
    const user = await UserModel.findById(userId);
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Продукт не найден' });
    }
    // if (rating == 0) {
    //   return res.status(404).json({ message: 'Рейтинг хуйня' });
    // }
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      { _id: productId },
      {
        $push: {
          comments: {
            user: userId,
            fullName: user.fullName, // Имя пользователя из модели User
            avatarUrl: user.avatarUrl, // URL аватара пользователя
            text: text,
            rating: rating,
            date: new Date(),
          },
        },
      },
      { runValidators: true }
    );

    if (updatedProduct.nModified === 0) {
      return res.status(400).json({ message: 'Комментарий не добавлен' });
    }

    // Возвращаем обновлённый продукт с комментариями
    const updatedProductWithComments = await ProductModel.findById(productId);
    res.status(200).json(updatedProductWithComments);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка при добавлении комментария', error: err.message });
  }
};

// likeComment

export const likeComment = async (req, res) => {
  try {
    const { id, action, idComment } = req.params; // Получаем ID товара и действие (плюс или минус)
    const userId = req.userId; // Получен из токена
    // const user = await UserModel.findById(userId);

    if (!['likeUp', 'likeDown'].includes(action)) {
      return res.status(400).json({ message: 'Неверное действие' });
    }

    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Продукт не найден' });
    }

    const comment = product.comments.find( (c) => c._id.toString() === idComment );

    if (!comment) {
      return res.status(404).json({ message: 'Комментарий не найден' });
    }

    if (action === 'likeUp') {
      // Проверяем, есть ли уже лайк от этого пользователя
      const existingLike = comment.likesUp.find(like => like.user.toString() === userId);
      


      const existingLikeDown = comment.likesDown.find(like => like.user.toString() === userId);
      if (existingLikeDown) {
        // Если лайк уже есть, удаляем его
        comment.likesDown = comment.likesDown.filter(like => like.user.toString() !== userId);
      }



      if (existingLike) {
        // Если лайк уже есть, удаляем его
        comment.likesUp = comment.likesUp.filter(like => like.user.toString() !== userId);
      } else {
        // Если лайк не найден, добавляем новый лайк
        comment.likesUp.push({ user: userId, like: true });
      }
    } 
    // Логика для likesDown
    else if (action === 'likeDown') {
      // Проверяем, есть ли уже отрицательный лайк от этого пользователя
      const existingLike = comment.likesDown.find(like => like.user.toString() === userId);


      const existingLikeUp = comment.likesUp.find(like => like.user.toString() === userId);
      if (existingLikeUp) {
        // Если лайк уже есть, удаляем его
        comment.likesUp = comment.likesUp.filter(like => like.user.toString() !== userId);
      }



      if (existingLike) {
        // Если лайк уже есть, удаляем его
        comment.likesDown = comment.likesDown.filter(like => like.user.toString() !== userId);
      } else {
        // Если лайк не найден, добавляем новый лайк
        comment.likesDown.push({ user: userId, like: true });
      }
    } else {

      return res.status(400).json({ message: 'Неверное действие' });
      
    }

    await product.save(); // сохраняем продукт с обновленным комментарием

    res.json(product); // возвращаем обновленный продукт

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Ошибка like",
      error: err.message,
    });
  }
};


export const editComment = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;
    const { text, rating } = req.body;

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const comment = product.comments.id(reviewId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Обновляем текст и рейтинг комментария
    comment.text = text;
    comment.rating = rating;

    // Сохраняем изменения
    await product.save();

    // return res.status(200).json({ message: "Comment updated successfully", product });
    return res.status(200).json({ message: "Comment updated successfully", updatedComment: comment });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}




export const removeComment = async (req, res) => {
  try {
    const productId = req.params.id;
    const reviewId = req.params.idComment;

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Продукт не найден' });
    }

    await ProductModel.updateOne(
      { _id: productId },
      { $pull: { comments: { _id: reviewId } } }
    );

    // Возвращаем только id удалённого комментария
    res.json({
      message: 'Комментарий успешно удален',
      deletedCommentId: reviewId, // 👈 Вот это фронтенду и нужно
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить комментарий',
    });
  }
};


export const getAll = async (req, res) => {
  try {
    const products = await ProductModel.find().exec(); // для развёртывания usera информации
    res.json(products);
  }

  catch(err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить продукты",
    });
  }
}

export const getOne = async (req, res) => {
  try {
    const productId = req.params.id; // Получаем ID из параметров

    // Обновляем viewsCount и возвращаем обновленный документ
    // если просто получить то findBId вроде
    const doc = await ProductModel.findOneAndUpdate(
      { _id: productId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' } // Возвращаем обновленный документ
    )
    if (!doc) {
      return res.status(404).json({
        message: 'Продукт не найден',
      });
    }

    res.json(doc);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить продукт',
    });
  }
};

export const sortProducts = async (req, res) => {

  try {
    const { sort, filter, category, branding, country } = req.query;
    // Определяем порядок сортировки
    const sortOrder = sort === "asc" ? 1 : sort === "desc" ? -1 : null;
    // Формируем фильтр
    let filterCondition = {};
    // Обрабатываем параметр категории
    if (category) {
      const categoryName = category.trim().replace(/\s+/g, ''); // Убираем пробелы
      if (categoryName === 'allbranding') {
        filterCondition.category = { $exists: true }; // Все товары
      } else {
        filterCondition.category = categoryName; // Фильтруем по категории
      }
    }

    // Применяем фильтр по полю sale
    if (filter === "sale") {
      filterCondition.sale = { $ne: "0" }; // Оставляем только товары, где sale НЕ "0%"
    } else if (filter === "new") {
      filterCondition.newproduct = true; // Фильтруем по новинкам
    }

    // Обрабатываем параметр branding (один бренд)
    if (branding) {
      const brandingValue = branding.trim().replace(/\s+/g, ''); // Убираем пробелы из branding
      if (brandingValue === "allbranding") {
        filterCondition.brand = { $exists: true }; // Все бренды
      } else {
        filterCondition.brand = brandingValue; // Фильтруем по одному бренду
      }
    }

    if (country) {
      const countryName = country.trim().replace(/с/g, "c");
      if (countryName.toLowerCase() === "allcountry") {
        filterCondition.country = { $exists: true };
      } else {
        filterCondition.country = { $regex: new RegExp(`^${countryName}$`, "i") }; // Игнорирование регистра
      }
    }

    const query = ProductModel.find(filterCondition);
    if (sortOrder) query.sort({ price: sortOrder });

    const products = await query;
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }

  
};

export const topProducts = async (req, res) => {
  try {
    const topProducts = await ProductModel.find()
      .sort({ viewsCount: -1 }) // Сортируем по полю viewsCount в порядке убывания
      .limit(6); // Ограничиваем результат 5 продуктами

    res.json(topProducts);
  } catch (error) {
    console.error('Ошибка сервера:', error.message);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
}