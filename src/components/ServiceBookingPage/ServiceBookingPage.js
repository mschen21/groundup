import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
  getCompany,
  getService,
  listAvailabilityByService,
} from "../../graphql/queries";
import { useNavigate, useParams } from "react-router-dom";
import {
  Accordion,
  AccordionPanel,
  Box,
  Heading,
  ResponsiveContext,
  Text,
  Tip,
} from "grommet";
import CalendarSelection from "./CalendarSelection";
import { DateTime } from "luxon";
import LoadingView from "../Common/LoadingView";
import { useDispatch, useSelector } from "react-redux";
import ServiceDetails from "./ServiceDetails";
import FooterSection from "../Common/FooterSection";
import { selectService, setCompInfo } from "../../features/stateSlice";
import { CircleInformation } from "grommet-icons";

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
    };

    const getServiceDetail = async () => {
      const serviceInfo = await API.graphql(
        graphqlOperation(getService, {
          serviceId: `SER#${serviceId}`,
        })
      );
      dispatch(selectService(serviceInfo.data.getService));

      const compData = await API.graphql(
        graphqlOperation(getCompany, {
          companyId: serviceInfo.data.getService.id,
        })
      );
      dispatch(setCompInfo(compData.data.getCompany));
    };

    if (!companyServices) {
      getServiceDetail();
      getServiceInfo();
    } else {
      getServiceInfo();
    }
  }, [serviceId, dispatch, navigate, companyServices]);

  useEffect(() => {
    if (companyServices && serviceInfo) {
      setLoading(false);
    }
  }, [companyServices, serviceInfo]);

  return loading ? (
    <LoadingView />
  ) : (
    <Box direction="column" pad="medium" fill={size !== "small" ? false : true}>
      <Box
        align="center"
        margin={{ bottom: "20px" }}
        direction="row"
        gap="small"
        alignSelf="center"
      >
        <Heading level="2">Select date and time</Heading>
        <Tip content="Times & locations vary by date">
          <CircleInformation size="medium" />
        </Tip>
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
      <Box align="center" margin={{ top: "20px" }}>
        <FooterSection />
      </Box>
    </Box>
  );
};

export default ServiceBookingPage;
