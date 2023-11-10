const express = require("express");
const {
    payWithCard
} = require("../controllers/paymentController");
// const { checkPatient } = require("../common/middleware/checkType");

const router = express.Router();

router.post("/cardPayment", payWithCard);

module.exports = router;