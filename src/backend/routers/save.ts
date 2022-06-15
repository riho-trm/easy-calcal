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

router.get("/getmydata", authenticate, (req, res) => {
  const sql = "SELECT * FROM saved_data WHERE user_id=?";
  // getメソッドで絞り込み条件を渡す際にはqueryに渡す
  connection.query(sql, [req.query.userId], (err, result) => {
    if (err) throw err;
    res.json({ status: "success", myData: result });
  });
});

router.get("/getmynutrients", authenticate, (req, res) => {
  const sql = "SELECT * FROM saved_nutrients WHERE saved_data_id in (?)";
  connection.query(sql, [req.query.savedDataId], (err, result) => {
    if (err) throw err;
    res.json({ status: "success", myNutrients: result });
  });
});

router.put("/updatesaveddata", authenticate, (req, res) => {
  const sql = "update saved_data set title=?, memo=?, url=? WHERE id=?";
  connection.query(
    sql,
    [req.body.title, req.body.memo, req.body.url, req.body.savedDataId],
    function (err, result) {
      if (err) {
        throw err;
      }
      res.json({ status: "success" });
    }
  );
});

router.put("/updatesavednutrients", authenticate, (req, res) => {
  const sql = "update saved_nutrients set quantity=? WHERE id=?";
  connection.query(sql, [req.body.editedData], function (err, result) {
    if (err) {
      throw err;
    }
    res.json({ status: "success" });
  });
});

router.delete("/deletesavednutrients", authenticate, (req, res) => {
  const sql = "delete from saved_nutrients WHERE id in (?)";
  connection.query(sql, [req.body.savedNutrientsId], function (err, result) {
    if (err) {
      throw err;
    }
    res.json({ status: "success" });
  });
});

router.delete("/deletemydata", authenticate, (req, res) => {
  const sevedDataSql = "delete from saved_data WHERE id=?";
  const savedNutrientsSql = "delete from saved_nutrients WHERE saved_data_id=?";
  console.log(req.body.savedDataId);
  connection.query(
    savedNutrientsSql,
    [req.body.savedDataId],
    function (err, result) {
      if (err) {
        throw err;
      }
      connection.query(
        sevedDataSql,
        [req.body.savedDataId],
        function (err, result) {
          if (err) {
            throw err;
          }
        }
      );
      res.json({ status: "success" });
    }
  );

  connection.query(
    sevedDataSql,
    [req.body.savedDataId],
    function (err, result) {
      if (err) {
        throw err;
      }
      res.json({ status: "success" });
    }
  );
});

export default router;
