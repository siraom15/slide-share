const mongoose = require('mongoose');

const { mongouri } = require('./db.config');
mongoose.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected");
    })
    .catch((error) => {
        console.log(error);
    })
require('../models/SlidesModel');
require('../models/UserModel');
