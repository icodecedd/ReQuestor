import dayjs from "dayjs";

export function getDateOnly(timestamp) {
  const dateOnly = new Date(timestamp).toISOString().split("T")[0];
  return dateOnly;
}

export function formatDate(timestamp) {
  const formatted = dayjs(timestamp).format("MM/DD/YYYY");
  return formatted;
}
