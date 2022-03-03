import React, { useEffect, useState } from "react";
import { Box, Button, Text, Tip } from "grommet";
import { API, graphqlOperation } from "aws-amplify";
import { useSelector } from "react-redux";
import { createBooking } from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";

const CustomPaymentContent = ({ contentDetails }) => {
  const navigate = useNavigate();
  const slotSelected = useSelector((state) => state.current.bookingInfo);
  const currentPerson = useSelector((state) => state.payment.bookingDetails);

  const handleReserve = (e) => {
    e.preventDefault();

    API.graphql(
      graphqlOperation(createBooking, {
        input: {
          bookingStatus: "new-unpaid",
          companyId: slotSelected.companyId,
          customerEmail: currentPerson.email,
          customerName: currentPerson.name,
          customerPhone: currentPerson.phone,
          endTime: slotSelected.endTime,
          descriptionDetails: currentPerson.details,
          paymentMethod: contentDetails.method,
          paymentId: "",
          fees: 0,
          location: slotSelected.locations,
          price: slotSelected.currentPrice,
          serviceId: slotSelected.id,
          serviceName: slotSelected.serviceName,
          startTime: slotSelected.startTime,
        },
      })
    ).then((result) => {
      navigate(`/confirm/${result.data.createBooking.bookingId}`);
    });
  };

  return (
    <Box direction="column" gap="small" margin="small">
      <Text>{contentDetails.details}</Text>
      <Tip
        content={
          <Box width="small" margin="small">
            Reservation will be pending confirmation until payment has been
            fully received.
          </Box>
        }
      >
        <Button
          primary
          label="Reserve Spot Now"
          onClick={(e) => handleReserve(e)}
        />
      </Tip>
    </Box>
  );
};

export default CustomPaymentContent;
