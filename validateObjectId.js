const mongoose = require('mongoose');
module.exports = function(req, res, next) {
  // we are validating the id is valid if it is not then it will return 404 error
  if(!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send('Invalid id.');

  next();
}