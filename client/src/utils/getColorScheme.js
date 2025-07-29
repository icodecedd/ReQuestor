export const getEqStatusColor = (status) => {
  switch (status) {
    case "Available":
      return "green";
    case "In Use":
      return "blue";
    case "Reserved":
      return "yellow";
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
    case "Pending":
      return "yellow";
    case "Approved":
      return "green";
    case "Rejected":
      return "red";
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

