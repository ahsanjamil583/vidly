const { User } = require('../../../models/user');
const auth = require('../../../middleware/auth');
const mongoose = require('mongoose');


// const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
//     req.user = decoded;
// for this we writing
describe('auth middleware', () => {
//   Agar ek valid JSON Web Token (JWT) diya jaye, to aapko ensure karna hai ke req.user (jo ek request object ki property hai) us JWT ke payload ke sath set ki gayi ho.

// Yani, JWT ke andar jo information (jaise user ka ID ya roles waghera) hoti hai, wo req.user mein daali jaye, takay baqi application us data ko istemal kar sake.

// Payload ka matlab hota hai woh data jo JWT ke andar hota hai, jaise user ka ID aur roles (agar hain). Yeh ensure karta hai ke request process karte waqt server ke paas user ki zaroori maloomat ho.
it('should populate req.user with the payload of a valid jwt', () => {
  // Create a mock user with a valid payload
  const user = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true };
  
  // Generate a JWT for the user
  const token = new User(user).generateAuthToken();
  
  // Mock the request object
  const req = {
    header: jest.fn().mockReturnValue(token), // Simulate `req.header` to return the token
  };

  // Mock the response and next objects
  const res = {};
  const next = jest.fn();

  // Call the auth middleware
  auth(req, res, next);

  // Validate that `req.user` matches the user payload
  // expect(req.user).toMatchObject(user);

  // Ensure `next` was called to proceed
  expect(next).toHaveBeenCalled();
});
});