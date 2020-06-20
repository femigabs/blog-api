const queries = {
    addNewBlog: `
    INSERT INTO blog(
    name,
    author,
    domain,
    created_at,
    updated_at
    ) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    findBlogByName: `
    SELECT * FROM blog WHERE name=($1)
    `,
    findAllBlogs: `
    SELECT * FROM blog
    `,
    updateBlogById: `
    UPDATE blog SET name=($1), author=($2), domain=($3), updated_at=($4) WHERE id=($5)
    `,
    deleteBlogById: `
    DELETE FROM blog WHERE id=($1)
    `,
};

module.exports = queries;