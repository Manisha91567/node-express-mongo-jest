import express from "express"
import routes from "./src/routes/movie.route"
import mongoose from "mongoose"

const app = express();

app.use(express.json())

app.use("/movies", routes);

app.listen(8080, () => {
    console.log("Server is listing on 8080");
})

mongoose.connect("mongodb://localhost:27017/movies").then(() => {
    console.log("connected to mongodb")
}).catch((error) => {
    console.log("Failed to connect to mongodb", error)
})

export default app