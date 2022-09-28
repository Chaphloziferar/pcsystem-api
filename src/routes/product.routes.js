import { Router } from "express";
import { addProduct, getProducts, getProduct, updateProduct, updateProductPrice, deleteProduct } from "../controllers/product.controller";
import { validateToken } from "../middlewares/authJwt";

const router = Router();

router.post("/addProduct", validateToken, addProduct);

router.get("/getProducts", validateToken, getProducts);

router.get("/getProduct", validateToken, getProduct);

router.put("/updateProduct", validateToken, updateProduct);

router.put("/updateProductPrice", validateToken, updateProductPrice);

router.delete("/deleteProduct", validateToken, deleteProduct);

export default router;