const request = require("supertest");
const expect = require("chai").expect
const app = require('../index');

const agent = request(app);

describe("Testing blog simple server", () => {
    it("should Get base url", (done) => {
        agent
            .get("/")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.message).to.equal("welcome to my BlogApi");
                expect(res.body.message).to.be.a("string");
        
                done();
            });
    });

    it("should Get blog url", (done) => {
        agent
            .get("/api/v1/blog")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.message).to.equal("Success");
                expect(res.body.message).to.be.a("string");

                done();
            });
    });

    const data = {
        "id": 1,
        "name": "femi",
        "author": "rilwan",
        "domain": "google.com",
        "date": new Date()
    }

    it("should Post blog url ", (done) => {
        agent
            .post("/api/v1/blog")
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.message).to.equal("New blog successfully created");
                expect(res.body.message).to.be.a("string");

                done();
            });
    });

    it("should Put blog url ", (done) => {
        agent
            .put("/api/v1/blog")
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.message).to.equal("Blog updated successfully");
                expect(res.body.message).to.be.a("string");

                done();
            });
    });

    it("should Delete blog url", (done) => {
        agent
            .delete("/api/v1/blog/1")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.message).to.equal("Blog delete successfully");
                expect(res.body.message).to.be.a("string");

                done();
            });
    });
})
