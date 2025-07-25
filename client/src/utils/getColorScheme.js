export const getEqStatusColor = (status) => {
  switch (status) {
    case "Available":
      return "green";
    case "In Use":
      return "blue";
    case "Under Repair":
      return "orange";
    case "Lost":
      return "red";
    case "Decommissioned":
      return "gray";
    default:
      return "gray";
  }
};

export const getEqConditionColor = (condition) => {
  switch (condition) {
    case "Excellent":
      return "green";
    case "Good":
      return "blue";
    case "Fair":
      return "yellow";
    case "Poor":
      return "orange";
    case "Broken":
      return "red";
    default:
      return "gray";
  }
};
