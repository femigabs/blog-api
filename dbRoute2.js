const express = require("express");
const router = express.Router();

const {
    checkIfBlogDoesNotExistBefore,
    createNewBlog,
    getAllBlogs,
    updateBlogById,
    deleteBlogById,
} = require("./blogService");

router.post(
    "/",
    (req, res, next) => {
        const { name, author, domain } = req.body;
        if (!name || !author || !domain) {
            return res.status(400).json({
                message: "Please fill all fields",
            });
        }
        next();
    },
    async (req, res) => {
        const { name } = req.body;
        try {
            await checkIfBlogDoesNotExistBefore(name);
            const result = await createNewBlog(req.body);
            return res.status(201).json(result);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    }
);

router.get("/", async (req, res) => {
    try {
        const result = await getAllBlogs();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(e.code).json(e);
    }
});

router.put(
    "/:id",
    (req, res, next) => {
        const { id } = req.params;
        if (!parseInt(id)) {
            return res.status(400).json({
                message: "Id must be an integer",
            });
        }
        next();
    },
    (req, res, next) => {
        const { name, author, domain } = req.body;
        if (!name || !author || !domain) {
            return res.status(400).json({
                message: "Please fill all fields",
            });
        }
        next();
    },
    async (req, res) => {
        const { id } = req.params;
        try {
            const result = await updateBlogById(id, req.body);
            return res.status(200).json(result);
        } catch (e) {
            console.log(e);
            return res.status(e.code).json(e);
        }
    }
);

router.delete(
    "/:id",
    (req, res, next) => {
        const { id } = req.params;
        if (!parseInt(id)) {
            return res.status(400).json({
                message: "Id must be an integer",
            });
        }
        next();
    },
    async (req, res) => {
        const { id } = req.params;
        try {
            const result = await deleteBlogById(id);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(e.code).json(e);
        }
    }
);

module.exports = router;