export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify Your ReQuestor Account</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f2f2f2; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="background-color: #800000; padding: 20px; text-align: center;">
      <h1 style="color: #fff; margin: 0;">ReQuestor Verification</h1>
    </div>
    <div style="padding: 30px;">
      <p style="font-size: 16px;">Hello,</p>
      <p style="font-size: 16px;">Thank you for registering with <strong>ReQuestor</strong> — your projector reservation system.</p>
      <p style="font-size: 16px;">To complete your registration and activate your account, please click the button below:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{verifyLink}" target="_blank" style="padding: 12px 24px; background-color: #800000; color: white; text-decoration: none; font-weight: bold; border-radius: 5px;">
          Verify My Account
        </a>
      </div>

      <p style="font-size: 14px; color: #555;">If you did not create an account with ReQuestor, please ignore this message.</p>
      <p style="font-size: 14px; color: #555;">This link will expire in 15 minutes for security purposes.</p>
      <p style="font-size: 14px;">Best regards,<br/>The ReQuestor Team</p>
    </div>
    <div style="background-color: #fafafa; padding: 15px; text-align: center; color: #999; font-size: 12px;">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to ReQuestor</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f2f2f2; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="background-color: #800000; padding: 20px; text-align: center;">
      <h1 style="color: #fff; margin: 0;">Welcome to ReQuestor</h1>
    </div>
    <div style="padding: 30px;">
      <p style="font-size: 16px;">Hello {name},</p>
      <p style="font-size: 16px;">Thank you for registering with <strong>ReQuestor</strong> — your projector reservation system.</p>
      <p style="font-size: 16px;">We are excited to have you on board!</p>
      <p style="font-size: 14px;">Best regards,<br/>The ReQuestor Team</p>
    </div>
    <div style="background-color: #fafafa; padding: 15px; text-align: center; color: #999; font-size: 12px;">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your ReQuestor Password</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f2f2f2; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="background-color: #800000; padding: 20px; text-align: center;">
      <h1 style="color: #fff; margin: 0;">ReQuestor Password Reset</h1>
    </div>
    <div style="padding: 30px;">
      <p style="font-size: 16px;">Hello,</p>
      <p style="font-size: 16px;">You have requested to reset your password for <strong>ReQuestor</strong> — your projector reservation system.</p>
      <p style="font-size: 16px;">To reset your password, please click the button below:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="{resetLink}" target="_blank" style="padding: 12px 24px; background-color: #800000; color: white; text-decoration: none; font-weight: bold; border-radius: 5px;">
          Reset My Password
        </a>
      </div>

      <p style="font-size: 14px; color: #555;">If you did not request a password reset, please ignore this message.</p>
      <p style="font-size: 14px; color: #555;">This link will expire in 15 minutes for security purposes.</p>
      <p style="font-size: 14px;">Best regards,<br/>The ReQuestor Team</p>
    </div>
    <div style="background-color: #fafafa; padding: 15px; text-align: center; color: #999; font-size: 12px;">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset Success</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f2f2f2; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="background-color: #800000; padding: 20px; text-align: center;">
      <h1 style="color: #fff; margin: 0;">Password Reset Success</h1>
    </div>
    <div style="padding: 30px;">
      <p style="font-size: 16px;">Hello,</p>
      <p style="font-size: 16px;">Your password has been successfully reset for <strong>ReQuestor</strong> — your projector reservation system.</p>
      <p style="font-size: 16px;">You can now log in with your new password.</p>
      <p style="font-size: 16px;">Best regards,<br/>The ReQuestor Team</p>
    </div>
    <div style="background-color: #fafafa; padding: 15px; text-align: center; color: #999; font-size: 12px;">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;

export const ADMIN_RESET_PASSWORD_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your ReQuestor Password</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f2f2f2; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="background-color: #800000; padding: 20px; text-align: center;">
      <h1 style="color: #fff; margin: 0;">ReQuestor Password Reset</h1>
    </div>
    <div style="padding: 30px;">
      <p style="font-size: 16px;">Hello,</p>
      <p style="font-size: 16px;">
        An administrator has reset your password for <strong>ReQuestor</strong> — your projector reservation system.
      </p>
      <p style="font-size: 16px;">
        Please use the temporary password below to log in. For your security, you’ll be asked to change this password upon your next login.
      </p>

      <div style="background-color: #fef2f2; border: 1px solid #fca5a5; padding: 15px; margin: 20px 0; border-radius: 5px; text-align: center;">
        <strong style="font-size: 18px; color: #b91c1c;">Temporary Password:</strong><br/>
        <code style="font-size: 20px; color: #dc2626;">{tempPassword}</code>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="{loginLink}" target="_blank" style="padding: 12px 24px; background-color: #800000; color: white; text-decoration: none; font-weight: bold; border-radius: 5px;">
          Log In to Your Account
        </a>
      </div>

      <p style="font-size: 14px; color: #555;">If you did not request this reset, please contact your system administrator immediately.</p>
      <p style="font-size: 14px;">Best regards,<br/>The ReQuestor Team</p>
    </div>
    <div style="background-color: #fafafa; padding: 15px; text-align: center; color: #999; font-size: 12px;">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;

