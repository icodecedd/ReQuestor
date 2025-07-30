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
    case "Approved":
      return "teal";
    case "Waitlisted":
      return "yellow";
    case "Cancelled":
      return "red";
    case "Completed":
      return "green";
    default:
      return "gray";
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
