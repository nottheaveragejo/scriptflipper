 const mongoose = require('mongoose');
 const port = 3000;


 // import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

 // Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises, important in async/await
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// READY?! Let's go!


 //import the model
 //require('./models/Writing');



// Start our app!
const app = require('./app');
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
// app.set('port', process.env.PORT || 3000);
// const server = app.listen(app.get('port'), () => {
//   console.log(`Express running → PORT ${server.address().port}`);
// });
