import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var blogMemory = [];
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

// post cration
// post view
// post update and delete
app.get("/", (req, res) =>{
    res.render("main.ejs", {blogsArr: blogMemory});
});
app.post("/submit", (req, res) => {
    blogMemory.push(req.body.blog_text);
    res.render("main.ejs", {blogsArr: blogMemory});
});
app.get("/edit", (req, res) => {
    const i = req.query.index;
    res.render("edit.ejs", {text: blogMemory[0], index: i});
});
app.post("/submit_edit", (req, res) => {
    blogMemory[req.body.index] = req.body.edit_blog;
    console.log("Index is:" + req.body.index);
    console.log("New memo: " + blogMemory);
    res.render("main.ejs", {blogsArr: blogMemory});
});
app.post("/delete",(req, res) => {
    const index = req.body.index;
    blogMemory.splice(index, 1);
    res.render("main.ejs", {blogsArr: blogMemory});
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});