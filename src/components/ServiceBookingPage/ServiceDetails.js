import React from "react";
import { Box, Heading, Text } from "grommet";
import { useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";

const ServiceDetails = () => {
  const currentUserSelection = useSelector(
    (state) => state.current.serviceSelected
  );

  //const bookingInfoSelected = useSelector((state) => state.current.bookingInfo);

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
        {currentUserSelection.serviceName}
      </Heading>

      <Box>{ReactHtmlParser(currentUserSelection.descriptionDetails)}</Box>
    </Box>
  );
};

export default ServiceDetails;
