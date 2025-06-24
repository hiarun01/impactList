import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import {postRoutes} from "./routes/post.routes.js";
import connectDB from "./utils/dbConnection.js";
import cors from "cors";

dotenv.config({});

const app = express();

// cors middleware

let MODE = process.env.MODE;

if (MODE === "dev") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
} else if (MODE === "prod") {
  app.use(
    cors({
      origin: "https://impact-list.vercel.app",
    })
  );
}

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api", postRoutes);

app.listen(PORT, () => {
  console.log("server running at :", PORT);
  connectDB()
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Database connection failed:", error);
    });
});
