const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    savedSlide: [
        {
            type: mongoose.Types.ObjectId,
            default: null
        }
    ]
});

mongoose.model("User", UserSchema);