const mongoose = require('mongoose');

const { mongouri } = require('./db.config');
mongoose.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDb");
    })
    .catch((error) => {
        console.error("Failure Connect to MongoDb");
        console.error(error);
    })
require('../models/SlidesModel');
require('../models/UserModel');
