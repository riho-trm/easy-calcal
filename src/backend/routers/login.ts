import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mysql from "mysql";

const router: express.Router = express.Router();
router.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ri-noahn8a",
  database: "calcCalories",
});

// ハッシュ化のための回数
const saltRounds = 10;
// JWT作成のためのキー
const secret = "foidsDWS82Svg";

// Token確認用ミドルウェア
const authenticate = async (req: any, res: any, next: any) => {
  try {
    const bearToken = await req.headers["authorization"];
    const bearer = await bearToken.split(" ");
    const token = await bearer[1];

    const user = await jwt.verify(token, secret);
    next();
  } catch (err) {
    res.sendStatus(403).json({
      message: "Not authenticated",
    });
  }
};

// テスト用
router.get("/test", (req, res) => {
  const sql = "select * from users";
  connection.query(sql, function (err, result, fields) {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

// ユーザー登録処理
router.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  // SQL文
  const searchUsernameSql = "SELECT user_name FROM users WHERE user_name=?";
  const searchEmailSql = "SELECT mail_address FROM users WHERE mail_address=?";
  const registSql =
    "INSERT INTO users (user_name, mail_address, password, is_admin) VALUES (?,?,?,?)";

  connection.query(searchUsernameSql, [req.body.userName], (err, result) => {
    if (err) throw err;
    if (result.length >= 1) {
      console.log(result);
      connection.query(searchEmailSql, [req.body.email], (err, result) => {
        if (err) throw err;
        // ユーザー名、メールアドレス共に重複
        if (result.length >= 1) {
          console.log(result);
          res.json({
            status: "error",
            message: {
              userName: "このユーザー名は使用されています",
              email: "このメールアドレスは使用されています",
            },
          });
        } else if (result.length === 0) {
          // ユーザー名重複
          console.log(result);
          res.json({
            status: "error",
            message: {
              userName: "このユーザー名は使用されています",
              email: "",
            },
          });
        }
      });
    } else if (result.length === 0) {
      //メールアドレス重複
      console.log(result);
      connection.query(searchEmailSql, [req.body.email], (err, result) => {
        if (err) throw err;
        if (result.length >= 1) {
          console.log(result);
          res.json({
            status: "error",
            message: {
              userName: "",
              email: "このメールアドレスは使用されています",
            },
          });
        } else if (result.length === 0) {
          // 問題ないためユーザー登録処理,ログイン処理
          connection.query(
            registSql,
            [
              req.body.userName,
              req.body.email,
              hashedPassword,
              req.body.isadmin,
            ],
            (err, result) => {
              if (err) throw err;
              console.log(result);
              res.json(result);
            }
          );
        }
      });
    }
  });
});

router.post("/login", async (req, res) => {
  const searchUserSql = "SELECT * FROM users WHERE mail_address=?";
  connection.query(searchUserSql, [req.body.email], async (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      console.log("このアドレスは登録されていません");
      res.json({
        status: "error",
        message: { email: "このアドレスは登録されていません", password: "" },
      });
    } else {
      const match = await bcrypt.compare(req.body.password, result[0].password);
      if (!match) {
        console.log("パスワードが間違っています");
        res.json({
          status: "error",
          message: { email: "", password: "パスワードが間違っています" },
        });
      } else {
        const payload = {
          id: result[0].id,
          userName: result[0].user_name,
          createdAt: result[0].created_at,
        };
        const token = jwt.sign(payload, secret);
        console.log(token);
        res.json({
          status: "success",
          token,
          id: result[0].id,
          userName: result[0].user_name,
          email: result[0].mail_address,
          isAdmin: result[0].is_admin,
        });
      }
    }
  });
});

export default router;
