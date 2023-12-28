const request = require("supertest")
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const app = require("../../app")
const {secret_key} = require("../../config/secret");

const userPayload = {username:'username', password:"password"}
const productPayload = {
    "name": "product",
    "description": "test product",
    "price": 200,
    "quantity": 2
  };
var productId;
function jwtSign(){
    let cookie = jwt.sign(userPayload, secret_key, { expiresIn:'24h' })
    return cookie;
}

beforeAll(async() => {
    await mongoose.connect("mongodb://127.0.0.1:27017/test")
})

afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
});

describe("Test Post /product", ()=>{
    test("Create product", async ()=>{
        const response = await request(app)
                        .post('/product')
                        .set('Authorization', `Bearer ${jwtSign()}`)
                        .send(productPayload)
                        .expect('Content-Type', /json/)
                        .expect(201)
        expect(response.body).toMatchObject({
            "_id": expect.any(String),
            "name": "product",
            "description": "test product",
            "price": 200,
            "quantity": 2
        });
        productId = response.body._id
    });

    test("Catch missing required properties", async()=>{
        const response = await request(app)
            .post('/product')
            .set('Authorization', `Bearer ${jwtSign()}`)
            .send({
                "description": "test product",
                "price": 200,
                "quantity": 2
              })
            .expect('Content-Type', /json/)
            .expect(400)
        expect(response.body).toStrictEqual({msg: "All fields required"})
    });

    test("Product name invalid", async()=>{
        const response = await request(app)
            .post('/product')
            .set('Authorization', `Bearer ${jwtSign()}`)
            .send({
                "name":2,
                "description": "test product",
                "price": 200,
                "quantity": 2
              })
            .expect('Content-Type', /json/)
            .expect(400)
        expect(response.body).toStrictEqual({msg: "Please provide valid name"})
    });  
});

describe("Test Patch /product", ()=>{
    test("Update product", async ()=>{
        const response = await request(app)
                            .patch(`/product/${productId}`)
                            .set('Authorization', `Bearer ${jwtSign()}`)
                            .send({
                                "description": "test product-100",
                                "price": 300
                            })
                            .expect('Content-Type', /json/)
                            .expect(200)
        expect(response.body).toMatchObject({
            "msg": "product is updated.",
            "product": {
                "_id": productId,
                "name": "product",
                "description": "test product-100",
                "price": 300,
                "quantity": 2
            }
        })
    })

    test("Product does not exists", async()=>{
        const randomObjectId = new mongoose.Types.ObjectId();
        const response = await request(app)
            .patch(`/product/${randomObjectId}`)
            .set('Authorization', `Bearer ${jwtSign()}`)
            .send({
                "description": "test product-100",
                "price": 300
            })
            .expect('Content-Type', /json/)
            .expect(400)
        expect(response.body).toStrictEqual({msg:"Id not exists!!!"})
    });
})

describe('Test GET /product', ()=>{
    test('Get product list', async ()=>{
        const response = await request(app)
                        .get('/product')
                        .expect('Content-Type', /json/)
                        .expect(200)
    });

    test('Get a product', async()=>{
        const response = await request(app)
                        .get(`/product/${productId}`)
                        .expect("Content-Type", /json/)
                        .expect(200)

        expect(response.body).toMatchObject({
            "_id": productId,
            "name": "product",
            "description": "test product-100",
            "price": 300,
            "quantity": 2
        })
    })
})

describe("Test Delete /product", ()=>{
    test("Product remove", async ()=>{
        const response = await request(app)
                        .delete(`/product/${productId}`)
                        .set("Authorization", `Bearer ${jwtSign()}`)
                        .expect('Content-Type', /json/)
                        .expect(200)
        expect(response.body).toStrictEqual({msg: `${productPayload.name} deleted from records`})
    });

    test("Product does not exists", async()=>{
        const randomObjectId = new mongoose.Types.ObjectId();
        const response = await request(app)
            .delete(`/product/${randomObjectId}`)
            .set('Authorization', `Bearer ${jwtSign()}`)
            .expect('Content-Type', /json/)
            .expect(400)
        expect(response.body).toStrictEqual({msg:"Id not exists!!!"})
    });

})