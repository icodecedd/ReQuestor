import {mailTransporter} from "../emailservices/gmailConfig.js";
import {
  ADMIN_RESET_PASSWORD_EMAIL_TEMPLATE,
  PASSWORD_RESET_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_EMAIL_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

// Send Verification Email
export const sendVerificationEmail = async (email, verificationToken) => {
    const verificationLink = `${process.env.SERVER_URL}/api/auth/verify-email/${verificationToken}`;

    const mailOptions = {
        from: `"ReQuestor System" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Verify your email address",
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
    const resetLink = `${process.env.CLIENT_URL}/api/auth/reset-password/${resetToken}`;

    const mailOptions = {
        from: `"ReQuestor System" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Reset your password",
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
        subject: "Password reset successful",
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
        subject: "Reset your password",
        html: ADMIN_RESET_PASSWORD_EMAIL_TEMPLATE.replace("{tempPassword}", tempPassword).replace('{loginLink}', loginLink),
    };

    try {
        const info = await mailTransporter.sendMail(mailOptions);
        console.log("Admin reset password email sent:", info.response);
    } catch (error) {
        console.error("Error in sendAdminResetPasswordEmail:", error);
    }
}
