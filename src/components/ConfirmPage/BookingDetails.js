import React from "react";
import { Box, Text, Heading } from "grommet";
import ReactHtmlParser from "react-html-parser";
import { DateTime } from "luxon";

const sessionPaymentStatus = (status) => {
  switch (status) {
    case "new-paid":
      return "Payment complete.";
    case "new-unpaid":
      return "Pending payment.";
    case "confirmed-paid":
      return "Payment complete.";
    case "cancelled":
      return "Please contact hello@ivanasteven.com.";
    default:
      return;
  }
};

export const BookingDetailsLeft = ({ serviceName, serviceDetails }) => {
  return (
    <Box direction="column">
      <Text>Booking Type</Text>
      <Heading
        level="3"
        margin={{
          vertical: "0",
          horizontal: "0",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
        }}
      >
        {serviceName}
      </Heading>

      <Box>{ReactHtmlParser(serviceDetails.descriptionDetails)}</Box>
    </Box>
  );
};

export const BookingDetailsRight = ({ bookingInfo }) => {
  return (
    <Box direction="column" gap="small">
      <Box direction="column">
        <Text>Payment Status</Text>
        <Heading
          level="3"
          margin={{
            vertical: "0",
            horizontal: "0",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
          }}
        >
          {sessionPaymentStatus(bookingInfo.bookingStatus)}
        </Heading>
      </Box>
      <Box direction="column">
        <Text>Date</Text>
        <Heading
          level="3"
          margin={{
            vertical: "0",
            horizontal: "0",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
          }}
        >
          {DateTime.fromISO(bookingInfo.startTime).toLocaleString(
            DateTime.DATE_HUGE
          )}
        </Heading>
      </Box>

      <Box direction="column">
        <Text>Time</Text>
        <Heading
          level="3"
          margin={{
            vertical: "0",
            horizontal: "0",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
          }}
        >
          {DateTime.fromISO(bookingInfo.startTime).toLocaleString(
            DateTime.TIME_SIMPLE
          )}{" "}
          -{" "}
          {DateTime.fromISO(bookingInfo.endTime).toLocaleString(
            DateTime.TIME_SIMPLE
          )}
        </Heading>
      </Box>
    </Box>
  );
};
