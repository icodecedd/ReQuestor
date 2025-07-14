import { formatDistanceToNow } from "date-fns";

export function timeAgo(timestamp) {
  // Replace space with "T" if needed
  const safeTimestamp = timestamp.includes("T")
    ? timestamp
    : timestamp.replace(" ", "T");

  return formatDistanceToNow(new Date(safeTimestamp), { addSuffix: true });
}
