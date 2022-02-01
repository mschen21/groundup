import React from "react";
import { Box } from "grommet";
import QuestionForm from "./QuestionForm";
import PaymentSelectionType from "./PaymentSelectionType";
import StripePaymentContent from "./StripePaymentContent";
import { useSelector } from "react-redux";

const DetailsPanel = () => {
  const paymentType = useSelector((state) => state.payment.paymentState);

  return (
    <Box direction="column">
      <Box pad={{ bottom: "10px" }}>
        <QuestionForm />
      </Box>
      <PaymentSelectionType />
      {paymentType === "credit-card" && <StripePaymentContent />}
    </Box>
  );
};

export default DetailsPanel;
