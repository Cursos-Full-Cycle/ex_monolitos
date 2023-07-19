import { Sequelize } from "sequelize-typescript";
import ProductStoreCatalogRepository from "./product.repository";
import StoreCatalogProductModel from "./product.model";


describe("ProductRepository test", () => {
    let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([StoreCatalogProductModel]);
    await sequelize.sync();
  });

  // afterEach(async () => {
  //   await sequelize.close();
  // });

  it("should find all products", async () => {
    await StoreCatalogProductModel.create({
        id: "1",
        name: "Product 1",
        description: "Product 1 description",
        salesPrice: 100,
    });

    await StoreCatalogProductModel.create({
        id: "2",
        name: "Product 2",
        description: "Product 2 description",
        salesPrice: 200,
    });

    const productRepository = new ProductStoreCatalogRepository();
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

  it ("should find a product", async () => {
    const productRepository = new ProductStoreCatalogRepository();
    StoreCatalogProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      salesPrice: 100
    });

    const product = await productRepository.find("1");

    expect(product.id.id).toEqual("1");
    expect(product.name).toEqual("Product 1");
    expect(product.description).toEqual("Product 1 description");
    expect(product.salesPrice).toEqual(100);    
    
  });

  it("should throw an error when customer is not found ", async () => {
    const customerRepository= new ProductStoreCatalogRepository();
    const id = '11222';
    expect(async () => {
        await customerRepository.find(id);
    }).rejects.toThrow(`Product with id ${id} not found`);
  });


})