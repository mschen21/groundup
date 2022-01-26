import { Box, Button } from "grommet";
import { useDispatch } from "react-redux";
import { selectPaymentType } from "../../features/paymentSlice";

const PaymentSelectionType = () => {
  const dispatch = useDispatch();

  return (
    <Box direction="row" gap="small">
      <Button
        primary
        label="Pay with Credit Card"
        onClick={() => dispatch(selectPaymentType("credit-card"))}
      />
      <Button
        primary
        label="Pay with Zelle"
        onClick={() => dispatch(selectPaymentType("zelle"))}
      />
      <Button
        primary
        label="Pay with Venmo"
        onClick={() => dispatch(selectPaymentType("venmo"))}
      />
    </Box>
  );
};

export default PaymentSelectionType;
