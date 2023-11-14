const patientModel = require("../models/patients");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const payWithCard = async (req, res) => {
  const { amount, description, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "EGP",
      description: description,
      payment_method: id,
      confirm: true,
      return_url: "http://localhost:3000/",
    });
    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
};

const walletPayment = async (req, res) => {
  const Amount = req.body.Amount;
  const username = req.user.Username;
  try {
    const patient = await patientModel.findOne({ Username: username });
    if (patient.Wallet >= Amount) {
      patient.Wallet -= Amount;
      await patient.save();
      return res.json({ success: true, message: "Payment successful." });
    } else {
      return res.json({ success: false, message: "Insufficient funds." });
    }
  } catch (error) {
    console.error("Error processing wallet payment:", error);

    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

module.exports = { payWithCard, walletPayment };
