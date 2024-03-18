const exp = require("constants");
const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');

app.use(methodOverride('_method'));

let port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id: uuidv4(),
        username: "Rahul Sharma",
        title: "Fav Language",
        content: "My favorite language is Python",
    }, 
    {
        id: uuidv4(),
        username: "Abhay Rawat",
        title: "My Interests",
        content: "I love to read and write",
    }
];

app.get("/posts",(req,res)=>{
    res.render("index",{posts});
});

app.post("/posts",(req,res)=>{
    let {username,title,content} = req.body;
    content = content.replace(/\n/g, "<br>");
    posts.push({id: uuidv4(),username,title,content});
    res.redirect("/posts");
});
app.get("/posts/new",(req,res)=>{
    res.render("newpost");
});
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find(p => p.id === id);

    if(post===undefined){
        res.send("No such Post found");
    }
    else{
        res.render("show",{post});
    }
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find(p => p.id === id);

    if(post===undefined){
        res.send("No such Post found");
    }
    else{
        res.render("edit",{post});
    }
});
app.patch("/posts/:id",(req,res)=>{
    let content = req.body.content;
    let id = req.params.id;
    console.log(content);
    //content = content.replace(/\n/g, "<br>");
    let post = posts.find(p => p.id === id);
    post.content = content;
    res.redirect("/posts");
});
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter(p => p.id !== id);
    res.redirect("/posts");
});


    