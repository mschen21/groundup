import React, { useEffect, useState } from "react";
import { Box } from "grommet";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { API, graphqlOperation } from "aws-amplify";
import { createPaymentIntent } from "../../graphql/mutations";
import { useSelector } from "react-redux";

const stripePromise = loadStripe("pk_test_NwKFOwArQCLpON3vYs7AcIH800V0euTnMu");

const StripePaymentContent = () => {
  const [clientSecret, setClientSecret] = useState("");
  const bookingAmount = useSelector(
    (state) => state.current.bookingInfo.currentPrice
  );

  useEffect(() => {
    const addPaymentIntent = async () => {
      const result = await API.graphql(
        graphqlOperation(createPaymentIntent, { amount: bookingAmount })
      );
      setClientSecret(result.data.createPaymentIntent.clientSecret);
    };
    console.log("run");
    addPaymentIntent();
  }, [bookingAmount]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <Box>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </Box>
  );
};

export default StripePaymentContent;
