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

router.post("/savemydata", authenticate, (req, res) => {
  const sql =
    "INSERT INTO saved_data (user_id, title, memo, url) VALUES (?,?,?,?)";
  connection.query(
    sql,
    [req.body.userId, req.body.title, req.body.memo, req.body.url],
    (err, result) => {
      if (err) throw err;
      res.json({ status: "success", insertId: result.insertId });
    }
  );
});

router.post("/savemynutrients", authenticate, (req, res) => {
  const sql =
    // 配列でinsertするときのvaluesは?ひとつのみ
    "INSERT INTO saved_nutrients (saved_data_id, nutrient_id, quantity) VALUES ?";
  connection.query(sql, [req.body], (err, result) => {
    if (err) throw err;
    res.json({ status: "success", res: result });
  });
});

router.post("/getmydata", authenticate, (req, res) => {
  const sql = "SELECT * FROM saved_data WHERE user_id=?";
  connection.query(sql, [req.body.userId], (err, result) => {
    if (err) throw err;
    res.json({ status: "success", result: result });
  });
});

router.post("/getmynutrients", authenticate, (req, res) => {
  const sql = "SELECT * FROM saved_nutrients WHERE saved_data_id=?";
  connection.query(sql, [req.body.savedDataId], (err, result) => {
    if (err) throw err;
    res.json({ status: "success", result: result });
  });
});

export default router;
