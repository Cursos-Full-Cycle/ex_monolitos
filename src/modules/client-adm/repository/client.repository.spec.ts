import { Sequelize } from "sequelize-typescript";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import ClientAdmClientModel from "./client.model";

describe("ClientRepository test", () => {
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

  // afterEach(async () => {
  //   await sequelize.close();
  // });

  it("should find a client", async () => {
    const client = await ClientAdmClientModel.create({
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
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    const repository = new ClientRepository();
    const result = await repository.find(client.id);

    expect(result.id.id).toEqual(client.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.document).toEqual(client.document);
    expect(result.address).toEqual(client.address);
    expect(result.number).toEqual(client.number);
    expect(result.complement).toEqual(client.complement);
    expect(result.city).toEqual(client.city);
    expect(result.state).toEqual(client.state);
    expect(result.zipCode).toEqual(client.zipCode);
    expect(result.createdAt).toStrictEqual(client.createdAt);
    expect(result.updatedAt).toStrictEqual(client.updatedAt);

  });

  it("should create a client", async () => {
    const client = new Client({
        id: new Id("1"),
        name: "John Doe",
        email: "a@a.com",
        document: "123456789",
        address: "Rua 1",
        number: "123",
        complement: "Casa",
        city: "São Paulo",
        state: "SP",
        zipCode: "12345678",
    });

    const repository = new ClientRepository();
    await repository.add(client);

    const clientDb = await ClientAdmClientModel.findOne({ where: { id: client.id.id } });

    expect(clientDb.id).toEqual(client.id.id);
    expect(clientDb.name).toEqual(client.name);
    expect(clientDb.email).toEqual(client.email);
    expect(clientDb.document).toEqual(client.document);
    expect(clientDb.address).toEqual(client.address);
    expect(clientDb.number).toEqual(client.number);
    expect(clientDb.complement).toEqual(client.complement);
    expect(clientDb.city).toEqual(client.city);
    expect(clientDb.state).toEqual(client.state);
    expect(clientDb.zipCode).toEqual(client.zipCode);
    expect(clientDb.createdAt).toStrictEqual(client.createdAt);
    expect(clientDb.updatedAt).toStrictEqual(client.updatedAt);

  });

  it("should throw an error when client is not found ", async () => {
    const clientRepository= new ClientRepository();
    expect(async () => {
        await clientRepository.find("11222");
    }).rejects.toThrow("Client with id 11222 not found");
});

});