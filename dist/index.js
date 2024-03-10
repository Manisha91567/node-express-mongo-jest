"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movie_route_1 = __importDefault(require("./src/routes/movie.route"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/movies", movie_route_1.default);
app.listen(8080, () => {
    console.log("Server is listing on 8080");
});
mongoose_1.default.connect("mongodb://localhost:27017/movies").then(() => {
    console.log("connected to mongodb");
}).catch((error) => {
    console.log("Failed to connect to mongodb", error);
});
exports.default = app;
