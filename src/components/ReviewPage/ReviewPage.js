import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionPanel,
  Box,
  Heading,
  ResponsiveContext,
} from "grommet";
import InfoSection from "./InfoSection";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingView from "../Common/LoadingView";
import DetailsPanel from "./DetailsPanel";

const ReviewPage = () => {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  const size = React.useContext(ResponsiveContext);
  const bookingData = useSelector((state) =>
    state.current.bookingInfo ? true : false
  );

  useEffect(() => {
    if (!bookingData) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      setLoading(false);
    }
  }, [bookingData, navigate]);

  return loading ? (
    <LoadingView />
  ) : (
    <Box direction="column" pad="medium" fill={size !== "small" ? false : true}>
      <Box align="center" margin={{ bottom: "20px" }}>
        <Heading level="2">Review your booking details</Heading>
      </Box>

      <Box direction="row-responsive" gap="medium">
        {size !== "small" ? (
          <>
            <Box width="medium">
              <InfoSection />
            </Box>
            <Box width="medium" elevation="small" round pad="small">
              <DetailsPanel />
            </Box>
          </>
        ) : (
          <Accordion>
            <AccordionPanel label="Booking info">
              <InfoSection />
            </AccordionPanel>
            <AccordionPanel label="Your details">
              <DetailsPanel />
            </AccordionPanel>
          </Accordion>
        )}
      </Box>
    </Box>
  );
};

export default ReviewPage;
