import React, { useEffect, useState } from "react";
import { Accordion, AccordionPanel, Box, Heading } from "grommet";
import InfoSection from "./ReviewPage/InfoSection";
import QuestionForm from "./ReviewPage/QuestionForm";
import StripePaymentContent from "./ReviewPage/StripePaymentContent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PaymentSelectionType from "./ReviewPage/PaymentSelectionType";
import LoadingView from "./LoadingView";

const ReviewPage = () => {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  const bookingData = useSelector((state) =>
    state.current.bookingInfo ? true : false
  );

  const paymentType = useSelector((state) => state.payment.paymentState);

  useEffect(() => {
    if (!bookingData) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      setLoading(false);
    }
  }, [bookingData, navigate]);

  return loading ? (
    <LoadingView />
  ) : (
    <Box direction="column" fill>
      <Box align="center">Review your booking details</Box>
      <Box direction="row-responsive" gap="medium" pad="medium">
        <Box direction="column" pad={{ bottom: "20px" }}>
          <Accordion>
            <AccordionPanel label="Booking info">
              <InfoSection />
            </AccordionPanel>
          </Accordion>
        </Box>
        <Box direction="column">
          <Heading level="4">Your details</Heading>
          <Box pad={{ bottom: "10px" }}>
            <QuestionForm />
          </Box>
          <PaymentSelectionType />
          {paymentType === "credit-card" && <StripePaymentContent />}
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewPage;
