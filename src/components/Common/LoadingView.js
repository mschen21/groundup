import { Box, Text, Spinner } from "grommet";

const LoadingView = () => {
  return (
    <Box align="center" pad="large">
      <Spinner />
      <Text>Loading...</Text>
    </Box>
  );
};

export default LoadingView;
