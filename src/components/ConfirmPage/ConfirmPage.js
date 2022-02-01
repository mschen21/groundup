import React, { useEffect, useState } from "react";
import { Box, Spinner, Text } from "grommet";
import { API, graphqlOperation } from "aws-amplify";
import { useNavigate, useParams } from "react-router-dom";
import { getBooking } from "../../graphql/queries";
import { useSelector } from "react-redux";

const ConfirmPage = () => {
  let params = useParams();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const companyId = useSelector(
    (state) => state.current?.bookingInfo?.companyId
  );
  const startTimeBooked = useSelector(
    (state) => state.current?.bookingInfo?.startTime
  );

  useEffect(() => {
    const getBookingDetails = async () => {
      const details = await API.graphql(
        graphqlOperation(getBooking, {
          bookingId: params.bookingId,
          bookingSk: `BOOK#${startTimeBooked}`,
          companyId: companyId,
        })
      );
      console.log(details);
    };

    if (!startTimeBooked) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      setLoading(false);
      getBookingDetails();
    }
  }, [params, companyId, startTimeBooked, navigate]);

  return loading ? (
    <Box align="center">
      <Spinner />
      <Text>Loading</Text>
    </Box>
  ) : (
    <Box>Confirm Page</Box>
  );
};

export default ConfirmPage;
