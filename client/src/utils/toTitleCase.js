export function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .filter(Boolean) // remove extra spaces
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
