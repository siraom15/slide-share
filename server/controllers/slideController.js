const mongoose = require("mongoose");

const Slide = mongoose.model("Slide");

//create
exports.create_slide = async (req, res) => {
    const { name, describe, linkUrl, photos, public } = req.body;
    const { _id } = req.user_data;
    if (!name || !linkUrl || !_id) return res.status(400).json({
        "error": "Fill the the field"
    });
    const dateNow = Date.now()
    const slide = new Slide({
        name: name,
        describe: describe,
        linkUrl: linkUrl,
        photos: photos,
        public: public,
        view_count: 0,
        createTime: dateNow,
        userId: _id
    });
    slide.save().then(
        data => {
            res.status(201).json({
                success: "created Slide",
                data: data
            })
        }
    ).catch(err => {
        res.status(422).json({
            "error": err
        })
    })

}


//read
exports.get_all_slide = async (req, res) => {
    Slide.find().sort({ createTime: -1 }).then(
        data => {
            res.status(200).json({
                data: data
            })
        }
    ).catch(err => {
        res.status(422).json({
            error: err
        })
    });
}

exports.get_all_public_slide = async (req, res) => {
    Slide.find({ public: true }).sort({ createTime: -1 }).then(
        data => {
            res.status(200).json({
                data: data
            })
        }
    ).catch(err => {
        res.status(422).json({
            error: err
        })
    });

}

exports.get_slide_by_id = async (req, res) => {
    const { _id } = req.body;
    if (!_id) return res.status(400).json({
        "error": "Bad Request"
    })
    Slide.findById(_id).then(data => {
        if (!data) return res.status(422).json({
            "error": "Slide Not Found"
        })
        return res.status(200).json({
            "success": "Slide Found",
            data: data
        })
    }).catch(err => {
        res.status(404).json({
            "error": "Slide Not Found",
            "detail": err
        })
    })
}

exports.get_slide_by_user = async (req, res) => {
    const { _id } = req.user_data;
    if (!_id) res.status(400).json({
        error: "Bad request body"
    })
    Slide.find({ userId: mongoose.Types.ObjectId(_id) })
        .sort({ createTime: -1 })
        .then(data => {
            if (!data) return res.status(200).json({
                "error": "No Slide Data"
            })
            return res.status(200).json({
                "success": "Slide Data Found",
                "data": data
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(200).json({
                "error": ""
            })
        })
}

//update
exports.update = async (req, res, next) => {
    const { slideId } = req.params;
    const { name, describe, public, linkUrl } = req.body;
    const { _id } = req.user_data;
    if (!slideId || !_id) return res.status(400).json({
        "error": "Bad Request"
    })
    Slide.findOneAndUpdate({
        _id: mongoose.Types.ObjectId(slideId),
        userId: mongoose.Types.ObjectId(_id)
    },
        {
            name: name,
            describe: describe,
            public: public,
            linkUrl: linkUrl

        }).then(data => {
            if (!data) {
                return res.status(422).json({
                    "error": "No Slide / Failure Auth"
                })
            }
            return res.status(200).json({
                "success": "Slide Updated"
            })
        })
}



// req.params = slideid
exports.update_name = async (req, res, next) => {
    const { slideId } = req.params;
    const { name } = req.body;
    if (!slideId || !name) return res.status(422).json({
        error: "Invalid arguments"
    })
    Slide.findByIdAndUpdate(slideId, { name: name }).then(
        data => {
            res.status(200).json({
                success: "Updated Slide Name"
            })
        }
    ).catch(err => {
        res.status(422).json({
            error: "Slide not update"
        })
    })
}
exports.update_describe = async (req, res, next) => {
    const { slideId } = req.params;
    const { describe } = req.body;
    if (!slideId || !describe) return res.status(400).json({
        error: "No Slide founded"
    })
    Slide.findByIdAndUpdate(slideId, { describe: describe }).then(
        data => {
            res.status(200).json({
                success: "Updated Slide Name"
            })
        }
    ).catch(err => {
        res.status(422).json({
            error: "Slide not update"
        })
    })
}
exports.update_linkUrl = async (req, res, next) => {
    const { slideId } = req.params;
    const { linkUrl } = req.body;
    if (!slideId || !linkUrl) return res.status(400).json({
        error: "No Slide founded"
    })
    Slide.findByIdAndUpdate(slideId, { linkUrl: linkUrl }).then(
        data => {
            res.status(200).json({
                success: "Updated Slide Name"
            })
        }
    ).catch(err => {
        res.status(422).json({
            error: "Slide not update"
        })
    })
}

exports.increase_view_by_one = async (req, res, next) => {
    const { slideId } = req.params;
    if (!slideId) return res.status(400).json({
        error: "No Slide founded"
    })
    Slide.findByIdAndUpdate(slideId, { $inc: { view_count: 1 } }).then(
        data => {
            res.status(200).json({
                success: "Updated View"
            })
        }
    ).catch(err => {
        res.status(422).json({
            error: "Slide not update"
        })
    })
}

//delete

exports.delete_by_id = async (req, res, next) => {
    const { slideId } = req.params;
    const { _id } = req.user_data;
    if (!slideId || !_id) return res.status(400).json({
        "error": "Bad Request"
    })
    Slide.findOneAndDelete({ _id: mongoose.Types.ObjectId(slideId), userId: mongoose.Types.ObjectId(_id) })
        .then(data => {
            if (!data) return res.status(422).json({
                "error": "No Slide Found / Auth Error"
            })
            res.status(200).json({
                "success": "Delete Slide Success"
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(422).json({
                "error": "Something Wrong"
            })
        })
}