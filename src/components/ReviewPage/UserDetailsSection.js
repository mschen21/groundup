import React from "react";
import { Box, Heading, Text } from "grommet";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";

const UserDetailsSection = () => {
  const currentUserSelection = useSelector(
    (state) => state.current.bookingInfo
  );

  const bookingDuration = (from, to) => {
    let end = DateTime.fromISO(to);
    let start = DateTime.fromISO(from);

    let diffInMonths = end.diff(start, ["hours", "minutes"]);
    if (diffInMonths.toObject().hours > 0) {
      return `${diffInMonths.toObject().hours} hour${
        diffInMonths.toObject().hours > 1 ? "s" : ""
      } long`;
    } else {
      return diffInMonths.toObject().minutes;
    }
  };

  return (
    <Box direction="column" gap="medium">
      <Box direction="column">
        <Text>Service</Text>
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
          {currentUserSelection.serviceName}
        </Heading>
      </Box>
      <Box direction="column">
        <Text>
          {bookingDuration(
            currentUserSelection.startTime,
            currentUserSelection.endTime
          )}
        </Text>
      </Box>
      <Box direction="column">
        <Text>Total Investment</Text>
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
          ${currentUserSelection.currentPrice}
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
          {DateTime.fromISO(currentUserSelection.startTime).toLocaleString(
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
          {DateTime.fromISO(currentUserSelection.startTime).toLocaleString(
            DateTime.TIME_SIMPLE
          )}{" "}
          -{" "}
          {DateTime.fromISO(currentUserSelection.endTime).toLocaleString(
            DateTime.TIME_SIMPLE
          )}
        </Heading>
      </Box>
    </Box>
  );
};

export default UserDetailsSection;
