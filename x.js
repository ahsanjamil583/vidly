// post /api/returns { customerid, movieid}

// Return 401 if client is not logged in
// Return 400 if customerid is not provided
// Return 400 if movieid is not provided
// Return 404 if no rental found for this customer/movie
// Return 400 if rental already processed

// Return 200 if valid request
//set the return date
// calculate rental fee
// increase the stock
// Return the rental
