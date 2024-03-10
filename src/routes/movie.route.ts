import express from "express"
import {
    getMovieList,
    searchList,
    addMovie,
    updateMovie,
    deleteMovie,
} from "../controllers/movie.controller"

import { authMiddleware } from "../middleware/auth"

const router = express.Router()

router.get("/", getMovieList),
router.get("/search", searchList),
router.post("/", authMiddleware, addMovie),
router.put("/:id", authMiddleware, updateMovie),
router.delete("/:id", authMiddleware, deleteMovie)

export default router