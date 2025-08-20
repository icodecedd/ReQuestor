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
      <h1 style="color: #fff; margin: 0; font-size: 24px;">Welcome to ReQuestor</h1>
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
      <h1 style="color: #fff; margin: 0; font-size: 24px;">ReQuestor Password Reset</h1>
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
      <h1 style="color: #fff; margin: 0; font-size: 24px;">Password Reset Success</h1>
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
      <h1 style="color: #fff; margin: 0; font-size: 24px;">ReQuestor Password Reset</h1>
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

export const ADMIN_NOTIFICATION_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admin Notification - New Equipment Request</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f2f2f2; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="background-color: #800000; padding: 20px; text-align: center;">
      <h1 style="color: #fff; margin: 0; font-size: 24px;">New Equipment Request</h1>
    </div>
    <div style="padding: 30px;">
      <p style="font-size: 16px;">Hello Admin,</p>
      <p style="font-size: 16px;">A new equipment request has been submitted in the <strong>ReQuestor</strong> system and requires your review.</p>

      <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #800000; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #333;">Request Details:</h3>
        <p style="margin: 8px 0;"><strong>Request ID:</strong> {requestId}</p>
        <p style="margin: 8px 0;"><strong>Submitted by:</strong> {userName} ({userEmail})</p>
        <p style="margin: 8px 0;"><strong>Course & Section:</strong> {courseSection}</p>
        <p style="margin: 8px 0;"><strong>Faculty In-Charge:</strong> {faculty}</p>
        <p style="margin: 8px 0;"><strong>Equipment:</strong> {equipmentList}</p>
        <p style="margin: 8px 0;"><strong>Request Date:</strong> {requestDate}</p>
        <p style="margin: 8px 0;"><strong>Time Slot:</strong> {startTime} to {endTime}</p>
        <p style="margin: 8px 0;"><strong>Purpose:</strong> {purpose}</p>
        <p style="margin: 8px 0;"><strong>Status:</strong> <span style="color: #e67e22; font-weight: bold;">Pending Approval</span></p>
        <p style="margin: 8px 0;"><strong>Submitted on:</strong> {SubmittedOn}</p>
      </div>

      <p style="font-size: 16px;">You can view all pending requests in the ReQuestor admin dashboard.</p>

      <div style="text-align: center; margin: 25px 0;">
        <a href="{dashboardLink}" style="background-color: #800000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">Go to Dashboard</a>
      </div>

      <p style="font-size: 14px;">Best regards,<br/>The ReQuestor Team</p>
    </div>
    <div style="background-color: #fafafa; padding: 15px; text-align: center; color: #999; font-size: 12px;">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;

export const APPROVED_REQUEST_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Equipment Request Approved</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f2f2f2; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="background-color: #006400; padding: 20px; text-align: center;">
      <h1 style="color: #fff; margin: 0; font-size: 24px;">Equipment Request Approved!</h1>
    </div>
    <div style="padding: 30px;">
      <p style="font-size: 16px;">Hello {name},</p>
      <p style="font-size: 16px;">Great news! Your equipment request has been <strong>approved</strong> in the <strong>ReQuestor</strong> system.</p>

      <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #006400; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #333;">Request Details:</h3>
        <p style="margin: 8px 0;"><strong>Request ID:</strong> {requestId}</p>
        <p style="margin: 8px 0;"><strong>Equipment:</strong> {equipmentList}</p>
        <p style="margin: 8px 0;"><strong>Request Date:</strong> {requestDate}</p>
        <p style="margin: 8px 0;"><strong>Start Time:</strong> {startTime}</p>
        <p style="margin: 8px 0;"><strong>End Time:</strong> {endTime}</p>
        <p style="margin: 8px 0;"><strong>Purpose:</strong> {purpose}</p>
        <p style="margin: 8px 0;"><strong>Status:</strong> <span style="color: #006400; font-weight: bold;">Approved</span></p>
      </div>

      <p style="font-size: 16px;">Please make sure to:</p>
      <ul style="font-size: 16px;">
        <li>Arrive on time for your scheduled equipment pickup</li>
        <li>Bring your student ID for verification</li>
        <li>Return the equipment promptly at the end of your reservation</li>
      </ul>

      <div style="text-align: center; margin: 25px 0;">
        <a href="{dashboardLink}" style="background-color: #006400; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">View Request Details</a>
      </div>

      <p style="font-size: 14px;">Best regards,<br/>The ReQuestor Team</p>
    </div>
    <div style="background-color: #fafafa; padding: 15px; text-align: center; color: #999; font-size: 12px;">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;

