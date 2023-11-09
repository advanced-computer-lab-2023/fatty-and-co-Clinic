const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)


const payWithCard = async (req, res) => {
    const { priceId } = req.body; // Assuming you send the Price ID in the request body
    console.log(priceId);
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price: priceId,
                },
            ],
            success_url: `http://localhost:3000/success`, // Adjust success and cancel URLs
            cancel_url: `http://localhost:3000/cancel`,
        });
        
        console.log(session);
        res.json({
            url: session.url,
            // success: true
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};


module.exports = { payWithCard };
