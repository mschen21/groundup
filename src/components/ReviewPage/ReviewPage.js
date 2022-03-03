import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionPanel,
  Box,
  Heading,
  ResponsiveContext,
  Text,
} from "grommet";
import InfoSection from "./InfoSection";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingView from "../Common/LoadingView";
import DetailsPanel from "./DetailsPanel";
import PaymentSelectionType from "./PaymentSelectionType";
import StripePaymentContent from "./StripePaymentContent";
import CustomPaymentContent from "./CustomPaymentContent";

const renderPanelHeader = (title, active, edit) => (
  <Box direction="row" align="center" pad="small" gap="small">
    <strong>
      <Text>{title}</Text>
    </strong>
    <Text color="brand">{active ? "-" : "+"}</Text>
    {edit && <Text color="brand">edit</Text>}
  </Box>
);

const ReviewPage = () => {
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState([0]);
  let navigate = useNavigate();
  const size = React.useContext(ResponsiveContext);
  const bookingData = useSelector((state) =>
    state.current.bookingInfo ? true : false
  );
  const bookingDetails = useSelector((state) => state.payment.bookingDetails);
  const paymentType = useSelector((state) => state.payment.paymentState);
  const availPaymentOptions = useSelector(
    (state) => state.current.companyInfo?.paymentOptions
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

      <Box direction="row-responsive" gap="medium" align="start">
        {size !== "small" ? (
          <>
            <Box width="medium">
              <InfoSection />
            </Box>
            <Accordion
              width="medium"
              pad="small"
              activeIndex={activeIndex}
              onActive={(newActiveIndex) => setActiveIndex(newActiveIndex)}
            >
              <AccordionPanel
                header={renderPanelHeader(
                  "Your details",
                  activeIndex.includes(0),
                  bookingDetails ? true : false
                )}
              >
                <DetailsPanel updateActiveIndex={() => setActiveIndex([1])} />
              </AccordionPanel>
              {bookingDetails && (
                <AccordionPanel
                  header={renderPanelHeader(
                    "Payment details",
                    activeIndex.includes(1),
                    false
                  )}
                  label="Payment details"
                >
                  {!paymentType && <PaymentSelectionType />}
                  {paymentType === "credit-card" && <StripePaymentContent />}
                  {paymentType === "zelle" && (
                    <CustomPaymentContent
                      contentDetails={
                        availPaymentOptions.filter(
                          (p) => p.method === "zelle"
                        )[0]
                      }
                    />
                  )}
                  {paymentType === "venmo" && (
                    <CustomPaymentContent
                      contentDetails={
                        availPaymentOptions.filter(
                          (p) => p.method === "venmo"
                        )[0]
                      }
                    />
                  )}
                </AccordionPanel>
              )}
            </Accordion>
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
