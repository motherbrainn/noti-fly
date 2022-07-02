import { serverAddress } from "../pages";
import {
  newQrCodeMutation,
  removeInactiveRecordsForPhoneNumberMutation,
  retrieveQrCodeRecordMutation,
  sendConfirmationMutation,
  sendNotificationMutation,
} from "./queries";

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
  }).then((res) => {
    return res.status;
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
