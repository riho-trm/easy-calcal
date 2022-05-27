import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mysql from "mysql";
import { authenticate } from "../middlewares/authenticate";

const router: express.Router = express.Router();
router.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ri-noahn8a",
  database: "calcCalories",
});

router.get("/nutrientslist", authenticate, (req, res) => {
  const sql = "select * from nutrients";
  connection.query(sql, function (err, result) {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

export default router;
