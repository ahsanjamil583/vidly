//  status(403)   means forbidden
//  status(401)   means unauthorized
module.exports = function(req, res, next){
  if(!req.user.isAdmin) return res.status(403).send('Access Denied');

  
  // otherwise if user is admin we pass control to other middleware
  next();
}