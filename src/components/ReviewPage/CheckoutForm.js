import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createBooking } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingView from "../Common/LoadingView";
import { Box, Button, Text } from "grommet";
import { clearPaymentType } from "../../features/paymentSlice";
import { Alert } from "grommet-icons";

export default function CheckoutForm() {
  let navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const slotSelected = useSelector((state) => state.current.bookingInfo);
  const currentPerson = useSelector((state) => state.payment.bookingDetails);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      console.log("switch case");
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, slotSelected, currentPerson]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/confirm",
        payment_method_data: {
          billing_details: {
            name: currentPerson.name,
            email: currentPerson.email,
          },
        },
      },
      redirect: "if_required",
    });

    if (!error) {
      const bookingResult = await API.graphql(
        graphqlOperation(createBooking, {
          input: {
            bookingStatus: "new-paid",
            companyId: slotSelected.companyId,
            customerEmail: currentPerson.email,
            customerName: currentPerson.name,
            customerPhone: currentPerson.phone,
            endTime: slotSelected.endTime,
            descriptionDetails: slotSelected.details,
            fees: 0,
            location: slotSelected.locations,
            price: slotSelected.currentPrice,
            serviceId: slotSelected.id,
            serviceName: slotSelected.serviceName,
            startTime: slotSelected.startTime,
          },
        })
      );

      if (bookingResult.data.createBooking) {
        navigate(`/confirm/${bookingResult.data.createBooking.bookingId}`);
      }
    } else {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occured.");
      }
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />

      {message && (
        <Box direction="row" gap="small" margin={{ top: "0.5em" }}>
          <Alert color="status-critical" />
          <Text color="status-critical">{message}</Text>
        </Box>
      )}

      {isLoading || !stripe || !elements ? (
        <>
          <LoadingView />
        </>
      ) : (
        <Box gap="small" margin={{ top: "1.5em", bottom: "10px" }}>
          <Button
            primary
            type="submit"
            disabled={isLoading || !stripe || !elements}
            label={`Submit Payment`}
            fill
          />
          <Button
            secondary
            label="Change Payment Type"
            onClick={() => dispatch(clearPaymentType(null))}
            fill
          />
        </Box>
      )}
    </form>
  );
}
