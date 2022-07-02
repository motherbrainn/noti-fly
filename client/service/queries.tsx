export const sendConfirmationMutation = `
mutation SendConfirmation($phoneNumber: String) {
    sendConfirmation(phoneNumber: $phoneNumber)
}
`;

export const newQrCodeMutation = `mutation CreateNewRecord($phoneNumber: String, $notificationId: String, $promptContent: String, $notificationContent: String, $allowMemo: Boolean) {
  createNewRecord(phone_number: $phoneNumber, notification_id: $notificationId, prompt_content: $promptContent, notification_content: $notificationContent, allow_memo: $allowMemo) {
    key
  }
}
`;

export const retrieveQrCodeRecordMutation = `
query getRecords($key: String) {
  getRecords(key: $key){key, prompt_content, allow_memo}
}
`;

export const removeInactiveRecordsForPhoneNumberMutation = `mutation deleteInactiveRecords($phoneNumber: String){
  deleteInactiveRecords(phone_number: $phoneNumber)
}`;

export const sendNotificationMutation = `mutation sendNotification($key: String, $message: String){
  sendNotification(key: $key, message: $message)
}`;
