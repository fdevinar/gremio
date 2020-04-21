// REQUIRE MONGOOSE
const mongoose = require('mongoose');
// CREATE SCHEMA
const commentSchema = new mongoose.Schema({
    text: String,
    author: String,
    created: {type: Date, default: Date.now()}
});
// CREATE MODEL BASED ON SCHEMA
const Comment = mongoose.model("Comment", commentSchema);
// EXPORT MODEL
module.exports = Comment;