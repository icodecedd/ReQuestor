import { mailTransporter } from "../emailservices/gmailConfig.js";
import {
  ADMIN_RESET_PASSWORD_EMAIL_TEMPLATE,
  PASSWORD_RESET_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_EMAIL_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  ADMIN_NOTIFICATION_TEMPLATE,
  APPROVED_REQUEST_EMAIL_TEMPLATE,
  REJECTED_REQUEST_EMAIL_TEMPLATE,
  CANCELLED_REQUEST_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

// Send Verification Email
export const sendVerificationEmail = async (email, verificationToken) => {
  const verificationLink = `${process.env.SERVER_URL}/api/auth/verify-email/${verificationToken}`;

  const mailOptions = {
    from: `"ReQuestor System" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Verify Your Email Address",
    html: VERIFICATION_EMAIL_TEMPLATE.replace("{verifyLink}", verificationLink),
  };

  try {
    const info = await mailTransporter.sendMail(mailOptions);
    console.log("Verification email sent:", info.response);
  } catch (error) {
    console.error("Error in sendVerificationEmail:", error);
  }
};

// Send Welcome Email
export const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: `"ReQuestor System" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Welcome to ReQuestor",
    html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
  };

  try {
    const info = await mailTransporter.sendMail(mailOptions);
    console.log("Welcome email sent:", info.response);
  } catch (error) {
    console.error("Error in sendWelcomeEmail:", error);
  }
};

// Send Password Reset Email
export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: `"ReQuestor System" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Reset Your Password",
    html: PASSWORD_RESET_EMAIL_TEMPLATE.replace("{resetLink}", resetLink),
  };

  try {
    const info = await mailTransporter.sendMail(mailOptions);
    console.log("Password reset email sent:", info.response);
  } catch (error) {
    console.error("Error in sendPasswordResetEmail:", error);
  }
};

// Send Password Reset Success Email
export const sendResetSuccessEmail = async (email) => {
  const mailOptions = {
    from: `"ReQuestor System" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Password Reset Successful",
    html: PASSWORD_RESET_SUCCESS_EMAIL_TEMPLATE,
  };

  try {
    const info = await mailTransporter.sendMail(mailOptions);
    console.log("Reset success email sent:", info.response);
  } catch (error) {
    console.error("Error in sendResetSuccessEmail:", error);
  }
};

export const sendAdminResetPasswordEmail = async (email, tempPassword) => {
  const loginLink = `${process.env.CLIENT_URL}/login`;

  const mailOptions = {
    from: `"ReQuestor System" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Reset Your Password - Admin",
    html: ADMIN_RESET_PASSWORD_EMAIL_TEMPLATE.replace(
      "{tempPassword}",
      tempPassword
    ).replace("{loginLink}", loginLink),
  };

  try {
    const info = await mailTransporter.sendMail(mailOptions);
    console.log("Admin reset password email sent:", info.response);
  } catch (error) {
    console.error("Error in sendAdminResetPasswordEmail:", error);
  }
};

export const sendRequestInfoEmail = async (email, requestDetails) => {
  const dashboardLink = `${process.env.CLIENT_URL}/admin/dashboard`;
  const {
    course_section,
    faculty_in_charge,
    date_use,
    time_from,
    time_to,
    purpose,
    request_id,
    name,
    email: userEmail,
    equipment_list,
    submitted_on,
  } = requestDetails;

  const date = new Date(submitted_on);
  const plus8 = new Date(date.getTime() + 8 * 60 * 60 * 1000);

  const mailOptions = {
    from: `"ReQuestor System" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Request Information",
    html: ADMIN_NOTIFICATION_TEMPLATE.replace("{requestId}", request_id)
      .replace("{userName}", name)
      .replace("{userEmail}", userEmail)
      .replace("{courseSection}", course_section)
      .replace("{faculty}", faculty_in_charge)
      .replace(
        "{equipmentList}",
        equipment_list.map((item) => item.equipment_name).join(", ")
      )
      .replace("{requestDate}", date_use)
      .replace("{startTime}", time_from)
      .replace("{endTime}", time_to)
      .replace("{purpose}", purpose)
      .replace("{SubmittedOn}", plus8.toLocaleString())
      .replace("{dashboardLink}", dashboardLink),
  };

  try {
    const info = await mailTransporter.sendMail(mailOptions);
    console.log("Request information email sent:", info.response);
  } catch (error) {
    console.error("Error in sendRequestInfoEmail:", error);
  }
};

