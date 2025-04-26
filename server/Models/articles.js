import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    _id: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
});
  
const Article = mongoose.model('Article', articleSchema);
export default Article;