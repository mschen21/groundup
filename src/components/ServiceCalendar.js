import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listAvailabilityByService } from "../graphql/queries";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "grommet";
import CalendarLandingPage from "./CalendarLandingPage";
import { DateTime } from "luxon";
import LoadingView from "./LoadingView";
import { useDispatch, useSelector } from "react-redux";

const ServiceCalendar = () => {
  let { serviceId } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [serviceInfo, setServiceInfo] = useState();

  const companyServices = useSelector((state) => state.current.serviceSelected);

  useEffect(() => {
    const now = DateTime.utc();

    const getServiceInfo = async () => {
      const serviceResult = await API.graphql(
        graphqlOperation(listAvailabilityByService, {
          serviceId: `SER#${serviceId}`,
          startTime: now.toISO({ includeOffset: false }),
          endTime: now.endOf("month").toISODate(),
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
    <Box align="center" pad="medium" fill>
      <CalendarLandingPage availableDates={serviceInfo} />
    </Box>
  );
};

export default ServiceCalendar;
