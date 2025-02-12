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
    const { sort, filter, category } = req.query;

    // Определяем порядок сортировки (если sort не указан, сортировку не применяем)
    const sortOrder = sort === "asc" ? 1 : sort === "desc" ? -1 : null;

    // Формируем фильтр
    let filterCondition = {};

    if (category && category !== "all") {
      const categoriesArray = category.split(','); // Разбиваем строку в массив
      filterCondition.category = { $in: categoriesArray }; // Фильтруем по категориям
    }

    // Применяем фильтр по полю sale
    if (filter === "sale") {
      filterCondition.sale = { $exists: true }; // Фильтруем товары, у которых есть поле sale
    } else if (filter === "new") {
      filterCondition.newproduct = true; // Фильтруем по новинкам
    }

    // Выполняем запрос (применяем сортировку только если она передана)
    const query = ProductModel.find(filterCondition);
    
    // Применяем сортировку, если она задана
    if (sortOrder) query.sort({ price: sortOrder });

    const products = await query;
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};
