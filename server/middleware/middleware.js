const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model("User");
const { JWTSECRET } = require('../config/jwt');

exports.checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({
        "error": "You must login first"
    })
    const token = authorization.trim().replace("Bearer ", "");
    try {
        let data = jwt.verify(token, JWTSECRET);
        User.findOne({ _id: data._id }).then(data => {
            req.user_data = data;
            next();
        })
            .catch(err => {
                return res.status(401).json({
                    "error": "You must login first"
                })
            })
    } catch (err) {
        return res.status(401).json({
            "error": "Token Invalid Please Login first"
        })
    }
}