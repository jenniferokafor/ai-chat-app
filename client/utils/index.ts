import { Alert } from "react-native";
import { IAlert } from "../interfaces";
import { IMessage } from "react-native-gifted-chat";

// check if user has hit daily limit of 10 messages
export const hasHitDailyLimit = (messages: IMessage[]) => {
  let todayCount = 0;
  let now = new Date();
  const last10Messages = messages
    .filter((message) => message.user._id === 1)
    .slice(-10);
  const last10Timestamps = last10Messages.map((message) => message.createdAt);

  let currentYear = now.getUTCFullYear();
  let currentMonth = now.getUTCMonth();
  let currentDay = now.getUTCDate();

  // Check each date in the array
  for (let i = 0; i < last10Timestamps.length; i++) {
    // Create a new Date object from the string
    let dateObj: Date = new Date(last10Timestamps[i]);

    // Extract the year, month and day values
    let dateYear = dateObj.getUTCFullYear();
    let dateMonth = dateObj.getUTCMonth();
    let dateDay = dateObj.getUTCDate();

    // If the date is today, increment the counter
    if (
      dateYear === currentYear &&
      dateMonth === currentMonth &&
      dateDay === currentDay
    ) {
      todayCount++;
    }
  }

  // Check if there were at least 10 messages from today
  if (todayCount >= 10) {
    return true;
  } else {
    return false;
  }
};

export const showAlert = ({ title, message }: IAlert) =>
  Alert.alert(
    title,
    message,
    [
      {
        text: "Cancel",
        style: "cancel",
      },
    ],
    {
      cancelable: true,
    }
  );
