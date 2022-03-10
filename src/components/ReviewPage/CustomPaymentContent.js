import React from "react";
import { Box, Button, Text } from "grommet";
import { API, graphqlOperation } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../graphql/mutations";
import { useNavigate } from "react-router-dom";
import { CircleInformation, Secure } from "grommet-icons";
import { clearPaymentType } from "../../features/paymentSlice";

const CustomPaymentContent = ({ contentDetails }) => {
  const navigate = useNavigate();
  const slotSelected = useSelector((state) => state.current.bookingInfo);
  const currentPerson = useSelector((state) => state.payment.bookingDetails);
  const dispatch = useDispatch();

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
      <Box gap="small" direction="row">
        <Secure color="brand" />
        <Text>{contentDetails.details}</Text>
      </Box>
      <Box gap="small" direction="row">
        <CircleInformation color="brand" />
        <Text>
          Spot is reserved for 12 hours, pending confirmation until payment has
          been fully received.
        </Text>
      </Box>
      <Button
        primary
        label="Reserve Spot for 12 Hours"
        onClick={(e) => handleReserve(e)}
      />
      <Button
        secondary
        label="Change Payment Type"
        onClick={() => dispatch(clearPaymentType(null))}
      />
    </Box>
  );
};

export default CustomPaymentContent;
