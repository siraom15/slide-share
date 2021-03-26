const mongoose = require('mongoose');

const SlidesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    describe: {
        type: String,
        default: null
    },
    linkUrl: {
        type: String,
        required: true
    },
    photos: [
        {
            url: {
                type: String,
                default : null
            }
        },
    ],
    public: {
        type: Boolean,
        required: true,
        default: false
    },
    view_count: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.Types.ObjectId,
        default: null
    },
    createTime: {
        type: Date
    }
})

mongoose.model("Slide", SlidesSchema);