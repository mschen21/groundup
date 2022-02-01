import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listAvailabilityByService } from "../../graphql/queries";
import { useNavigate, useParams } from "react-router-dom";
import {
  Accordion,
  AccordionPanel,
  Box,
  Heading,
  ResponsiveContext,
} from "grommet";
import CalendarSelection from "./CalendarSelection";
import { DateTime } from "luxon";
import LoadingView from "../Common/LoadingView";
import { useDispatch, useSelector } from "react-redux";
import ServiceDetails from "./ServiceDetails";

const ServiceBookingPage = () => {
  let { serviceId } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [serviceInfo, setServiceInfo] = useState();

  const size = React.useContext(ResponsiveContext);

  const companyServices = useSelector((state) => state.current.serviceSelected);

  useEffect(() => {
    const now = DateTime.utc();

    const getServiceInfo = async () => {
      const serviceResult = await API.graphql(
        graphqlOperation(listAvailabilityByService, {
          serviceId: `SER#${serviceId}`,
          startTime: now.toISO({ includeOffset: false }),
          endTime: now.plus({ months: 3 }).toISODate(),
        })
      );
      console.log(serviceResult);
      setServiceInfo(serviceResult.data.listAvailabilityByService.items);
      if (
        !serviceResult.data.listAvailabilityByService?.hasOwnProperty("items")
      ) {
        navigate("/");
      } else {
        setLoading(false);
      }
    };

    if (!companyServices) {
      navigate("/");
    } else {
      getServiceInfo();
    }
  }, [serviceId, dispatch, navigate, companyServices]);

  return loading ? (
    <LoadingView />
  ) : (
    <Box direction="column" pad="medium" fill={size !== "small" ? false : true}>
      <Box align="center" margin={{ bottom: "20px" }}>
        <Heading level="2">Select date and time</Heading>
      </Box>

      <Box direction="row-responsive" gap="medium">
        {size !== "small" ? (
          <Box width="small">
            <ServiceDetails />
          </Box>
        ) : (
          <Accordion>
            <AccordionPanel label="Booking info">
              <Box pad="small">
                <ServiceDetails />
              </Box>
            </AccordionPanel>
          </Accordion>
        )}

        <CalendarSelection availableDates={serviceInfo} />
      </Box>
    </Box>
  );
};

export default ServiceBookingPage;
