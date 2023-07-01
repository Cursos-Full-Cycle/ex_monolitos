import { Sequelize } from "sequelize-typescript";
import ClientModel from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";

describe("Client-adm facade test", () => {
    let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  it("should create a client", async () => {    
    const facade = ClientAdmFacadeFactory.create();

    const input = {
        id: "1",
        name: "John Doe",
        email: "a@a.com",
        address: "Rua 1",
    };
    await facade.add(input);

    const clientDb = await ClientModel.findOne({ where: { id: input.id } });

    expect(clientDb.id).toEqual(input.id);
    expect(clientDb.name).toEqual(input.name);
    expect(clientDb.email).toEqual(input.email);
    expect(clientDb.address).toEqual(input.address);    
  });

  it("should find a client", async () => {    
    const facade = ClientAdmFacadeFactory.create();

    const input = {
        id: "1",
        name: "John Doe",
        email: "a@a.com",
        address: "Rua 1",
    };
    await facade.add(input);

    const client = await facade.find({id: "1"});

    expect(client.id).toEqual(input.id);
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);
    expect(client.address).toEqual(input.address);



  });
});