const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");

const userPayload = {username:'username', password:"password"}

beforeAll(async() => {
    await mongoose.connect("mongodb://127.0.0.1:27017/test")
})

afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
});

describe("Register Post /register", ()=>{
    test("Register user", async()=>{
        const response = await request(app)
                            .post('/register')
                            .send(userPayload)
                            .expect('Content-Type', /json/)
                            .expect(200);
                            
        expect(response.body).toMatchObject({
            "msg": "User registered successfull!",
            "result": {
                "username": "username",
                "password": expect.any(String),
                "_id": expect.any(String)
            }
        });
    });
    test("Invalid user credentials", async()=>{
        const response = await request(app)
                            .post('/register')
                            .send({})
                            .expect('Content-Type', /json/)
                            .expect(400);

        expect(response.body).toStrictEqual({msg: "Please provide valid credentials!!!"})
    })
    test("User already exists", async()=>{
        const response = await request(app)
                            .post('/register')
                            .send(userPayload)
                            .expect('Content-Type', /json/)
                            .expect(400);

        expect(response.body).toStrictEqual({msg: "User already exists!"})
    })
})
describe("Login Post /login", ()=>{
    test("Login user", async()=>{
        const response = await request(app)
                            .post('/login')
                            .send(userPayload)
                            .expect('Content-Type', /json/)
                            .expect(200);

        expect(response.body).toMatchObject({
            msg:"Login successful!!", 
            token:expect.any(String)
        });
    });
    test("Invalid user credentials", async()=>{
        const response = await request(app)
                            .post('/login')
                            .send({})
                            .expect('Content-Type', /json/)
                            .expect(400);
        expect(response.body).toStrictEqual({msg: "Please provide valid credentials!!!"});
    })
    test("Unauthorized user", async()=>{
        const response = await request(app)
                            .post('/login')
                            .send({username:"abc", password:'abc'})
                            .expect('Content-Type', /json/)
                            .expect(401);
        expect(response.body).toStrictEqual({msg: "Unautherized user!!!"});
    })
})