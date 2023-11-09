const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)


const payWithCard = async (req, res) => {
    console.log(req.body);
    const { amount, id } = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Doctor's Appointment",
            payment_method: id,
            confirm: true,
            return_url: 'http://localhost:3000/'
        });
        console.log("Payment", payment);
        res.json({
            message: "Payment successful",
            success: true
        });
    } catch (error) {
        console.log("Error", error);
        res.json({
            message: "Payment failed",
            success: false
        });
    }
};


module.exports = { payWithCard };
