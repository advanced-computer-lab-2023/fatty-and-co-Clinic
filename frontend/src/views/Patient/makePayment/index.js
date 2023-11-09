import Stripe from "stripe";
import StripeContainer from "./components/StripeContainer";


function MakePayment() {
    return (
        <div>
        <h1>Payment</h1>
        <StripeContainer />
        </div>
    )
}

export default MakePayment;