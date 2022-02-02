import React from "react";
import { Box } from "grommet";
import QuestionForm from "./QuestionForm";
import PaymentSelectionType from "./PaymentSelectionType";
import StripePaymentContent from "./StripePaymentContent";
import { useSelector } from "react-redux";

const DetailsPanel = () => {
  const paymentType = useSelector((state) => state.payment.paymentState);
  const bookingDetails = useSelector((state) => state.payment.bookingDetails);

  return (
    <Box direction="column">
      <Box pad={{ bottom: "10px" }} fill>
        <QuestionForm bookingDetailsPerson={bookingDetails} />
      </Box>
      {bookingDetails && <PaymentSelectionType />}
      {paymentType === "credit-card" && <StripePaymentContent />}
    </Box>
  );
};

export default DetailsPanel;
