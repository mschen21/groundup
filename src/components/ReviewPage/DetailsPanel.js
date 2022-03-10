import React from "react";
import { Box } from "grommet";
import QuestionForm from "./QuestionForm";
import { useSelector } from "react-redux";

const DetailsPanel = ({ updateActiveIndex }) => {
  const bookingDetails = useSelector((state) => state.payment.bookingDetails);

  return (
    <Box direction="column">
      <Box pad={{ bottom: "10px" }} fill>
        <QuestionForm
          bookingDetailsPerson={bookingDetails}
          updateActiveIndex={updateActiveIndex}
        />
      </Box>
      {/* {bookingDetails && <PaymentSelectionType />} */}
    </Box>
  );
};

export default DetailsPanel;
