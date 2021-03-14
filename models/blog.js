const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Blog must have a title.'],
        unique: true,
        uppercase: true,
        trim: true,
    },

})

module.exports = mongoose.model('Blog', blogSchema)