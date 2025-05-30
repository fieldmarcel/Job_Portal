import mongoose from 'mongoose';

const keywordSchema = new mongoose.Schema({
  keyword: { type: String, unique: true },
  count: { type: Number, default: 1 },
});

export default mongoose.model('Keyword', keywordSchema);
