import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import Article from "./Models/articles.js";
import articleRoute from "./Routes/articles.js";
import authRoute from "./Routes/auth.js";
import connectDB from "./connectDB.js";


//  Dummy Data 

// const dummyArticles = [
//     {
//       _id: "article-001",
//       date: new Date("2025-04-01"),
//       title: "Introduction to Express.js",
//       body: "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications."
//     },
//     {
//       _id: "article-002",
//       date: new Date("2025-04-03"),
//       title: "MongoDB for Beginners",
//       body: "MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas."
//     },
//     {
//       _id: "article-003",
//       date: new Date("2025-04-07"),
//       title: "RESTful API Design",
//       body: "REST is an architectural style for designing networked applications. RESTful applications use HTTP requests to perform CRUD operations on data."
//     }
//   ];


// Read env
dotenv.config();

// CONFIGURATION
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// APP 
const app = express();

// MIDDLEWARE 
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use("/auth", authRoute);
app.use("/articles",articleRoute);
app.get("/",(req,res) =>{
    res.status(200).json("Hassan Ahmed Khan B21110006041")
})


const PORT = process.env.PORT || 6001;

connectDB();

app.listen(PORT,()=>{
    console.log(`Server Listen on ${PORT}`)
    // Article.insertMany(dummyArticles)
});