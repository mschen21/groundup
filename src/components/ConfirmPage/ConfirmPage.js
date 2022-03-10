import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionPanel,
  Box,
  Heading,
  ResponsiveContext,
  Text,
} from "grommet";
import { API, graphqlOperation } from "aws-amplify";
import { useNavigate, useParams } from "react-router-dom";
import { getBooking } from "../../graphql/queries";
import LoadingView from "../Common/LoadingView";
import { BookingDetailsLeft, BookingDetailsRight } from "./BookingDetails";

const ConfirmPage = () => {
  let params = useParams();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bookingInfo, setBookingInfo] = useState(null);
  const size = React.useContext(ResponsiveContext);

  const sessionMessage = (status) => {
    switch (status) {
      case "new-paid":
        return "confirmed!";
      case "new-unpaid":
        return "reserved for 12 hours!";
      case "confirmed-paid":
        return "confirmed!";
      case "cancelled":
        return "cancelled.";
      default:
        return;
    }
  };

  useEffect(() => {
    const getBookingDetails = async () => {
      const dt = await API.graphql(
        graphqlOperation(getBooking, {
          bookingId: params.bookingId,
        })
      );
      setBookingInfo(dt.data.getBooking);
      console.log(dt.data.getBooking);
    };

    getBookingDetails();
    if (bookingInfo?.bookingId) {
      setLoading(false);
    }
  }, [params, navigate, bookingInfo?.bookingId]);

  return loading ? (
    <LoadingView />
  ) : (
    <Box direction="column" pad="medium" fill={size !== "small" ? false : true}>
      <Box align="center" margin={{ bottom: "20px" }}>
        <Heading level="2">
          Your session is {sessionMessage(bookingInfo.bookingStatus)}
        </Heading>
        <Text>A confirmation has been sent to your email</Text>
      </Box>

      {size !== "small" ? (
        <Box direction="row-responsive" align="start" gap="xlarge">
          <Box>
            <BookingDetailsLeft
              serviceDetails={bookingInfo.serviceDetail}
              serviceName={bookingInfo.serviceName}
            />
          </Box>
          <Box>
            <BookingDetailsRight bookingInfo={bookingInfo} />
          </Box>
        </Box>
      ) : (
        <Accordion>
          <AccordionPanel label="Booking info">
            <BookingDetailsLeft
              serviceDetails={bookingInfo.serviceDetail}
              serviceName={bookingInfo.serviceName}
            />
            <BookingDetailsRight bookingInfo={bookingInfo} />
          </AccordionPanel>
        </Accordion>
      )}
    </Box>
  );
};

export default ConfirmPage;
