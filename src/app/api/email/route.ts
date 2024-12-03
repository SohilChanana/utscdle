import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { uploadImage } from "@/lib/actions/images/uploadImage";
import { imageSchema } from "@/lib/models/zod";

const sendGridApiKey = process.env.SENDGRID_API_KEY;
if (!sendGridApiKey) {
  throw new Error("SENDGRID_API_KEY is not defined in .env.local");
}
sgMail.setApiKey(sendGridApiKey);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image") as File;
    const markerPosition = JSON.parse(formData.get("markerPosition") as string);

    imageSchema.parse({ image: imageFile });

    uploadImage({ file: imageFile, mimeType: imageFile.type, coordinates: markerPosition, dailyEligible: false });

    const toEmail = "utscdle@gmail.com"; // Recipient
    const userEmail = "utscdle@gmail.com"; // Sender

    if (!imageFile || !markerPosition) {
      return NextResponse.json(
        { success: false, message: "Image and marker position are required." },
        { status: 400 }
      );
    }

    // Convert the image to base64 (to attach it to email)
    const base64Image = await imageFile.arrayBuffer();
    const buffer = Buffer.from(base64Image).toString("base64");

    const emailData = {
      to: toEmail,
      from: userEmail,
      subject: "New Image Submission",
      text: `Marker Position: Latitude: ${markerPosition.lat}, Longitude: ${markerPosition.lng}`,
      attachments: [
        {
          content: buffer,
          filename: imageFile.name,
          type: imageFile.type,
          disposition: "attachment",
        },
      ],
    };

    await sgMail.send(emailData);

    return NextResponse.json(
      { success: true, message: "Image submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting image:", error);
    return NextResponse.json(
      { success: false, message: "Error submitting the image." },
      { status: 500 }
    );
  }
}
