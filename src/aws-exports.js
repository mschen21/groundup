export const awsconfig = {
  API: {
    aws_appsync_graphqlEndpoint:
      "https://2sjy574sejec3k36l6mrqzzcqy.appsync-api.us-east-1.amazonaws.com/graphql",
    aws_appsync_region: "us-east-1",
    aws_appsync_authenticationType: "API_KEY",
    aws_appsync_apiKey: "da2-6hfu6v4ksngxnjixdy2t4phz3a",
    // aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  },
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: "us-east-1",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "us-east-1_GpZfyIMsC",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "4uvu93r2mr0tn4522n09v8b96f",

    oauth: {
      domain: "groundup.auth.us-east-1.amazoncognito.com",
      scope: ["phone", "email", "profile", "openid"],
      redirectSignIn: "http://localhost:3000",
      redirectSignOut: "http://localhost:3000",
      responseType: "code", // or 'token', note that REFRESH token will only be generated when the responseType is code
    },
  },
};
