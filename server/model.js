const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    firstName : {type: String, required: true},
    lastName : {type: String, required: true},
    username : {type: String, required: true},
    email : {type: String, required: true},
    password : {type: String, required: true}
});
let Users = mongoose.model('Users', userSchema);

let contactSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true}
});
let Contacts = mongoose.model('Contacts', contactSchema);

let postSchema = new mongoose.Schema({
    postId : {type: String, required: true},
    username: {type: String, required: true},
    fullName: {type: String, required: true},
    likes: {type: Number, required: true},
    comments: {type: Number, required: true},
    post: {type: String, required: true}
});
let Posts = mongoose.model('Posts', postSchema);

let likeSchema = new mongoose.Schema({
    postId : {type: String, required: true},
    username : {type: String, required: true}
});
let Likes = mongoose.model('Likes', likeSchema);

let commentSchema = new mongoose.Schema({
    postId : {type: String, required: true},
    username : {type: String, required: true},
    comment : {type: String, required: true}
});
let Comments = mongoose.model('Comments', commentSchema);


module.exports = {Users, Contacts, Posts, Likes, Comments};