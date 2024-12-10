const jwt = require('jsonwebtoken');
const config = require('config') 
module.exports = function (req, res, next){
  // This snippet is typically used in middleware for protecting routes. It checks whether the incoming request contains a valid JSON Web Token (JWT) in the HTTP headers. If no token is provided, the server denies access.
  const token = req.header('x-auth-token');
  if(!token) return res.status(401).send('Access denied. No token provided.');
  console.log('Token Received:', req.header('x-auth-token'));

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
  }
  catch(ex) {
    res.status(400).send('Invalid token.')
  }
}
