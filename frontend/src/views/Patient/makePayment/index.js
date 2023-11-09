import Stripe from "stripe";
import StripeContainer from "./components/StripeContainer";

function MakePayment() {
  return (
    <div>
      <StripeContainer amount={10} />
    </div>
  );
}

export default MakePayment;
