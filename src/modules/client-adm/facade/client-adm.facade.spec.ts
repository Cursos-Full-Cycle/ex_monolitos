import { Sequelize } from "sequelize-typescript";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";
import ClientAdmClientModel from "../repository/client.model";

describe("Client-adm facade test", () => {
    let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientAdmClientModel]);
    await sequelize.sync();
  });

  it("should create a client", async () => {    
    const facade = ClientAdmFacadeFactory.create();

    const input = {
        id: "1",
        name: "John Doe",
        email: "a@a.com",
        document: "123456789",
        address: "Rua 1",
        number: "123",
        complement: "Casa",
        city: "São Paulo",
        state: "SP",
        zipCode: "12345678",
    };
    await facade.add(input);

    const clientDb = await ClientAdmClientModel.findOne({ where: { id: input.id } });

    expect(clientDb.id).toEqual(input.id);
    expect(clientDb.name).toEqual(input.name);
    expect(clientDb.email).toEqual(input.email);
    expect(clientDb.document).toEqual(input.document);
    expect(clientDb.address).toEqual(input.address);    
    expect(clientDb.number).toEqual(input.number);
    expect(clientDb.complement).toEqual(input.complement);
    expect(clientDb.city).toEqual(input.city);
    expect(clientDb.state).toEqual(input.state);
    expect(clientDb.zipCode).toEqual(input.zipCode);

  });

  it("should find a client", async () => {    
    const facade = ClientAdmFacadeFactory.create();

    const input = {
        id: "1",
        name: "John Doe",
        email: "a@a.com",
        document: "123456789",
        address: "Rua 1",
        number: "123",
        complement: "Casa",
        city: "São Paulo",
        state: "SP",
        zipCode: "12345678",
    };
    await facade.add(input);

    const client = await facade.find({id: "1"});

    expect(client.id).toEqual(input.id);
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);
    expect(client.document).toEqual(input.document);
    expect(client.address).toEqual(input.address);
    expect(client.number).toEqual(input.number);
    expect(client.complement).toEqual(input.complement);
    expect(client.city).toEqual(input.city);
    expect(client.state).toEqual(input.state);
    expect(client.zipCode).toEqual(input.zipCode);
    
  });
});