import ProductModel from '../models/Product.js';


export const getAll = async (req, res) => {
  try {
    const products = await ProductModel.find().populate('user').exec(); // для развёртывания usera информации
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
    ).populate('user')
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