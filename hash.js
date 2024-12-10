const bcrypt = require('bcrypt');
const { has } = require('lodash');

// Hashing password ko ek one-way cryptographic process ke zariye transform karna hota hai, jisme asli password ko ek fixed-length, unreadable string mein convert kiya jata hai. Is process ka goal yeh hai ke agar kisi ne hash ko dekh liya, to asli password ko recover karna impossible ho jaye.
// now to hash a password we need a salt. imagine our password is 1234 when we hash them then we get abcd. this hashing algorithm is one way. so we cannot decrypt this to get 1234. so from security point of that is great. so hackers cannot decrypt this hash password. however they can compile a list of popular passwords and hash them and then they look at the database of our application . they find this hash password or they know that abcd represents 1234. so that is why we need a salt.  



async function run(){
  
  console.log(salt);
  console.log(hashed);
}
run();



// output:
// $2b$10$N3YSkZAM4WNFhn5dN.Am7O
// $2b$10$N3YSkZAM4WNFhn5dN.Am7Oy6p93PFFpR5vsF7IJ06hfY3FViMkiDu



// Iska matlab yeh hai ke jab hum kisi user ka password hash karte hain, to hum salt ko password ke saath include karte hain, taake jab user dobara apna password enter kare (plain text mein) to hum usi salt ke saath password ko hash kar sakein aur compare kar sakein.



