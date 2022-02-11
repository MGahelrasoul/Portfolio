var express     = require("express"),
    router      = express.Router(),
    Blog       = require("../models/blogs")

//INDEX
router.get("/", (req, res) =>{
    res.redirect("/techblog/blogs");
});
router.get("/blogs", (req, res) =>{
    Blog.find({}, (err, blogs) =>{
        if(err){
            console.log("ERROR");
        } else {
            res.render("techblog/index", {blogs: blogs});
        }
    });
});

//NEW
router.get("/blogs/new", (req, res) =>{
    res.render("techblog/new");
});

//CREATE
router.post("/blogs", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.create(req.body.blog, (err, newBlog) => {
        if(err) {
            res.render("techblog/new");
        } else {
            res.redirect("/techblog/blogs");
        }
    });
})

//SHOW
router.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) =>{
        if(err) {
            res.redirect("/techblog/blogs");
        } else {
            res.render("techblog/show", {blog: foundBlog});
        }
    });
});

//EDIT
router.get("/blogs/:id/edit", (req, res) =>{
    Blog.findById(req.params.id, (err, foundBlog)=>{
        if(err) {
            res.redirect("/techblog/blogs");
        } else {
            res.render("techblog/edit", {blog: foundBlog});
        }
    });
});

//UPDATE can also be POST if not using resful
router.put("/blogs/:id", (req, res) =>{
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog)=>{
        if(err){
            res.redirect("/techblog/blogs");
        } else {
            res.redirect("/techblog/blogs/" + req.params.id);
        }
    });
});

//DELETE can also be GET if not using restful
router.delete("/blogs/:id", (req, res)=>{
    Blog.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            console.log(err)
            res.redirect("/techblog/blogs");
        } else {
            res.redirect("/techblog/blogs");
        }
    });
});

module.exports = router