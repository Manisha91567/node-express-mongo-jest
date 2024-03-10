"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movie_controller_1 = require("../controllers/movie.controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/", movie_controller_1.getMovieList),
    router.get("/search", movie_controller_1.searchList),
    router.post("/", auth_1.authMiddleware, movie_controller_1.addMovie),
    router.put("/:id", auth_1.authMiddleware, movie_controller_1.updateMovie),
    router.delete("/:id", auth_1.authMiddleware, movie_controller_1.deleteMovie);
exports.default = router;
