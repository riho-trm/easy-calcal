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

router.post("/registestimatedquantity", authenticate, (req, res) => {
  const sql =
    "INSERT INTO food_estimated_quantity (classification_id, nutrient_id, food_name_todisplay, unit, standard_quantity, include_disposal) VALUES (?,?,?,?,?,?)";
  connection.query(
    sql,
    [
      req.body.classificationId,
      req.body.nutrientId,
      req.body.foodNameTodisplay,
      req.body.unit,
      req.body.standardQuantity,
      req.body.includeDisposal,
    ],
    (err, result) => {
      if (err) throw err;
      console.log("サーバーのestimatedQuantity登録の結果");
      console.log(result);
      res.json({ status: "success" });
    }
  );
});

router.get("estimatedquantitylist", authenticate, (req, res) => {
  const sql = "select * from food_estimated_quantity";
  connection.query(sql, function (err, result) {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

export default router;
