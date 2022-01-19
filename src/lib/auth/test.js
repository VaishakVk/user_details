const expect = require("chai").expect;
const request = require("supertest");
const User = require("../../../db/models/user");
const app = require("../../../app");
const db = require("../../../db");

describe("POST /api/auth", function () {
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

    it("Success, create a new user", (done) => {
        request(app)
            .post("/api/auth/signup")
            .send({
                name: "TestUser",
                email: "vaishakhvkv@gmail.com",
                gender: "MALE",
                password: "Hello123$",
            })
            .then((res) => {
                const body = res.body;
                const statusCode = res.statusCode;
                expect(body).property("success").to.equal(true);
                expect(body).to.have.nested.property("message.id");
                expect(statusCode).to.equal(201);
                done();
            })
            .catch((err) => done(err));
    });

    it("Fails, when invalid email is sent", (done) => {
        request(app)
            .post("/api/auth/signup")
            .send({
                name: "TestUser",
                email: "test.com",
                gender: "MALE",
                password: "Hello123$",
            })
            .then((res) => {
                const body = res.body;
                const statusCode = res.statusCode;
                expect(body).property("success").to.equal(false);
                expect(body.message.map((e) => e.param)).to.include("email");
                expect(statusCode).to.equal(400);
                done();
            })
            .catch((err) => done(err));
    });

    it("Fails, when same email is registered again", (done) => {
        request(app)
            .post("/api/auth/signup")
            .send({
                name: "TestUser",
                email: "test@test.com",
                gender: "MALE",
                password: "Hello123$",
            })
            .then(() =>
                request(app).post("/api/auth/signup").send({
                    name: "TestUser",
                    email: "test@test.com",
                    gender: "MALE",
                    password: "Hello123$",
                })
            )
            .then((res) => {
                const body = res.body;
                const statusCode = res.statusCode;
                expect(body).property("success").to.equal(false);
                expect(statusCode).to.equal(400);
                done();
            })
            .catch((err) => done(err));
    });

    it("Success, when logged in with correct credentials", (done) => {
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
                const body = res.body;
                const statusCode = res.statusCode;
                expect(body).property("success").to.equal(true);
                expect(statusCode).to.equal(200);
                /* eslint-disable-next-line no-unused-expressions */
                expect(body.message.token).to.not.be.null;
                done();
            })
            .catch((err) => done(err));
    });

    it("Fail, when logged in with incorrect credentials", (done) => {
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
                    password: "Hello123",
                })
            )
            .then((res) => {
                const body = res.body;
                const statusCode = res.statusCode;
                expect(body).property("success").to.equal(false);
                expect(statusCode).to.equal(401);
                done();
            })
            .catch((err) => done(err));
    });

    it("Success, get User profile data", (done) => {
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
                    .get("/api/auth/me")
                    .set("Authorization", `Bearer ${token}`);
            })
            .then((res) => {
                const body = res.body;
                const statusCode = res.statusCode;
                expect(body).property("success").to.equal(true);
                expect(statusCode).to.equal(200);
                expect(body.message.name).to.equal("TestUser");
                expect(body.message.email).to.equal("test@test.com");
                done();
            })
            .catch((err) => done(err));
    });

    it("Fail, get User profile data without sending token", (done) => {
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
            .then(() => request(app).get("/api/auth/me"))
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
