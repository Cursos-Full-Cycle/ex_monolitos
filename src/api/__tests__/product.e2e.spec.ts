import { AddProductInputDto } from "../../modules/product-adm/usecase/add-product/add-product.dto";
import {app, sequelize} from "../express";
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        
        const input: AddProductInputDto = {
            name: "Product 1",
            description: "Description 1",
            purchasePrice: 10,
            stock: 10,
          };

        const response = await request(app)
            .post("/products")
            .send(input);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.description).toBe("Description 1");
        expect(response.body.purchasePrice).toBe(10);
        expect(response.body.stock).toBe(10);
    });

    it("should not create a product with invalid data", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                name: "Product 1",
                purchasePrice: -1,
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