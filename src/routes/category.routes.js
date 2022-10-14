import { Router } from "express";
import { addCategory, getCategories, getCategory, updateCategory, deleteCategory } from "../controllers/category.controller";
import { validateToken } from "../middlewares/authJwt";

const router = Router();

router.post("/addCategory", validateToken, addCategory);

router.get("/getCategories", validateToken, getCategories);

router.get("/getCategory", validateToken, getCategory);

router.put("/updateCategory", validateToken, updateCategory);

router.delete("/deleteCategory", validateToken, deleteCategory);

export default router;