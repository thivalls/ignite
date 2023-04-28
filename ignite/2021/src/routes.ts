import { Router } from "express";
import { CreateClientController } from "./modules/client/useCases/createClient/CreateClientController";
import { AuthenticateClientController } from "./modules/client/useCases/Authenticate/AuthenticateClientController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();

routes.post("/authenticate", authenticateClientController.handle)

routes.post("/clients", createClientController.handle)

export { routes };