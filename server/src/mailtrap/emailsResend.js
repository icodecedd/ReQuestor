import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const sender = "ReQuestor System <onboarding@resend.dev>"; // update as needed

export const sendVerificationFromResend = async (email, verificationToken) => {
  const verificationLink = `${process.env.SERVER_URL}/api/auth/verify-email/${verificationToken}`;

  try {
    const response = await resend.emails.send({
      from: sender,
      to: email, // can be a string or array of emails
      subject: "Verify your email address",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verifyLink}",
        verificationLink
      ),
    });

    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error in sendVerificationFromResend:", error);
  }
};

export const sendPasswordResetFromResend = async (email, resetToken) => {
  const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  try {
    const response = await resend.emails.send({
      from: sender,
      to: email, // Resend expects string or array
      subject: "Reset your password",
      html: PASSWORD_RESET_EMAIL_TEMPLATE.replace("{resetLink}", resetLink),
    });

    console.log("Password reset email sent:", response);
  } catch (error) {
    console.error("Error in sendPasswordResetEmail:", error);
  }
};

export const sendResetSuccessFromResend = async (email) => {
  try {
    const response = await resend.emails.send({
      from: sender,
      to: email,
      subject: "Password reset successful",
      html: PASSWORD_RESET_SUCCESS_EMAIL_TEMPLATE,
    });

    console.log("Password reset success email sent:", response);
  } catch (error) {
    console.error("Error in sendResetSuccessEmail:", error);
  }
};