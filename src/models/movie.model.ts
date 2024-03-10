import mongoose , { Document, Schema } from "mongoose"

export interface Imovie extends Document {
    title: string,
    genre: string,
    rating: number,
    link: string
}

const schema = new Schema({
    title: {
        type: String,
        require: true,
    },
    genre: {
        type: String,
        require: true,
    },
    rating: {
        type: Number,
        require: true,
    },
    link: {
        type: String,
        require: true
    }
})

export default mongoose.model<Imovie>('Movie', schema)