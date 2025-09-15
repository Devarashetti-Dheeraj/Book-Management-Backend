"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const authBookRoutes_js_1 = __importDefault(require("./route/authBookRoutes.js"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api', authBookRoutes_js_1.default);
const mongouri = process.env.Mongo_URI;
mongoose_1.default.connect(mongouri || "mongodb+srv://dheeraj2032006_db_user:E6XfPVS7ROw7hnf2@cluster0.x8nvyzs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { dbName: "Book_Management" })
    .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
        console.log("Server has Started on Port", process.env.PORT);
    });
})
    .catch((err) => {
    console.log(err);
});
