import { formatDistanceToNow } from "date-fns";

export function timeAgo(timestamp) {
  // Replace space with "T" if needed
  const safeTimestamp = timestamp.includes("T")
    ? timestamp
    : timestamp.replace(" ", "T");

  return formatDistanceToNow(new Date(safeTimestamp), { addSuffix: true });
}

export function formatTime(timeString) {
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
