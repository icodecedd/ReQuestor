import { formatDistanceToNow } from "date-fns";

export function timeAgo(timestamp) {
  // Ensure we have a valid ISO format
  const safeTimestamp = timestamp.includes("T")
    ? timestamp
    : timestamp.replace(" ", "T");

  // Parse the UTC date
  const utcDate = new Date(safeTimestamp);

  // Convert to UTC+8 (Philippines)
  const localDate = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000);

  return formatDistanceToNow(localDate, { addSuffix: true });
}

export function formatTime(timestamp) {
  const safeTimestamp = timestamp.includes("T")
    ? timestamp
    : timestamp.replace(" ", "T");

  // parse the timestamp as UTC
  const utcDate = new Date(safeTimestamp);

  // manually convert to UTC+8 (Philippines)
  const localDate = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000);

  // format (HH:MM AM/PM)
  return localDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatTimeOnly(timeString) {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
// utils/filterByTime.js
export function getTimeLabel(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();

  // Check Today
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  if (date >= startOfToday) return "Today";

  // Check Last Week
  const oneWeekAgo = new Date(now);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  if (date >= oneWeekAgo) return "Last Week";

  // Check Last Month
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  if (date >= oneMonthAgo) return "Last Month";

  // Default
  return "All Time";
}

// Convert timestamp to datetime-local format (YYYY-MM-DDTHH:MM)
export const timestampToInputFormat = (timestamp) => {
  if (!timestamp) return "";

  // parse the UTC timestamp
  const utcDate = new Date(timestamp);

  // convert to UTC+8 (Philippines)
  const phDate = new Date(utcDate.getTime() + 8 * 60 * 60 * 1000);

  // convert to ISO string and cut the seconds
  const isoString = phDate.toISOString();
  return isoString.substring(0, 16); // "YYYY-MM-DDTHH:MM"
};

// Convert datetime-local format to timestamp
export const inputFormatToTimestamp = (inputString) => {
  if (!inputString) return null;
  return new Date(inputString).getTime();
};
