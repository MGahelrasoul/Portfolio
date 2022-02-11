const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema({
    name: String,
    image: String,
    category: String,
    description: String,
    author: String
})

module.exports = mongoose.model("GalleryImage", imageSchema)