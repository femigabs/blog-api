const ObjectId = require('mongoose').Types.ObjectId;
const express = require('express');
const router = express.Router();
const Blog = require("./model");

const blogs = []

router.post("/", (req, res, next) => {
    const {
        name,
        author,
        domain,
        date
    } = req.body;
    if (!name || !author || !domain || !date) {
        return res.status(400).json({
            message: "Please fill all fields"
        });
    }
    next();
}, async (req, res) => {
    const {
        name,
        author,
        domain,
        date
    } = req.body;

    const blog = new Blog(req.body);
    const foundBlog = await Blog.findOne({ name });
    console.log(foundBlog)
    if (foundBlog) {
        return res.status(409).json({
            message: "Blog already exist"
        });
    }

    blog.save().then((result) => {
        return res.status(201).json({
            message: "Blog created successfully"
        });
    }).catch((err) => {
        console.log(err)
        return res.status(500).json({
            message: "Error creating Blog"
        });
    })

});

router.get("/", (req, res) => {
    Blog.find().then((result) => {
        return res.status(200).json({
            data: result
        })
    }).catch((err) => {
        return res.status(500).json({
            message: "Error fetching all blog"
        })
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
        id,
        name,
        author,
        domain,
        date
    } = req.body;
    Blog.findById(id, (err, doc) => {
        if (err) {
            // return error
            return res.status(500).json({
                message: "Error finding blog by id"
            });
        }
        doc.name = name;
        doc.author = author;
        doc.domain = domain;
        doc.date = date;
        doc.save((err, document) => {
            if (err) {
                return res.status(500).json({
                    message: "Error updating blog"
                });
            }
            //return update success
            return res.status(200).json({
                message: "Blog updated successfully"
            });
        });
    });

});

router.delete("/:id", (req, res, next) => {
    const {
        id
    } = req.params;
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Id must be a valid object id"
        });
    }
    next();
},
    (req, res) => {
        const {
            id
        } = req.params
        Blog.deleteOne({ _id: id }, (err, data) => {
            if (err) {
                // return error
                return res.status(400).json({
                    message: "Error deleting blog"
                })
            }
            // return delete success
            return res.status(200).json({
                message: "Blog deleted successfully"
            })
        });
    });


module.exports = router