import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import router from "./router";
import path from "path";
import mysql from "mysql";
// historyモードでURL遷移を正しく行うためにインストール
import history from "connect-history-api-fallback";
// 非同期処理のなかで例外を投げるとエラーで落ちるので以下をインストール
import domain from "express-domain-middleware";

const app = express();
// historyの使用
app.use(history());
app.use(express.json());
app.use(domain);

const port = process.env.PORT || 3000;
const saltRounds = 10;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const loginRouter = require("./routers/login").default;
app.use("/login", loginRouter);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ri-noahn8a",
  database: "calcCalories",
});

// SQL発行時にデータベースへの接続が行われるので、con.connectの箇所を削除してもコードは動作する
// connection.connect((err) => {
//   if (err) throw err;
//   console.log("Connected");
// });

app.get("/show", (req, res) => {
  const sql = "select * from saved_nutrients";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});

app.post("/logintest", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const sql =
    "INSERT INTO users (user_name, mail_address, password, is_admin) VALUES (?,?,?,?)";
  connection.query(
    sql,
    [req.body.userName, req.body.email, hashedPassword, req.body.isadmin],
    function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.json(result);
    }
  );
});

app.use(router);

// Node.jsの標準モジュールpathが提供しているpath.joinメソッドを使って、
// 実行中のスクリプトのディレクトリ名とpublicというフォルダ名を結合したパスを取得
// 以下を削除するとレンダリングされなくなる
app.use(express.static(path.join(__dirname, "public")));

export default app.listen(port, () => {
  console.log("App is running at http://localhost:3000");
});
