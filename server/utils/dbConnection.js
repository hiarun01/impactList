import mongoose from "mongoose";

const db_connection = mongoose.connect(process.env.DB_STRING);
