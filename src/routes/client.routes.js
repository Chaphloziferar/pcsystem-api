import { Router } from "express";
import { addClient, getClients, getClient, getClientByEmail, updateClient, deleteClient } from "../controllers/client.controller";
import { validateToken } from "../middlewares/authJwt";

const router = Router();

router.post("/addClient", addClient);

router.get("/getClients", validateToken, getClients);

router.get("/getClient", validateToken, getClient);

router.get("/getClientByEmail", validateToken, getClientByEmail);

router.put("/updateClient", validateToken, updateClient);

router.delete("/deleteClient", validateToken, deleteClient);

export default router;