export const sendApprovedRequestEmail = async (email, requestDetails) => {
  const dashboardLink = `${process.env.CLIENT_URL}/student/dashboard`;

  const {
    date_use,
    time_from,
    time_to,
    purpose,
    request_id,
    name,
    equipment_list,
  } = requestDetails;

  const mailOptions = {
    from: `"ReQuestor System" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Request Approved",
    html: APPROVED_REQUEST_EMAIL_TEMPLATE.replace("{name}", name)
      .replace("{requestId}", request_id)
      .replace(
        "{equipmentList}",
        equipment_list.map((item) => item.equipment_name).join(", ")
      )
      .replace("{requestDate}", date_use)
      .replace("{startTime}", time_from)
      .replace("{endTime}", time_to)
      .replace("{purpose}", purpose)
      .replace("{dashboardLink}", dashboardLink),
  };

  try {
    const info = await mailTransporter.sendMail(mailOptions);
    console.log("Approved request email sent:", info.response);
  } catch (error) {
    console.error("Error in sendApprovedRequestEmail:", error);
  }
};

export const sendRejectedRequestEmail = async (email, requestDetails) => {
  const dashboardLink = `${process.env.CLIENT_URL}/student/dashboard`;

  const {
    date_use,
    time_from,
    time_to,
    purpose,
    request_id,
    name,
    equipment_list,
  } = requestDetails;

  const mailOptions = {
    from: `"ReQuestor System" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Request Rejected",
    html: REJECTED_REQUEST_EMAIL_TEMPLATE.replace("{name}", name)
      .replace("{requestId}", request_id)
      .replace(
        "{equipmentList}",
        equipment_list.map((item) => item.equipment_name).join(", ")
      )
      .replace("{requestDate}", date_use)
      .replace("{startTime}", time_from)
      .replace("{endTime}", time_to)
      .replace("{purpose}", purpose)
      .replace("{dashboardLink}", dashboardLink),
  };

  try {
    const info = await mailTransporter.sendMail(mailOptions);
    console.log("Rejected request email sent:", info.response);
  } catch (error) {
    console.error("Error in sendRejectedRequestEmail:", error);
  }
};

export const sendCancelledRequestEmail = async (email, requestDetails) => {
  const dashboardLink = `${process.env.CLIENT_URL}/student/dashboard`;
  const newRequestLink = `${process.env.CLIENT_URL}/student/request`;

  const {
    date_use,
    time_from,
    time_to,
    purpose,
    request_id,
    name,
    equipment_list,
  } = requestDetails;

  const mailOptions = {
    from: `"ReQuestor System" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Request Cancelled",
    html: CANCELLED_REQUEST_EMAIL_TEMPLATE.replace("{name}", name)
      .replace("{requestId}", request_id)
      .replace(
        "{equipmentList}",
        equipment_list.map((item) => item.equipment_name).join(", ")
      )
      .replace("{requestDate}", date_use)
      .replace("{startTime}", time_from)
      .replace("{endTime}", time_to)
      .replace("{purpose}", purpose)
      .replace("{dashboardLink}", dashboardLink)
      .replace("{newRequestLink}", newRequestLink),
  };

  try {
    const info = await mailTransporter.sendMail(mailOptions);
    console.log("Cancelled request email sent:", info.response);
  } catch (error) {
    console.error("Error in sendCancelledRequestEmail:", error);
  }
};
