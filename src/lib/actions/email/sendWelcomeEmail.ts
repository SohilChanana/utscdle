import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("Missing SENDGRID_API_KEY");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (userEmail: string, username: string) => {
  const msg = {
    to: userEmail, // Recipient's email address
    from: "utscdle@gmail.com", // Sender's email address
    subject: "Welcome to UTSCdle!",
    html: `<p>Hi ${username},</p>
    <p>Thank you for signing up for UTSCDLE! We're excited to have you on board.</p>
    <p>Please click the link below to start playing UTSCdle:</p>
    <p><a href="https://www.utscdle.org">Let's Go</a></p>
    <p>If you didn&apos;t create this account, please ignore this email.</p>
    <p>Best regards,<br>The UTSCDLE Team</p>
    <p>&copy; 2024 UTSCDLE. All rights reserved.</p>
  `,
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log("Welcome email sent successfully:", response);
    })
    .catch((error) => {
      console.error("Error sending welcome email:", error);
      if (error.response) {
        console.error("SendGrid error response:", error.response.body);
      }
    });
};

export { sendWelcomeEmail };
