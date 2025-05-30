import Keyword from '../models/keyword.model.js';

export const logKeyword = async (req, res) => {
  try {
    const { keyword } = req.body;

    const existing = await Keyword.findOne({ keyword });
    if (existing) {
      existing.count += 1;
      await existing.save();
    } else {
      await Keyword.create({ keyword });
    }

    res.status(200).json({ message: 'Keyword logged' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTopKeywords = async (req, res) => {
  try {
    const keywords = await Keyword.find().sort({ count: -1 }).limit(10);
    res.json(keywords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
