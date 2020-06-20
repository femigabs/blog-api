const express = require('express');
const router = express.Router();

const blogs = []

router.post("/", (req, res, next) => {
    const {
        id,
        name,
        author,
        domain,
        date
    } = req.body;
    if (!id || !name || !author || !domain || !date) {
        return res.status(400).json({
            message: "Please fill all fields"
        });
    }
    next();
},
    (req, res) => {
        const {
            id,
            name,
            author,
            domain,
            date
        } = req.body;
        const found = checkIfBlogExist(req.body, "post")
        if (found < 0) {
            blogs.push(req.body);
            return res.status(201).json({
                message: "New blog successfully created"
            });
        } else {
            return res.status(409).json({
                message: "Blog already exists"
            });
        }

    });

router.get("/", (req, res) => {
    return res.status(200).json({
        data: blogs,
        message: "Success"
    })
});

router.put("/", (req, res, next) => {
    const {
        id,
        name,
        author,
        domain,
        date
    } = req.body;
    if (!id || !name || !author || !domain || !date) {
        return res.status(400).json({
            message: "Please fill all fields"
        });
    }
    next();
}, (req, res) => {
    const {
        name,
        author,
        domain,
        date
    } = req.body;
    const found = checkIfBlogExist(req.body, "update")
    if (found < 0) {
        return res.status(404).json({
            message: "Blog not found"
        });
    } else {
        blogs[found].name = name;
        blogs[found].domain = domain;
        blogs[found].author = author;
        blogs[found].date = date
        return res.status(200).json({
            message: "Blog updated successfully"
        });
    }

});

router.delete("/:id", (req, res, next) => {
    const {
        id
    } = req.params
    if (!parseInt(id)) {
        return res.status(400).json({
            message: "Id must be an integer"
        })
    }
    next();
},
    (req, res) => {
        const {
            id
        } = req.params
        const obj = {
            id
        }
        const found = checkIfBlogExist(obj, "delete")
        if (found < 0) {
            return res.status(404).json({
                message: "Blog not found"
            });
        } else {
            blogs.splice(found, 1)
            return res.status(200).json({
                message: "Blog delete successfully"
            });
        }
    });


function checkIfBlogExist(newBlog, type) {
    /** this func check if the blog already exist
    * condtion 1 : if type is equal to post, check if blog exist by name,
    * 2: if type == update or delete, check if blog exist by id
    * 3: return postion of blog ((0...)or -1)
    *
    * found = blogs.findIndex((el) => {
    if(el.name == name){
    return true
    }else{
    return false
    }
    })
    */
    let found; //storing the postion of the blog from the big array
    const {
        name,
        id
    } = newBlog;
    if (type == "post") {
        found = blogs.findIndex(el => el.name == name); //findIndex finds the postion of the name in the big blogs array
    } else if (type == "update" || type == "delete") {
        found = blogs.findIndex(el => el.id == id);
    }

    return found;
}


module.exports = router