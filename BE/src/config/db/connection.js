const mongoose = require('mongoose');

async function connect() {
   try {
      await mongoose.connect('mongodb://localhost:27017/motel');
      console.log('Connect successfuly!');
   } catch (error) {
      console.log('Connect failed!');
   }
}

module.exports = { connect };
