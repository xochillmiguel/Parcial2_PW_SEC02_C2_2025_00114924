import express from "express";
import {
  getCuentas,
  getCuentasById,
  getCuentasBalance
} from "../controllers/accountControllers.js";

const router = express.Router();

router.get("/cuentasBalance", getCuentasBalance);
router.get("/cuentas/:id", getCuentasById);
router.get("/cuentas", getCuentas);

export default router;