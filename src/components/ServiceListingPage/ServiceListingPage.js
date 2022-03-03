import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getCompany } from "../../graphql/queries";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Text, ResponsiveContext, ThemeContext } from "grommet";
import { DateTime } from "luxon";
import { useDispatch } from "react-redux";
import { selectService, setCompInfo } from "../../features/stateSlice";
import LoadingView from "../Common/LoadingView";

const ServiceListingItem = ({ itemInfo }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Button
      disabled={itemInfo.nextAvailability ? false : true}
      secondary
      onClick={() => {
        dispatch(selectService(itemInfo));
        navigate(`/service/${itemInfo.sk.substr(4)}`);
      }}
      alignSelf="stretch"
      label={
        <Box direction="row-responsive" justify="between" flex="grow">
          <Box>
            <ThemeContext.Extend
              value={{ text: { extend: "text-transform: uppercase" } }}
            >
              <Text>{itemInfo.serviceName}</Text>
            </ThemeContext.Extend>
          </Box>
          <Box>
            {itemInfo.nextAvailability ? (
              <Text weight="normal">
                {`Next Available: ${DateTime.fromISO(
                  itemInfo.nextAvailability.startTime
                ).toLocaleString(DateTime.DATE_MED)}`}
              </Text>
            ) : (
              <Text weight="normal">Unavailable</Text>
            )}
          </Box>
        </Box>
      }
    />
  );
};

const ServiceListing = () => {
  const size = React.useContext(ResponsiveContext);
  const dispatch = useDispatch();

  let { companyId } = useParams();
  const [loading, setLoading] = useState(true);
  const [companyInfo, setCompanyInfo] = useState();

  useEffect(() => {
    const getCompanyInfo = async () => {
      const companyResult = await API.graphql(
        graphqlOperation(getCompany, {
          companyId: `CO#${companyId}`,
        })
      );
      setCompanyInfo(companyResult.data.getCompany);
      dispatch(setCompInfo(companyResult.data.getCompany));
      if (companyResult.data.getCompany?.hasOwnProperty("services")) {
        setLoading(false);
      }
    };

    getCompanyInfo();
  }, [companyId, dispatch]);

  return loading ? (
    <LoadingView />
  ) : (
    <Box
      pad="medium"
      gap="medium"
      width="large"
      fill={size === "medium" || size === "small" ? "horizontal" : false}
    >
      {companyInfo.services.map((service) => {
        return <ServiceListingItem key={service.sk} itemInfo={service} />;
      })}
    </Box>
  );
};

export default ServiceListing;
