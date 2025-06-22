import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config({});

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server running at :", PORT);
});
