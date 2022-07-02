import { serverAddress } from "../pages";

const sendConfirmationMutation = `
mutation SendConfirmation($phoneNumber: String) {
    sendConfirmation(phoneNumber: $phoneNumber)
}
`;

const newQrCodeMutation = `mutation CreateNewRecord($phoneNumber: String, $notificationId: String, $promptContent: String, $notificationContent: String, $allowMemo: Boolean) {
  createNewRecord(phone_number: $phoneNumber, notification_id: $notificationId, prompt_content: $promptContent, notification_content: $notificationContent, allow_memo: $allowMemo) {
    key
  }
}
`;

const retrieveQrCodeRecordMutation = `
query getRecords($key: String) {
  getRecords(key: $key){key, prompt_content, allow_memo}
}
`;

const removeInactiveRecordsForPhoneNumberMutation = `mutation deleteInactiveRecords($phoneNumber: String){
  deleteInactiveRecords(phone_number: $phoneNumber)
}`;

const sendNotificationMutation = `mutation sendNotification($key: String, $message: String){
  sendNotification(key: $key, message: $message)
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
  promptContent: string,
  notificationContent: string,
  allowMemo: boolean
) => {
  const res = fetch(`${serverAddress}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: newQrCodeMutation,
      variables: {
        phoneNumber,
        notificationId,
        promptContent,
        notificationContent,
        allowMemo,
      },
    }),
  })
    .then((r) => r.json())
    .then((data) => {
      return data;
    });
  return res;
};

export const retrieveQrCodeRecord = async (key: string) => {
  const res = fetch(`${serverAddress}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: retrieveQrCodeRecordMutation,
      variables: { key },
    }),
  })
    .then((r) => r.json())
    .then((data) => {
      return data;
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

export const sendNotification = async (key: string, message: string) => {
  const res = fetch(`${serverAddress}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: sendNotificationMutation,
      variables: { key, message },
    }),
  }).then((response) => {
    return response.status;
  });
  return res;
};
