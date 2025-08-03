// utils/validateRequiredFields.js

export function validateRequiredFields(
  formData,
  requiredFields,
  setErrors,
  showToast
) {
  const missing = requiredFields.filter((field) => !formData[field]?.trim());

  if (missing.length > 0) {
    // Set error state
    setErrors((prev) => {
      const updated = { ...prev };
      missing.forEach((field) => {
        updated[field] = true;
      });
      return updated;
    });

    // Build readable toast message
    const fieldLabels = {
      email: "Email",
      password: "Password",
      name: "Name",
      student_number: "Student Number",
    };

    const missingLabels = missing.map((f) => fieldLabels[f] || f);

    const toastMessage =
      missing.length === requiredFields.length
        ? "All fields are required"
        : `Missing field${missing.length > 1 ? "s" : ""}: ${missingLabels.join(
            ", "
          )}`;

    showToast(toastMessage);

    return true;
  }

  return false;
}
