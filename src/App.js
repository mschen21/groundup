import React from "react";
import { Box, Grommet } from "grommet";
import { customTheme } from "./theme";
import { awsconfig } from "./aws-exports";
import { Amplify } from "aws-amplify";
// import { Authenticator } from "@aws-amplify/ui-react";
import { Outlet } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css"; // default theme

Amplify.configure(awsconfig);

function App() {
  return (
    // <Authenticator socialProviders={["google"]} signUpAttributes={["name"]}>
    // {({ signOut, user }) => (
    <Grommet theme={customTheme} full>
      <Box align="center">
        <Outlet />
      </Box>
    </Grommet>
    // )}
    // </Authenticator>
  );
}

export default App;
