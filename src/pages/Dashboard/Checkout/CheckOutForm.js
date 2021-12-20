import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClientSecretForPayment,
  updateOrderPayment,
} from "../../../globalState/GlobalStateSlice";

const CheckOutForm = ({ order, clientSecret }) => {
  const { totalCost, userName, _id } = order;
  const stripe = useStripe();
  const elements = useElements();
  const [isError, setError] = useState("");
  const [isSuccess, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();

  useEffect(async () => {
    const secret = dispatch(getClientSecretForPayment(totalCost));
    console.log(secret);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    setProcessing(true);

    // confirm payment
    const { paymentIntent, error: paymentConfirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userName,
          },
        },
      });

    if (paymentConfirmError) {
      setError(paymentConfirmError.message);
      setProcessing(false);
      return;
    }

    const updatedOrder = await dispatch(updateOrderPayment(_id));
    console.log(updatedOrder);
    setSuccess("Payment was successfull.");
    setProcessing(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="mb-2">Insert Your Card Details</h2>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#000",
                "::placeholder": {
                  color: "#000",
                },
              },
              invalid: {
                color: "#000",
              },
            },
          }}
        />
        {processing ? (
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        ) : (
          <button
            type="submit"
            disabled={!stripe}
            className="btn btn-primary my-4"
          >
            Pay ${totalCost}
          </button>
        )}
      </form>
      {isError && <p className="alert alert-danger">{isError}</p>}
      {isSuccess && <p className="alert alert-success">{isSuccess}</p>}
    </div>
  );
};

export default CheckOutForm;
