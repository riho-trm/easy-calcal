import express from "express";
// import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

const router: express.Router = express.Router();

router.use(express.json());

router.get("/api/version", (req: express.Request, res: express.Response) => {
  console.log("/api/version");
  res.json({ version: "0.0.1" });
});

router.post("/api/hello", (req, res) => {
  res.send(`ハロー、 ${req.body.userName}さん`);
});

router.post("/api/test", (req, res) => {
  res.send(`ハロー、 ${req.body.userName}さん`);
});

export default router;
