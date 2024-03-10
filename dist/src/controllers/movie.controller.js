"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.addMovie = exports.searchList = exports.getMovieList = void 0;
const movie_model_1 = __importDefault(require("../models/movie.model"));
const cache_1 = require("../middleware/cache");
const getMovieList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const key = 'allMovies';
        const result = yield (0, cache_1.getDataFromCacheOrDatabase)(key, () => __awaiter(void 0, void 0, void 0, function* () {
            return yield movie_model_1.default.find();
        }));
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getMovieList = getMovieList;
const searchList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.q;
        const result = yield movie_model_1.default.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { genre: { $regex: query, $options: "i" } }
            ]
        });
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.searchList = searchList;
const addMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newMovie = new movie_model_1.default(req.body);
        const savedMovie = yield newMovie.save();
        (0, cache_1.clearCacheForKey)('allMovies');
        res.status(200).json(savedMovie);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.addMovie = addMovie;
const updateMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedMovie = yield movie_model_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedMovie) {
            (0, cache_1.clearCacheForKey)('allMovies');
            res.status(200).json(updatedMovie);
        }
        else {
            res.status(400).json({ message: "Movie Not Found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateMovie = updateMovie;
const deleteMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedMovie = yield movie_model_1.default.findByIdAndDelete(id);
        if (deletedMovie) {
            (0, cache_1.clearCacheForKey)('allMovies');
            res.status(200).json({ message: "Movie deleted successfully" });
        }
        else {
            res.status(400).json({ message: "Movie Not Found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteMovie = deleteMovie;
