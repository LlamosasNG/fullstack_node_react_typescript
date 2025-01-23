import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";

// Conection to DB
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.yellow.bold("Database is connected"));
  } catch (error) {
    console.log(error);
    console.log(colors.red.bold("Error to connect to DB"));
  }
}
connectDB();

// Create instance of express
const server = express();

// Enable connections
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
server.use(cors(corsOptions));

// Read form data
server.use(express.json());
server.use(morgan("dev"));
server.use("/api/products", router);

export default server;
