import { serverAddress } from "../pages";

const sendConfirmationQuery = `
query SendConfirmation($phoneNumber: String) {
    sendConfirmation(phoneNumber: $phoneNumber)
}
`;

export const sendConfirmationTextMessage = (phoneNumber: string) => {
  fetch(`${serverAddress}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: sendConfirmationQuery,
      variables: { phoneNumber },
    }),
  });
};
