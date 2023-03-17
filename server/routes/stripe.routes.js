import { Router } from "express";
import {
  createBankAccount,
  createConnectAccount,
  getAccountStatus,
  getRequiredFields,
} from "../controllers/stripeController.js";
import { authCheck, adminCheck } from "../middlewares/auth.js";

const router = Router();

router
  .route("/stripe/create-connect-account")
  .post(authCheck, createConnectAccount);

router.route("/stripe/get-required-fields").post(authCheck, getRequiredFields);
router.route("/stripe/create-bank-account").post(authCheck, createBankAccount);
router.route("/stripe/get-account-status").post(authCheck, getAccountStatus);

export default router;
