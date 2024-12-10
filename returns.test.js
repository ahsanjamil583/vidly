const mongoose = require('mongoose');
const moment = require('moment');
const request = require("supertest");
const { Rental } = require('../../models/rental');
const { Movie } = require('../../models/movie');
const { User } = require('../../models/user');
describe('/api/returns', () => {
  let server;
  let rental;
  let movie;
  let customerId;
  let movieId;
  let token;
 
  const exec = async () => {
    return request(server)
      .post('/api/returns')
      .set('x-auth-token', token)
      .send({ customerId, movieId });
  }

  beforeEach( async () => {
    server = require('../../index')

    customerId = new mongoose.Types.ObjectId();
    movieId = new mongoose.Types.ObjectId();
    token = new User().generateAuthToken();
    movie = new Movie({
      _id: movieId,
      title: '12345',
      dailyRentalRate: 2,
      genere: { name: '12345' },
      numberInStock:10,
    });
    await movie.save();
    rental = new Rental({
      customer: {
        _id: customerId,
        name: '12345',
        phone: '12345',
      },
      movie: {
        _id: movieId,
        title: '12345',
        numberInStock:4,
        dailyRentalRate: 2,
      },
    });
    await rental.save();
  }); 
  afterEach( async () => {
    await server.close(); 
    await Rental.deleteMany({});
    await Movie.deleteMany({});
  });
  it('should work!', async () => {
    const result = await Rental.findById(rental._id);
    expect(result).not.toBeNull();
  });
  it('should return 401 not logged in', async () => {
    token = '';
    const res = await exec();
    expect(res.status).toBe(401);
  });
  it('should return 400 if customerId is not provided', async () => {
    customerId = '';
    const res = await exec();
    expect(res.status).toBe(400); 
  });
  it('should return 400 if movieId is not provided', async () => {
    movieId = '';
    const res = await exec();
    expect(res.status).toBe(400); 
  });
  it('should return 400 if no rental found for customer and movie', async () => {
    await Rental.deleteOne();
    const res = await exec();
    expect(res.status).toBe(404); 
  });
  it('should return 400 if rental is aleady processsed', async () => {
    rental.dateReturned = new Date();
    await rental.save();
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it('should return 200 if request is valid ', async () => {
    
    const res = await exec();
    expect(res.status).toBe(200);
  });
  it('should set the return date if input is invalid  ', async () => {
//     it function:

// Yeh ek test case ko define karta hai.
// Test ka naam hai: "should set the return date if input is invalid".
// Matlab: "Agar input ghalat hai, to return date set karni chahiye."
// const res = await exec();:

// Ek exec function call ho raha hai jo shayad rental return ka process perform karta hai.
// await ka matlab hai ke yeh asynchronous operation hai, aur yeh tab tak rukega jab tak exec apna kaam khatam na kare.
// const rentalInDb = await Rental.findById(rental._id);:

// Yeh database se ek rental record ko find kar raha hai jiski id already rental._id hai.
// const diff = new Date() - rentalInDb.dateReturned;:

// Yeh line calculate kar rahi hai ke dateReturned aur current time mein kitna farq (difference) hai.
// new Date(): Current time.
// rentalInDb.dateReturned: Woh time jab rental return hua.
// expect(diff).toBeLessThan(10 * 1000);:

// Yeh assertion hai jo check karta hai ke difference (farq) 10 seconds (10 * 1000 milliseconds) se kam hai ya nahi.
// Matlab: Agar return date abhi abhi set hui hai, to woh test pass karega.
// Test Ka Maqsad:

// Yeh ensure karna ke agar koi ghalat input mile, to system rental ki return date current time ke aas-paas set kare.
// Yeh test kehta hai:

// Agar rental return ka process chala aur input invalid tha, to system return date ko abhi ka waqt (current time) set karega. Test yeh verify karta hai ke yeh kaam 10 seconds ke andar ho raha hai ya nahi.
    const res = await exec();
    const rentalInDb = await Rental.findById(rental._id);
    const diff = new Date() - rentalInDb.dateReturned;
    expect(diff).toBeLessThan(10 * 1000);
  });
  it('should set the rentalFee if input is invalid  ', async () => {

    rental.dateOut = moment().add(-7, 'days').toDate();
    await rental.save();

    const res = await exec();
    const rentalInDb = await Rental.findById(rental._id);
    expect(rentalInDb.rentalFee).toBe(14);
  });
  it('should increase the movie stock if input is invalid  ', async () => {

    
    const res = await exec();
    const movieInDb = await Movie.findById(movieId);
    expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
  });
  it('should return rental if input is invalid  ', async () => {

    
    const res = await exec();
    const rentalInDb = await Rental.findById(rental._id);
    // expect(res.body).toHaveProperty('dateOut');
    // expect(res.body).toHaveProperty('dateReturned');
    // expect(res.body).toHaveProperty('rentalFee');
    // expect(res.body).toHaveProperty('customer');
    // expect(res.body).toHaveProperty('movie');

    expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['dateOut', 'dateReturned', 'rentalFee', 'customer', 'movie']))
  });
});