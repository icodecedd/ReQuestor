export const handleAdd = () => {
  
}

export const handleEdit = (id) => {
  console.log("Edit user:", id);
  // Open modal, fetch user details, etc.
};

export const handleResetPassword = (id) => {
  console.log("Reset password for:", id);
  // API call to reset password
};

export const handleToggleStatus = (id) => {
  console.log("Toggle status for:", id);
  // API call to activate/deactivate
};

export const handleDelete = (id) => {
  console.log("Delete user:", id);
  // Confirm before deleting, then call API
};
