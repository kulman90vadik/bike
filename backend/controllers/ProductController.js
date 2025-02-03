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