export const REJECTED_REQUEST_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Equipment Request Declined</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f2f2f2; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="background-color: #8B0000; padding: 20px; text-align: center;">
      <h1 style="color: #fff; margin: 0; font-size: 24px;">Equipment Request Declined</h1>
    </div>
    <div style="padding: 30px;">
      <p style="font-size: 16px;">Hello {name},</p>
      <p style="font-size: 16px;">We regret to inform you that your equipment request has been <strong>declined</strong> in the <strong>ReQuestor</strong> system.</p>

      <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #8B0000; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #333;">Request Details:</h3>
        <p style="margin: 8px 0;"><strong>Request ID:</strong> {requestId}</p>
        <p style="margin: 8px 0;"><strong>Equipment:</strong> {equipmentList}</p>
        <p style="margin: 8px 0;"><strong>Request Date:</strong> {requestDate}</p>
        <p style="margin: 8px 0;"><strong>Start Time:</strong> {startTime}</p>
        <p style="margin: 8px 0;"><strong>End Time:</strong> {endTime}</p>
        <p style="margin: 8px 0;"><strong>Purpose:</strong> {purpose}</p>
        <p style="margin: 8px 0;"><strong>Status:</strong> <span style="color: #8B0000; font-weight: bold;">Declined</span></p>
      </div>

      <div style="background-color: #FFF5F5; padding: 15px; border-radius: 6px; margin: 20px 0; border: 1px solid #FFCCCB;">
        <h3 style="color: #8B0000; margin-top: 0;">Reason for Declination:</h3>
        <ul style="padding-left: 20px;">
          <li>The requested equipment is already reserved for the specified time period</li>
          <li>Insufficient lead time for equipment preparation</li>
          <li>Your account has outstanding equipment from previous requests</li>
        </ul>
      </div>

      <p style="font-size: 16px;">We encourage you to:</p>
      <ul style="font-size: 16px; padding-left: 20px; margin-bottom: 20px;">
        <li style="margin-bottom: 8px;">Submit a new request for alternative equipment</li>
        <li style="margin-bottom: 8px;">Choose different dates for your equipment reservation</li>
        <li>Contact equipment services if you have questions about this decision</li>
      </ul>

      <div style="text-align: center; margin: 25px 0;">
        <a href="{dashboardLink}" style="background-color: #8B0000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">Submit New Request</a>
      </div>

      <p style="font-size: 16px;">If you believe this decision was made in error, please contact Equipment Services for assistance.</p>

      <p style="font-size: 14px;">Best regards,<br/>The ReQuestor Team</p>
    </div>
    <div style="background-color: #fafafa; padding: 15px; text-align: center; color: #999; font-size: 12px;">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;

export const CANCELLED_REQUEST_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Equipment Request Cancelled</title>
</head>
<body style="font-family: 'Segoe UI', sans-serif; background-color: #f2f2f2; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 30px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    <div style="background-color: #8B0000; padding: 20px; text-align: center;">
      <h1 style="color: #fff; margin: 0; font-size: 24px;">Equipment Request Cancelled</h1>
    </div>
    <div style="padding: 30px;">
      <p style="font-size: 16px;">Hello {name},</p>
      <p style="font-size: 16px;">Your equipment request has been successfully <strong>cancelled</strong> in the <strong>ReQuestor</strong> system.</p>

      <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #8B0000; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #333;">Cancelled Request Details:</h3>
        <p style="margin: 8px 0;"><strong>Request ID:</strong> {requestId}</p>
        <p style="margin: 8px 0;"><strong>Equipment:</strong> {equipmentList}</p>
        <p style="margin: 8px 0;"><strong>Request Date:</strong> {requestDate}</p>
        <p style="margin: 8px 0;"><strong>Start Time:</strong> {startTime}</p>
        <p style="margin: 8px 0;"><strong>End Time:</strong> {endTime}</p>
        <p style="margin: 8px 0;"><strong>Purpose:</strong> {purpose}</p>
        <p style="margin: 8px 0;"><strong>Status:</strong> <span style="color: #8B0000; font-weight: bold;">Cancelled</span></p>
      </div>

      <p style="font-size: 16px;">The equipment has been released back into the available inventory and can now be requested by other users.</p>

      <div style="text-align: center; margin: 25px 0;">
        <a href="{dashboardLink}" style="background-color: #8B0000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold; margin: 0 10px;">View Dashboard</a>
        <a href="{newRequestLink}" style="background-color: #6c757d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold; margin: 0 10px;">Submit New Request</a>
      </div>

      <p style="font-size: 14px;">Best regards,<br/>The ReQuestor Team</p>
    </div>
    <div style="background-color: #fafafa; padding: 15px; text-align: center; color: #999; font-size: 12px;">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;
