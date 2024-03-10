import request from "supertest"
import app from "../index"

describe('Movie Controller', () => {
    it('must fetch all movies', async () => {
        const response = await request(app).get("/movies/");
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBe(true)
    })

    it('must search by title or genre', async () => {
        const response = await request(app).get("/movies/search?q=drama");
        expect(response.status).toBe(200)
    })

    it('must add a movie', async () => {
        const newMovie = {
            "title": "New Movie",
            "genre": "Drama",
            "rating": 8.9,
            "streamingLink": "https://example.com/new_movie"
        }
        const headers = {
            role: "admin"
        }
        const response = await request(app).post("/movies/").set(headers).send(newMovie)
        expect(response.status).toBe(200)
        expect(response.body.title).toBe(newMovie.title);
    })

    it('must update existing movie', async () => {
        const newMovie = {
            "rating": 4,
        }
        const headers = {
            role: "admin"
        }
        const movie = await request(app).get("/movies/")
        const id = movie.body[0]._id
        const response = await request(app).put(`/movies/${id}`).set(headers).send(newMovie)
        expect(response.status).toBe(200)
        expect(response.body.rating).toBe(newMovie.rating);
    })

    it('must delete existing movie', async () => {
        const movie = await request(app).get("/movies/")
        const id = movie.body[0]._id
        const headers = {
            'role': 'admin'
          };

        const response = await request(app).delete(`/movies/${id}`).set(headers);
        expect(response.status).toBe(200)
    })
})