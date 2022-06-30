import { serverAddress } from "../pages";

const sendConfirmationMutation = `
mutation SendConfirmation($phoneNumber: String) {
    sendConfirmation(phoneNumber: $phoneNumber)
}
`;

const newQrCodeMutation = `mutation CreateNewRecord($phoneNumber: String, $notificationId: String, $promptContent: String) {
  createNewRecord(phone_number: $phoneNumber, notification_id: $notificationId, prompt_content: $promptContent) {
    id
  }
}
`;

const removeInactiveRecordsForPhoneNumberMutation = `mutation deleteInactiveRecords($phoneNumber: String){
  deleteInactiveRecords(phone_number: $phoneNumber)
}`;

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

export const createNewQrCodeRecord = async (
  phoneNumber: string,
  notificationId: string,
  promptContent: string
) => {
  const res = fetch(`${serverAddress}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: newQrCodeMutation,
      variables: { phoneNumber, notificationId, promptContent },
    }),
  }).then((response) => {
    return response.status;
  });
  return res;
};

export const removeInactiveRecordsForPhoneNumber = async (
  phoneNumber: string
) => {
  const res = fetch(`${serverAddress}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: removeInactiveRecordsForPhoneNumberMutation,
      variables: { phoneNumber },
    }),
  }).then((response) => {
    return response.status;
  });
  return res;
};
