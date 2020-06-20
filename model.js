const mongoose = require("mongoose")
const db = require("./connection");
const Schema = mongoose.Schema;
const blogSchema = new Schema(
    {
        name: String, // String is shorthand for {type: String}
        author: String,
        domain: String,
        date: { type: Date, default: Date.now }
    },
    {
        versionKey: false
    }
);
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;