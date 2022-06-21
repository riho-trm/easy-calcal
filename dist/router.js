"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use(express_1.default.json());
router.get("/api/version", (req, res) => {
    console.log("/api/version");
    res.json({ version: "0.0.1" });
});
router.post("/api/hello", (req, res) => {
    res.send(`ハロー、 ${req.body.userName}さん`);
});
router.post("/api/test", (req, res) => {
    res.send(`ハロー、 ${req.body.userName}さん`);
});
exports.default = router;
//# sourceMappingURL=router.js.map