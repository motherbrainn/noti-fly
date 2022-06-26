import { serverAddress } from "../pages";

const sendConfirmationMutation = `
mutation SendConfirmation($phoneNumber: String) {
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
      query: sendConfirmationMutation,
      variables: { phoneNumber },
    }),
  });
};
