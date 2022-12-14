import { Router } from "express";
import { addQuote, addProductToQuote, deleteProductFromQuote, getQuotes, getQuote, editQuoteStatus, deleteQuote } from "../controllers/quote.controller";
import { validateToken } from "../middlewares/authJwt";

const router = Router();

router.post("/addQuote", validateToken, addQuote);

router.put("/addProductToQuote", validateToken, addProductToQuote);

router.put("/deleteProductFromQuote", validateToken, deleteProductFromQuote);

router.get("/getQuotes", validateToken, getQuotes);

router.get("/getQuote", validateToken, getQuote);

router.put("/editQuoteStatus", validateToken, editQuoteStatus);

router.delete("/deleteQuote", validateToken, deleteQuote);

export default router;