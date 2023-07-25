import { AddClientInputDto } from "../../modules/client-adm/usecase/add-client/add-client.usecase.dto";
import {app, sequelize} from "../express";
import request from "supertest";

describe("E2E test for client", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a client", async () => {
        
        const input: AddClientInputDto  = {
            id: "1",
            name: "John Doe",
            email: "a@a.com",
            document: "123456789",
            address: "Rua 1",
            number: "1",
            complement: "Casa",
            city: "São Paulo",
            state: "SP",
            zipCode: "12345678",
          };

        const response = await request(app)
            .post("/clients")
            .send(input);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("John Doe");
        expect(response.body.email).toBe("a@a.com");
        expect(response.body.document).toBe("123456789");
        expect(response.body.address).toBe("Rua 1");
        expect(response.body.number).toBe("1");
        expect(response.body.complement).toBe("Casa");
        expect(response.body.city).toBe("São Paulo");
        expect(response.body.state).toBe("SP");
        expect(response.body.zipCode).toBe("12345678");

    });

    it("should not create a client", async () => {
        const response = await request(app).post("/clients").send({
          name: "Name",
        });
    
        expect(response.status).toBe(500);
    });

    // it("should update a product", async () => {
    //     let response = await request(app)
    //         .post("/product")
    //         .send({
    //             name: "Product 1",
    //             price: 10,
    //         });
    //     expect(response.status).toBe(200);
    //     const id = response.body.id;
    //     response = await request(app)
    //         .put(`/product/${id}`)            
    //         .send({                
    //             name: "Product 2",
    //             price: 20,
    //         });
    //     expect(response.status).toBe(200);
    //     expect(response.body.name).toBe("Product 2");
    //     expect(response.body.price).toBe(20);        
    // });

    // it("should not update a product with invalid data", async () => {
    //     let response = await request(app)
    //         .post("/product")
    //         .send({
    //             name: "Product 1",
    //             price: 10,
    //         });
    //     expect(response.status).toBe(200);
    //     const id = response.body.id;
    //     response = await request(app)
    //         .put(`/product/${id}`)            
    //         .send({                
    //             price: 20,
    //         });
    //     expect(response.status).toBe(500);        
    // });

    // it("should thrown an error when updating a non-existing product", async () => {
    //     const response = await request(app)
    //         .put(`/product/1`)            
    //         .send({                
    //             name: "Product 2",
    //             price: 20,
    //         });
    //     expect(response.status).toBe(500);        
    // });

    // it("should a find a product by id", async () => {
    //     let response = await request(app)
    //         .post("/product")
    //         .send({
    //             name: "Product 1",
    //             price: 10,
    //         });
    //     expect(response.status).toBe(200);
    //     const id = response.body.id;
        
    //     response = await request(app)
    //         .get(`/product/${id}`)            
    //     expect(response.status).toBe(200);
    //     expect(response.body.name).toBe("Product 1");
    //     expect(response.body.price).toBe(10);        
    // });

    // it("should thrown an error when not find a product by id", async () => {
    //     const response = await request(app)
    //         .get(`/product/1`)            
    //     expect(response.status).toBe(500);        
    // });

    // it("should list all products", async () => {
    //     let response = await request(app)
    //         .post("/product")
    //         .send({
    //             name: "Product 1",
    //             price: 10,
    //         });
    //     expect(response.status).toBe(200);

    //     response = await request(app)
    //         .post("/product")
    //         .send({
    //             name: "Product 2",
    //             price: 20,
    //         });
    //     expect(response.status).toBe(200);
        
    //     response = await request(app)
    //         .get("/product")            
    //     expect(response.status).toBe(200);
    //     expect(response.body.products.length).toBe(2);
    //     const product1 = response.body.products[0];
    //     expect(product1.name).toBe("Product 1");
    //     expect(product1.price).toBe(10);        
    //     const product2 = response.body.products[1];
    //     expect(product2.name).toBe("Product 2");
    //     expect(product2.price).toBe(20);

    // });
});