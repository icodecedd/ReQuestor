import { mailtrapClient, sender } from "./mailtrapConfig.js";
import {
  PASSWORD_RESET_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_EMAIL_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email: email }];

  const verificationLink = `${process.env.SERVER_URL}/api/auth/verify-email/${verificationToken}`;

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email address",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verifyLink}",
        verificationLink
      ),
      category: "Verification",
    });
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error in sendVerificationEmail:", error);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email: email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Welcome to ReQuestor",
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
      category: "Welcome",
    });
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error in sendWelcomeEmail:", error);
  }
};

export const sendPasswordResetEmail = async (email, resetToken) => {
  const recipient = [{ email: email }];

  const resetLink = `${process.env.CLIENT_URL}/api/auth/reset-password/${resetToken}`;

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_EMAIL_TEMPLATE.replace("{resetLink}", resetLink),
      category: "Password Reset",
    });
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error in sendPasswordResetEmail:", error);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email: email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_EMAIL_TEMPLATE,
      category: "Password Reset",
    });
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error in sendResetSuccessEmail:", error);
  }
};
