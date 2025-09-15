"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookauthcontroller_js_1 = require("../controller/bookauthcontroller.js");
const authRouter = express_1.default.Router();
authRouter.post('/addBook', bookauthcontroller_js_1.addBook);
authRouter.get('/getAllBooks', bookauthcontroller_js_1.getAllbooks);
authRouter.get('/getBookById/:id', bookauthcontroller_js_1.getBookById);
authRouter.delete('/deleteBook/:id', bookauthcontroller_js_1.deleteBook);
authRouter.put('/updateBook/:id', bookauthcontroller_js_1.updateBook);
exports.default = authRouter;
