import { NextResponse } from "next/server";
import { sendWelcomeEmail } from "../../../lib/actions/email/sendWelcomeEmail"; // Ensure the path is correct

export async function POST(request: Request) {
  try {
    const { username, userEmail } = await request.json();

    if (!userEmail || !username) {
      return NextResponse.json(
        { success: false, message: "User email and user name are required." },
        { status: 400 }
      );
    }

    // Call the function to send the email
    await sendWelcomeEmail(userEmail, username);

    return NextResponse.json(
      { success: true, message: "Welcome email sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while sending the welcome email." },
      { status: 500 }
    );
  }
}
