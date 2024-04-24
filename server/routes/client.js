import express from "express";
import {getProducts, getComputers} from "../controllers/client.js";
const router = express.Router();

router.get("/computers", getComputers);
router.get("/products", getProducts);
export default router;
