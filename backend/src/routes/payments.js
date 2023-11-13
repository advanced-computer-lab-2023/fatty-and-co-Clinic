const express = require("express");
const {
  payWithCard,
  walletPayment,
} = require("../controllers/paymentController");
// const { checkPatient } = require("../common/middleware/checkType");

const router = express.Router();

router.post("/cardPayment", payWithCard);
router.post("/walletPayment", walletPayment);

module.exports = router;
