**SETUP**

Node.js and npm: Ensure you have Node.js and npm installed on your machine.

MongoDB: Install MongoDB on your machine. 

Clone the Repository: git clone <repository-url>

Install Dependencies: npm install
This command installs all the necessary dependencies listed in the package.json file.

Start MongoDB: Start your MongoDB server by running the appropriate command for your operating system. 
For example: mongod
Make sure MongoDB is running on the default port (27017).

Run the Application: vnpm start
This command starts your Node.js application. Make sure there are no errors reported during startup.

Once the application is running, you can access the API endpoints using a tool like Postman or by sending HTTP requests programmatically.

Run Tests: npm test


**API DOCUMENTATION**

1. List all movies

Endpoint: GET /movies
Description: Retrieves a list of all movies in the lobby.

2. Search for movies by title or genre

Endpoint: GET /search?q={query}
Description: Searches for movies by title or genre based on the provided query parameter.


3. Add a new movie

Endpoint: POST /movies
Description: Adds a new movie to the lobby.


4. Update a movie

Endpoint: PUT /movies/:id
Description: Updates information of an existing movie in the lobby.

5. Delete a movie

Endpoint: DELETE /movies/:id
Description: Deletes a movie from the lobby.


Postman collection for APIs to test:
https://elements.getpostman.com/redirect?entityId=20622665-68967dc1-624e-4c59-bbbf-0001bbcb52d2&entityType=collection
