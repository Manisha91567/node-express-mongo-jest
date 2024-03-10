import { Request, Response } from "express";
import movieModel from "../models/movie.model";
import { getDataFromCacheOrDatabase, clearCacheForKey } from "../middleware/cache";

export const getMovieList = async (req: Request, res: Response): Promise<void> => {
    try {
        const key = 'allMovies'; 
        const result = await getDataFromCacheOrDatabase(key, async () => {
            return await movieModel.find();
        });
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const searchList = async (req: Request, res: Response): Promise<void> => {
    try {
        const query = req.query.q;
        const result = await movieModel.find({
            $or : [
                { title: { $regex : query, $options: "i" } },
                { genre: { $regex : query, $options: "i" } }
            ]
        });
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const addMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const newMovie = new movieModel(req.body);
        const savedMovie = await newMovie.save();
        clearCacheForKey('allMovies');
        res.status(200).json(savedMovie);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const updateMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedMovie = await movieModel.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedMovie) {
            clearCacheForKey('allMovies');
            res.status(200).json(updatedMovie);
        } else {
            res.status(400).json({ message: "Movie Not Found" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedMovie = await movieModel.findByIdAndDelete(id);
        if (deletedMovie) {
            clearCacheForKey('allMovies');
            res.status(200).json({ message: "Movie deleted successfully" });
        } else {
            res.status(400).json({ message: "Movie Not Found" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
