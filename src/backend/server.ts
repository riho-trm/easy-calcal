import express from "express";
import router from "./router";
import path from "path";
import mysql from "mysql";

const app = express();
const port = 3000;

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

app.get("/test", (req, res) => {
  const sql = "select * from users";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});
app.use(router);

// Node.jsの標準モジュールpathが提供しているpath.joinメソッドを使って、
// 実行中のスクリプトのディレクトリ名とpublicというフォルダ名を結合したパスを取得
// 以下を削除するとレンダリングされなくなる
app.use(express.static(path.join(__dirname, "public")));

export default app.listen(port, () => {
  console.log("App is running at http://localhost:3000");
});
