import { serverAddress } from "../pages";

export const postPhoneNumber = () => {
  fetch(`${serverAddress}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: "{ sendConfirmation }" }),
  })
    .then((r) => r.json())
    .then((data) => console.log("data returned:", data));
};
