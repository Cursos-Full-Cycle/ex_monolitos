import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";


describe("ProductRepository test", () => {
    let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find all products", async () => {
    await ProductModel.create({
        id: "1",
        name: "Product 1",
        description: "Product 1 description",
        salesPrice: 100,
    });

    await ProductModel.create({
        id: "2",
        name: "Product 2",
        description: "Product 2 description",
        salesPrice: 200,
    });

    const productRepository = new ProductRepository();
    const products = await productRepository.findAll();

    expect(products.length).toBe(2);
    expect(products[0].id.id).toBe("1");
    expect(products[0].name).toBe("Product 1");
    expect(products[0].description).toBe("Product 1 description");
    expect(products[0].salesPrice).toBe(100);
    expect(products[1].id.id).toBe("2");
    expect(products[1].name).toBe("Product 2");
    expect(products[1].description).toBe("Product 2 description");
    expect(products[1].salesPrice).toBe(200);
    
  });

//   it("should create a product", async () => {
//     const productProps = {
//       id: new Id("1"),
//       name: "Product 1",
//       description: "Product 1 description",
//       purchasePrice: 100,
//       stock: 10,
//     };
//     const product = new Product(productProps);
//     const productRepository = new ProductRepository();
//     await productRepository.add(product);

//     const productDb = await ProductModel.findOne({
//       where: { id: productProps.id.id },
//     });

//     expect(productDb.id).toEqual(productProps.id.id);
//     expect(productProps.name).toEqual(productDb.name);
//     expect(productProps.description).toEqual(productDb.description);
//     expect(productProps.purchasePrice).toEqual(productDb.purchasePrice);
//     expect(productProps.stock).toEqual(productDb.stock);
//   });

//   it ("should find a product", async () => {
//     const productRepository = new ProductRepository();
//     ProductModel.create({
//       id: "1",
//       name: "Product 1",
//       description: "Product 1 description",
//       purchasePrice: 100,
//       stock: 10,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     });

//     const product = await productRepository.find("1");

//     expect(product.id.id).toEqual("1");
//     expect(product.name).toEqual("Product 1");
//     expect(product.description).toEqual("Product 1 description");
//     expect(product.purchasePrice).toEqual(100);
//     expect(product.stock).toEqual(10);

    
//   });


})