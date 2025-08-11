export const getEqStatusColor = (status) => {
  switch (status) {
    case "Available":
      return "green";
    case "In Use":
      return "blue";
    case "Reserved":
      return "purple";
    case "Under Repair":
      return "orange";
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

export const getRequestStatusColor = (status) => {
  switch (status) {
    case "Reserved":
      return "cyan"; // Indicates a scheduled/reserved action
    case "Pending":
      return "orange"; // Neutral, commonly used for 'in progress'
    case "Rejected":
      return "red"; // Signals failure or denial
    case "Waitlisted":
      return "orange"; // Indicates attention needed or a queued state
    case "Cancelled":
      return "gray"; // Neutral/inactive status
    case "Completed":
      return "green"; // Positive, finalized successfully
    default:
      return "gray"; // Fallback for unknown statuses
  }
};

export const getUserColor = (status) => {
  switch (status) {
    case "Admin":
      return "maroon";
    case "Student":
      return "white";
    case "Active":
      return "green";
    case "Inactive":
      return "red";
    default:
      return "gray";
  }
};

export const getActivityColor = (category) => {
  switch (category) {
    case "USERS":
      return "blue";
    case "REQUESTS":
      return "orange";
    case "EQUIPMENT":
      return "green";
    case "SYSTEM":
      return "red";
    default:
      return "gray";
  }
};
