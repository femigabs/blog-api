const moment = require("moment");
const queries = require("./query");
const db = require("./database");

async function createNewBlog(body) {
    const d = new Date();
    const created_at = moment(d).format("YYYY-MM-DD HH:mm:ss");
    const { name, author, domain } = body;
    const queryObj = {
        text: queries.addNewBlog,
        values: [name, author, domain, created_at, created_at],
    };

    try {
        const { rowCount } = await db.query(queryObj);
        if (rowCount == 0) {
            return Promise.reject({
                status: "error",
                code: 500,
                message: "Could not create blog",
            });
        }
        if (rowCount > 0) {
            return Promise.resolve({
                status: "success",
                code: 201,
                message: "Blog created successfully",
            });
        }
    } catch (e) {
        console.log(e);
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error creating blog",
        });
    }
}

async function checkIfBlogDoesNotExistBefore(name) {
    const queryObj = {
        text: queries.findBlogByName,
        values: [name],
    };
    console.log(name);
    console.log(queries.findBlogByName);
    try {
        const { rowCount } = await db.query(queryObj);
        if (rowCount == 0) {
            return Promise.resolve();
        }
        if (rowCount > 0) {
            return Promise.reject({
                status: "erorr",
                code: 409,
                message: "Blog Already Exists",
            });
        }
    } catch (e) {
        console.log(e);
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error finding blog",
        });
    }
}

async function getAllBlogs() {
    const queryObj = {
        text: queries.findAllBlogs,
    };
    try {
        const { rows } = await db.query(queryObj);
        return Promise.resolve({
            status: "success",
            code: 200,
            message: "Successfully fetch all blogs",
            data: rows,
        });
    } catch (e) {
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error fetching all blogs",
        });
    }
}

async function updateBlogById(id, body) {
    const { name, author, domain } = body;
    const d = new Date();
    const updated_at = moment(d).format("YYYY-MM-DD HH:mm:ss");
    const queryObj = {
        text: queries.updateBlogById,
        values: [name, author, domain, updated_at, id],
    };
    try {
        const { rowCount } = await db.query(queryObj);
        if (rowCount == 0) {
            return Promise.reject({
                status: "erorr",
                code: 500,
                message: "Blog with id not found",
            });
        }
        if (rowCount > 0) {
            return Promise.resolve({
                status: "success",
                code: 200,
                message: "Blog updated successfully",
            });
        }
    } catch (e) {
        console.log(e);
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error updating blog",
        });
    }
}
async function deleteBlogById(id) {
    const queryObj = {
        text: queries.deleteBlogById,
        values: [id],
    };
    try {
        const { rowCount } = await db.query(queryObj);
        if (rowCount == 0) {
            return Promise.reject({
                status: "erorr",
                code: 500,
                message: "Blog with id not found",
            });
        }
        if (rowCount > 0) {
            return Promise.resolve({
                status: "success",
                code: 200,
                message: "Blog deleted successfully",
            });
        }
    } catch (e) {
        return Promise.reject({
            status: "error",
            code: 500,
            message: "Error deleting blog",
        });
    }
}

module.exports = {
    createNewBlog,
    checkIfBlogDoesNotExistBefore,
    getAllBlogs,
    updateBlogById,
    deleteBlogById
};