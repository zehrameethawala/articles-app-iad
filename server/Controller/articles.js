import Article from "../Models/articles.js";

export const getArticle = async (req, res) => {
    try {
        const articles = await Article.find({ userId: req.user.id });
        res.status(200).json(articles);
    } catch(err) {
        res.status(404).json({errors: err.message});
    }
};

export const createArticle = async (req, res) => {
    const { _id, date, title, body } = req.body;

    try {
        const newArticle = new Article({
            _id,
            userId: req.user.id,
            date,
            title,
            body
        });
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};