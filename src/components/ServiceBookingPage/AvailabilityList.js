import React from "react";
import { Button, Box, Text } from "grommet";
import { selectBookingSlot } from "../../features/stateSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

const AvailableTimeSlot = ({ dateSlot }) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const statusMessage = (message) => {
    switch (message) {
      case "available":
        return;
      case "confirmed":
        return "- already booked";
      case "pending":
        return "- pending booking";
      default:
        return;
    }
  };

  return (
    <Button
      disabled={dateSlot.status === "available" ? false : true}
      hoverIndicator="light-1"
      primary
      onClick={() => {
        dispatch(
          selectBookingSlot({
            bookingInfo: dateSlot,
          })
        );
        navigate("/review");
      }}
      label={
        <Box pad="small" direction="row" align="center" gap="small">
          <Text>
            {DateTime.fromISO(dateSlot.startTime).toLocaleString(
              DateTime.TIME_SIMPLE
            )}
            {statusMessage(dateSlot.status)}
          </Text>
        </Box>
      }
    />
  );
};

export default AvailableTimeSlot;
