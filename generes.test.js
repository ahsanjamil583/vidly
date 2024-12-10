const mongoose = require('mongoose');
const request = require("supertest");
const { Genere } = require("../../models/genre");
const { User } = require("../../models/user");
let server;
describe('/api/generes', () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach( async () => {
    await server.close();
    await Genere.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all generes", async () => {
      
      await Genere.collection.insertMany([
        { name: "genere1" },
        { name: "genere2" },
      ]);

      const res = await request(server).get("/api/generes");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.name === "genere1")).toBeTruthy();  // Check if 'genere1' is present in the response
      expect(res.body.some(g => g.name === "genere2")).toBeTruthy();  // Check if 'genere2' is present in the response
    });
  });

  describe('Get /:id', () => {
    it('should return specific genere', async () => {
      const genere = new Genere({name: 'genere1'});
      await genere.save();

      const res = await request(server).get(`/api/generes/${genere._id}`, genere._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', genere.name);
    });
    
    it('should return 404 if invalid id is passed', async () => {
      const res = await request(server).get(`/api/generes/1`);
      //we make changes in generes.js for this test
      // if(!mongoose.Types.ObjectId.isValid(req.params.id))
      //   return res.status(404).send('Invalid id.');
      expect(res.status).toBe(404); 
    });
  });
  it('should return 404 if no genere with the given id exists', async () => {
    const id = new mongoose.Types.ObjectId();
    const res = await request(server).get(`/api/generes/` + id);
    //we make changes in generes.js for this test
    // if(!mongoose.Types.ObjectId.isValid(req.params.id))
    //   return res.status(404).send('Invalid id.');
    expect(res.status).toBe(404); 
  });
  describe('POST /', () => {
    it('should return 401 if client is not loggged in', async () => {
      const res = await request(server).post('/api/generes').send({ name: 'genere1' }); 

      expect(res.status).toBe(401);
    });

    // let us assume that client is logged in but is sending an invlid genere
    it('should return 400 if genere is less than 5 characters ', async () => {
      const token = new User().generateAuthToken();

      const res = await request(server)
        .post('/api/generes')
        .set('x-auth-token', token)
        .send({ name: '1234' });

      expect(res.status).toBe(400);
    }); 

    // with the above token we cannot send genere above 50 characters 
    it('should return 400 if genere is more than 50 characters', async () => {
       const token = new User().generateAuthToken();

      const name = new Array(52).join('a');

       const res = await request(server)
        .post('/api/generes')
        .set('x-auth-token', token)
        .send({ name: name})

       expect(res.status).toBe(400);
    });

    // Happy test for this
    // let genere = new Genere ({name: req.body.name})
    // await genere.save()
    it('should save the genere if it is valid', async () => {
      const token = User().generateAuthToken();

      const res = await request(server)
        .post('/api/generes')
        .set('x-auth-token', token)
        .send({ name: 'genere1' });
      
      const genere = await Genere.find({ name: 'genere1' });
      expect(genere).not.toBeNull();
    });

    // res.send(genere);
    it('should return genere if it is valid', async () => {
      const token = User().generateAuthToken();

      const res = await request(server)
        .post('/api/generes')
        .set('x-auth-token', token)
        .send({ name: 'genere1' });

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'genere1');
    });
  });
  describe('PUT /:id', () => {
    it('should return 400 if no genere', async () => {
      const id = new mongoose.Types.ObjectId();
      const res = await request(server).put('/api/generes/' + id).send({});

      expect(res.status).toBe(400);
    });
    it('should return 404 if id is invalid', async () => {
      let id = 1;
      const res = await request(server)
        .put('/api/generes/')
        .send({_id: id})
      expect(res.status).toBe(404);
    });
    it('should return 404 if genere if less then 5 characters', async () => {
      const id = new mongoose.Types.ObjectId();
      let newname = '1234';
      const res = await request(server)
        .put('/api/generes' + id)
        .send({_id: id, name: newname})
      expect(res.status).toBe(404);
    });
    it('should return 400 if genere if greater then 50 characters', async () => {
      const id = new mongoose.Types.ObjectId();
      let newname = new Array(52).join('a');
      const res = await request(server)
        .put('/api/generes/' + id)
        .send({_id: id, name: newname})
      expect(res.status).toBe(400);
    });
    it('should return 404 if the genere with the given id was not found', async () => {
      const id = new mongoose.Types.ObjectId();
      const res = await request(server)
        .put(`/api/generes/${id}`)
        .send({name: 'wowdsfvsgds'})
      expect(res.status).toBe(404);
    });
    it('should update the genere if input is valid', async () => {
      let genere = new Genere({ name: 'genere1' });
      await genere.save();
      const newname = 'updataname';
      const res = await request(server)
        .put(`/api/generes/${genere._id}`)
        .send({ name: newname});
      const updateGenere = await Genere.findById(genere._id);
      expect(updateGenere.name).toBe(newname);
    });
    it('should return updated genere', async () => {
      let genere = new Genere({ name: 'genere1' });
      await genere.save();
      const newname = 'updataname';
      const res = await request(server)
        .put(`/api/generes/${genere._id}`)
        .send({ name: newname});
      const updateGenere = await Genere.findById(genere._id);
      expect(res.body).toHaveProperty('_id')
      expect(res.body).toHaveProperty('name', newname);
      // expect(res.status).toBe(200);
      
    });
  });
});
