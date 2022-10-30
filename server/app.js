const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const model = require('./model');


// dotenv config
dotenv.config();
const port = process.env.PORT;

// MongoDb-Atlas(Database) configuration
const uri = process.env.DBURI;
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("Connected to database!")
}).catch((err)=>{
    console.log(err);
})

// Express configuration
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
try {
    app.use(express.static(path.join(__dirname,'static')));
} catch (error) {console.log(error);}


// JWT Private Key
const jwtPrivateKey = process.env.JWTPRIVATEKEY;

app.post('/login', (req, res)=>{
    let username = req.body.username;
    let password = req.body.password;
    model.Users.findOne({username: username, password: password}, (err, docs)=>{
        if(err){
            console.log(err);
        }else{
            if(docs){
                let token = jwt.sign({
                    'firstName': docs.firstName,
                    'lastName': docs.lastName,
                    'username': docs.username,
                    'email': docs.email
                }, jwtPrivateKey);
                res.send(JSON.stringify({'auth':true, 'token':token}));
            }else{
                res.send(JSON.stringify({'auth':false, 'msg':'Wrong Username or Password!'}));
            }
        }
    });
});

app.post('/signup', (req, res)=>{
    let fname = req.body.fname;
    let lname = req.body.lname;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    model.Users.findOne({username: username}, async (err, docs)=>{
        if(!err){
            if(docs){
                await res.send(JSON.stringify({'redirect':false, 'msg': 'Username has already been taken.'}));
            }else{
                let user = await new model.Users({firstName: fname, lastName: lname, username: username, email: email, password: password});
                user.save((err,result)=>{
                    if(!err){
                        console.log(result);
                        res.send(JSON.stringify({'redirect': true, 'msg': 'Account has been created successfully!'}))
                    }
                })
            }
        }else{
            console.log(err);
        }
    });
});

app.post('/contact', (req,res)=>{
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let msg = req.body.msg;
    let contact = new model.Contacts({firstName: fname, lastName: lname, email: email, message: msg});
    contact.save((err,result)=>{
        if(!err){
            console.log(result);
            res.send(JSON.stringify({'msg':'Message has been sended successfully!'}));
        }
    });
});

app.post('/create-post', (req, res)=>{
    let decoded = jwt.verify(req.body.token, jwtPrivateKey);
    try {
        let username = decoded.username;
        let fullName = `${decoded.firstName} ${decoded.lastName}`;
        let post = req.body.post;
        let postId = username+String(Date.now());
        let createPost = new model.Posts({postId: postId, username: username, fullName: fullName, likes: 0, comments: 0, post: post});
        createPost.save((err,result)=>{
            if(!err){
                console.log(result);
                res.send(JSON.stringify({'msg':'You have created new post.'}));
            }
        });
    } catch (error) {
        console.log(error);
    }
});

app.post('/fetch-all-posts', (req, res)=>{
    model.Posts.find({}, (err, docs)=>{
        if(!err){
            if(docs){
                res.send(JSON.stringify({posts: docs.reverse()}));
            }
        }else{
            console.log(err);
        }
    });
});

app.post('/add-like', (req, res)=>{
    let username = req.body.username;
    if(username){
        let postId = req.body.postId;
        let addLike = new model.Likes({postId: postId, username: username});
        addLike.save((err,result)=>{
            if(!err){
                console.log(result);
                model.Posts.findOneAndUpdate({postId: postId}, {$inc: {likes: 1}},{new: true}, (err,response) =>{
                    if(!err){
                        console.log(response);
                    }
                });
            }
        });
    }
});

app.post('/add-comment', (req,res)=>{
    let username = req.body.username;
    if(username){
        let postId = req.body.postId;
        let comment = req.body.comment;
        let addComment = new model.Comments({postId: postId, username: username, comment: comment});
        addComment.save((err,result)=>{
            if(!err){
                console.log(result);
                model.Posts.findOneAndUpdate({postId: postId}, {$inc: {comments: 1}},{new: true}, (err,response) =>{
                    if(!err){
                        console.log(response);
                    }
                });
            }
        });
    }
});

app.post('/show-comments', (req,res)=>{
    let postId = req.body.postId;
    model.Comments.find({postId: postId}, (err,docs)=>{
        if(!err){
            if(docs){
                res.send(JSON.stringify({'comments':docs}));
            }
        }
    });
});

app.post('/numOfNotif', (req,res)=>{
    let username = req.body.username;
    if(username){
        model.Posts.find({username:username}, async (err,docs)=>{
            if(!err){
                if(docs){
                    let numOfNotif = 0;
                    await docs.map((i)=>{
                        if(i.likes){
                            numOfNotif += Number(i.likes);
                        }
                        if(i.comments){
                            numOfNotif += Number(i.comments);
                        }
                    });
                    await res.send(JSON.stringify({'numOfNotif': numOfNotif}));
                }
            }
        });
    }
});

app.post('/likes-list', (req,res)=>{
    let username = req.body.username;
    let postIdLists = [];
    let likesUserList = [];
    if(username){
        model.Posts.find({username: username}, async (err, docs)=>{
            if(!err){
                if(docs){
                    await docs.map((i)=>{postIdLists.push(i.postId)});
                    model.Likes.find({postId: {$in: postIdLists}}, async (err1, data)=>{
                        if(!err1){
                            if(data){
                                await data.map((d)=>{
                                    likesUserList.push(d);
                                });
                                res.send(JSON.stringify({'likeUsers':likesUserList}));
                            }
                        }
                    });
                }
            }
        });
    }
});

app.post('/comments-list', (req,res)=>{
    let username = req.body.username;
    let postIdLists = [];
    let commentsUserList = [];
    if(username){
        model.Posts.find({username: username}, async (err, docs)=>{
            if(!err){
                if(docs){
                    await docs.map((i)=>{postIdLists.push(i.postId)});
                    model.Comments.find({postId: {$in: postIdLists}}, async (err1, data)=>{
                        if(!err1){
                            if(data){
                                await data.map((d)=>{
                                    commentsUserList.push(d);
                                });
                                res.send(JSON.stringify({'commentUsers':commentsUserList}));
                            }
                        }
                    });
                }
            }
        });
    }
});

// Running a Backend App
app.listen(port, ()=>{
    console.log(`Open in Browser : http://127.0.0.1:${port}`);
});