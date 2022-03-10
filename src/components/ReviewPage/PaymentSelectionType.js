import { Box, Button } from "grommet";
import { useDispatch, useSelector } from "react-redux";
import { selectPaymentType } from "../../features/paymentSlice";

const PaymentSelectionType = () => {
  const dispatch = useDispatch();
  const paymentOptionsList = useSelector(
    (state) => state.current.companyInfo?.paymentOptions
  );

  return (
    <Box direction="column" gap="small" margin={{ top: "1.5em" }}>
      {paymentOptionsList.map((option) => {
        return (
          <Button
            key={option.method}
            secondary
            label={`Pay with ${option.name}`}
            onClick={() => dispatch(selectPaymentType(option.method))}
          />
        );
      })}
    </Box>
  );
};

export default PaymentSelectionType;
