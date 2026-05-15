import BranchModel from "../models/Branch.js";

export const getAll = async (req, res) => {
  try {
    const branches = await BranchModel.find();

    res.json(branches);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Filialen konnten nicht geladen werden.",
    });
  }
};

export const search = async (req, res) => {
  try {
    const { q } = req.query;

    const filter = q
      ? {
          $or: [
            { name: { $regex: q, $options: "i" } },
            { store: { $regex: q, $options: "i" } },
            { address: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    const branches = await BranchModel.find(filter);

    res.json(branches);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Suche konnte nicht durchgeführt werden.",
    });
  }
};

export const getNearby = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;

    if (!lat || !lng || !radius) {
      return res.status(400).json({
        message: "lat, lng und radius sind erforderlich.",
      });
    }

    const branches = await BranchModel.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [Number(lng), Number(lat)],
          },
          $maxDistance: Number(radius) * 1000,
        },
      },
    });

    res.json(branches);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Umkreissuche konnte nicht durchgeführt werden.",
    });
  }
};