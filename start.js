// const mongoose = require('mongoose');

// // import environmental variables from our variables.env file
// require('dotenv').config({ path: 'variables.env' });

//  // Connect to our Database and handle any bad connections
// mongoose.connect(process.env.DATABASE);
// mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises, important in async/await
// mongoose.connection.on('error', (err) => {
//   console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
// });

// require('./models/Writing');

// // Start our app!
// const app = require('./app');

// app.set('port', process.env.PORT || 7777);
// const server = app.listen(app.get('port'), () => {
//   console.log(`Express running → PORT ${server.address().port}`);
// });

// const mongoose = require('mongoose');
// // READY?! Let's go!

// //import the model
// require('./models/Writing');
// mongoose.model('Writing', writingSchema);


// // import environmental variables from our variables.env file
// require('dotenv').config({ path: 'variables.env' });

// // Connect to our Database and handle any bad connections
// mongoose.connect(process.env.DATABASE);

// mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises, important in async/await
// mongoose.connection.on('error', (err) => {
//   console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
// });



// // Start our app!
// const app = require('./app');

// app.set('port', process.env.PORT || 3000);
// app.listen(3000, () => console.log(`Example app listening on port 3000!`))
// // app.set('port', process.env.PORT || 7777);
// // const server = app.listen(app.get('port'), () => {
// //   console.log(`Express running → PORT ${server.address().port}`);
// // });
