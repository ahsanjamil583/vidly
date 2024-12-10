// Node.js mein logging errors ka matlab hai errors ko track aur save karna taake unhein analyze kiya ja sake aur future mein unhe resolve karne ke liye help mile. Jab koi error hota hai, usay simply console par print karna (e.g., console.error) ek tariqa hai, lekin bade applications ke liye yeh kafi nahi hota. Logging systems errors ko structured aur organized tarike se save karte hain.




// const { User } = require('../../../models/user');
// const jwt = require('jsonwebtoken');
// const config = require('config');
// const mongoose = require('mongoose');

// describe('user.generateAuthToken', () => {
//   it('should return a valid jwt', () => {
//     const payload = {_id: new mongoose.Types.ObjectId().toHexString(), isAdmin:true}
//     const user = new User(payload);
//     const token = user.generateAuthToken();
//     const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
//     expect(decoded).toMatchObject(payload);
//   });
// });  