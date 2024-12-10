// const request = require("supertest");
// This is the Supertest library that allows you to send HTTP requests (like GET, POST, etc.) to your API and check the responses.


// const { Genere } = require("../../models/genre");
// This is the Genere model imported from your database model. It is used to interact with the "genres" collection in the database (likely MongoDB in your case).



// beforeEach(() => {
//   server = require("../../index");
// });
// ek Jest lifecycle hook hai jo har test se pehle run hota hai. Yahan, aap apni index.js file ko require karke aur call karke apna server start kar rahe hain (jo ke aapki application ka entry point ho sakta hai). Iska matlab hai ke har test se pehle server start hoga.




// afterEach(async () => {
//   await server.close();
//   await Genere.deleteMany({});
// });
// This is another Jest lifecycle hook that runs after each test.
// server.close(): Closes the server to make sure it doesn't continue running after the test completes.
// Genere.deleteMany({}): This deletes all documents in the Genere collection (i.e., it clears the database of genres). It ensures that each test starts with a clean slate.



// await Genere.collection.insertMany([
//   { name: "genere1" },
//   { name: "genere2" },
// ]);
// You are inserting two documents (genres) into the Genere collection. Each document has a name property, which is either "genere1" or "genere2". This step simulates data being present in your database before making the request.




// const res = await request(server).get("/api/generes");
// request(server).get("/api/generes"): This sends a GET request to the /api/generes endpoint on your server and waits for the response. The response is stored in the res variable.



// expect(res.status).toBe(200);
// expect(res.status).toBe(200): This checks if the HTTP status code of the response is 200, meaning the request was successful.



// expect(res.body.length).toBe(2);
// expect(res.body.length).toBe(2): This checks if the length of the response body is 2, meaning the API should return exactly two genres (since you inserted two genres into the database).



