const expect = require("chai").expect;
const request = require("supertest");
const User = require("../../../db/models/user");
const app = require("../../../app");
const db = require("../../../db");

describe("POST /api/user", function () {
    this.beforeAll((done) => {
        db()
            .then(() => done())
            .catch((err) => done(err));
    });

    beforeEach((done) => {
        User.deleteMany()
            .then(() => done())
            .catch((err) => {
                done(err);
            });
    });

    it("Success, gets all users data", (done) => {
        request(app)
            .post("/api/auth/signup")
            .send({
                name: "TestUser",
                email: "test@test.com",
                gender: "MALE",
                password: "Hello123$",
            })
            .then(() =>
                request(app).patch("/api/auth/login").send({
                    email: "test@test.com",
                    password: "Hello123$",
                })
            )
            .then((res) => {
                const token = res.body.message.token;
                return request(app)
                    .get("/api/user")
                    .set("Authorization", `Bearer ${token}`);
            })
            .then((res) => {
                const body = res.body;
                const statusCode = res.statusCode;
                expect(body).property("success").to.equal(true);
                expect(statusCode).to.equal(200);
                expect(body.message.length).to.equal(1);
                expect(body.message[0].name).to.equal("TestUser");
                expect(body.message[0].email).to.equal("test@test.com");
                done();
            })
            .catch((err) => done(err));
    });

    it("Fail, get all users data without sending token", (done) => {
        request(app)
            .post("/api/auth/signup")
            .send({
                name: "TestUser",
                email: "test@test.com",
                gender: "MALE",
                password: "Hello123$",
            })
            .then(() =>
                request(app).patch("/api/auth/login").send({
                    email: "test@test.com",
                    password: "Hello123$",
                })
            )
            .then(() => request(app).get("/api/user"))
            .then((res) => {
                const body = res.body;
                const statusCode = res.statusCode;
                expect(body).property("success").to.equal(false);
                expect(statusCode).to.equal(401);
                done();
            })
            .catch((err) => done(err));
    });
});
