const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const { JWTSECRET } = require('../config/jwt');
const saltRounds = 3;
const jwt = require('jsonwebtoken');

exports.create_user = (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) return res.status(401).json({ error: "Please complete the form" });
    User.findOne({
        "$or": [{
            username: username
        }, {
            email: email
        }]
    }).then(result => {
        if (result) return res.status(401).json({
            "error": "Email Or Username is already used"
        })
    })
    bcrypt.hash(password, saltRounds, function (err, hash) {
        const user = new User({
            username: username,
            email: email,
            password: hash
        });
        user.save().then(response => {
            return res.status(200).json({
                "success": "Sign Up Success",
                "data": response
            })
        })
    });

}

exports.check_user = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({
        "error": "Please fill the form"
    })

    User.findOne({ email: email }).then(
        user => {
            if (!user) return res.status(400).json({
                "error": "Doesn't have this email"
            })
            bcrypt.compare(password, user.password, (err, result) => {
                const token = jwt.sign({ _id: user._id }, JWTSECRET, { expiresIn: '12h' });
                res.status(200).json({
                    "success": "Login Success",
                    "token": token
                })
            })
        }
    )
}

exports.search_user = (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({
        "error": "Please fill the form"
    });
    User.findById(userId).then(data => {
        if (!data) return res.status(200).json({
            "error": "Don't have this user"
        })
        data.password = undefined
        res.status(200).json({
            "success": "Founded",
            "user_data": data
        })
    }).catch(err => {
        console.log(err);
        return res.status(200).json({
            "error": "Don't have this user"
        })
    })
}

// has req.body.slide_id
exports.save_slide = (req, res) => {
    const { _id } = req.user_data;
    const { slideId } = req.body;
    if (!_id && slideId) return res.status(400).json({
        "error": "Bad Request"
    })
    User.findByIdAndUpdate(_id,
        { $push: { savedSlide: mongoose.Types.ObjectId(slideId) } }
    )
        .then(data => {
            if (!data) return res.status(200).json({
                "error": "Data didn't Update"
            })

            return res.status(200).json({
                "error": "Data Updated"
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(200).json({
                "error": "Data didn't Update",
                "detail": err
            })
        })
}