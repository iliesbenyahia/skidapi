const userController = require('../controller/userController.js')
const request = require('supertest')
const appInstance = require('../app')
const { db, sequelize }= require('../db')


let testUserId;

describe('User Model test', () => {
    test("Base check (users)", () => {
        expect(true).toBe(true);
    });

    test('Read/Fetch all', async () => {
        const res = await request(appInstance).get("/user");
        expect(res.statusCode).toBe(200);

    });

    test('Create', async () => {
        let body = {
            firstname: "testname",
            lastname: "testlastname",
            mail: "testmail",
            password: "testpassword"
        }
        const res = await request(appInstance).post("/user").send(body);
        expect(res.statusCode).toBe(200);
        if(res.statusCode == 200){
            testUserId = res.body;
        }
    });

    test('Delete', async () => {
        let body = {
            id: testUserId
        }
        const res = await request(appInstance).delete("/user").send(body);
        expect(res.statusCode).toBe(200);
    });

});























describe('Ressources Categories test', () => {
    test("Base check (Ressources Categories)", () => {
        expect(true).toBe(true);
    });
    test('Read/Fetch all', async () => {
        expect(true).toBe(true);
    });
    test('Create', async () => {
        expect(true).toBe(true);
    });
    test('Delete', async () => {
        expect(true).toBe(true);
    });
});

describe('Ressources Relationships test', () => {
    test("Base check (Ressources Relationships)", () => {
        expect(true).toBe(true);
    });
    test('Read/Fetch all', async () => {
        expect(true).toBe(true);
    });
    test('Create', async () => {
        expect(true).toBe(true);
    });
    test('Delete', async () => {
        expect(true).toBe(true);
    });
});

describe('Ressources test', () => {
    test("Base check (Ressources)", () => {
        expect(true).toBe(true);
    });
    test('Read/Fetch all', async () => {
        expect(true).toBe(true);
    });
    test('Create', async () => {
        expect(true).toBe(true);
    });
    test('Delete', async () => {
        expect(true).toBe(true);
    });
});





afterAll(async ()=>{
    await sequelize.close();
    await appInstance.close();
})


