import React from "react";
import { Button, Box, Text, ThemeContext } from "grommet";
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
        return false;
      case "confirmed":
        return true;
      case "pending":
        return true;
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
        <Box pad="xsmall" direction="column" align="start" gap="small">
          <ThemeContext.Extend
            value={{
              text: {
                extend: statusMessage(dateSlot.status)
                  ? `text-decoration: line-through;`
                  : ``,
              },
            }}
          >
            <Text>
              {DateTime.fromISO(dateSlot.startTime).toLocaleString(
                DateTime.TIME_SIMPLE
              )}
            </Text>
            <Text>{dateSlot.locations}</Text>
          </ThemeContext.Extend>
        </Box>
      }
    />
  );
};

export default AvailableTimeSlot;
