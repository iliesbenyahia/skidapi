const userController = require('../controller/userController.js')
const request = require('supertest')
const appInstance = require('../app')
const { db, sequelize }= require('../db')

describe('User Model test', () => {
    test("Base check (users)", () => {
        expect(true).toBe(true);
    });
    test('Read/Fetch all', async () => {
        const res = await request(appInstance).get("/user");
        expect(res.statusCode).toBe(200);

    });

    test('Read/Fetch all 2', async () => {
        const res = await request(appInstance).get("/user");
        expect(res.statusCode).toBe(200);
    });



});

afterAll(async ()=>{
    await sequelize.close();
    await appInstance.close();
})


