import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useDispatch, useSelector } from "react-redux";
import { getOrderForPayment } from "../../../globalState/GlobalStateSlice";
import Loading from "../../Shared/Loading";

const stripePromise = loadStripe(
  "pk_test_51K8MFKErngJIG2bWCLbz4vV6laO66Ayo9JQGxZhJZjyw1U12o3Wp6XBONJUXCc4ivbGmg8A1ug8TtesV8aOfTMyo00KPrUHA2Y"
);
const Checkout = () => {
  const { paymentId } = useParams();
  const [paymentLoading, setPaymentLoading] = useState(true);
  const { singleOrder, paymentClientSecret } = useSelector(
    (state) => state.globalState
  );
  const dispatch = useDispatch();

  useEffect(async () => {
    const order = await dispatch(getOrderForPayment(paymentId));
    console.log();
    if (order.meta.requestStatus === "fulfilled") {
      setPaymentLoading(false);
    }
  }, [paymentId]);

  if (paymentLoading && !paymentClientSecret) {
    return <Loading />;
  }

  return (
    <div>
      <h1>Make Payment</h1>
      <div className="mt-5">
        <Elements stripe={stripePromise}>
          <CheckOutForm
            order={singleOrder}
            clientSecret={paymentClientSecret}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Checkout;
