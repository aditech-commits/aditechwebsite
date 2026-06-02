import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, service, brief } = await req.json();

    if (!name || !email || !brief) {
      return NextResponse.json(
        { error: "Name, email, and brief are required." },
        { status: 400 }
      );
    }

    // Configure the SMTP transporter.
    // The user should set GMAIL_USER and GMAIL_APP_PASSWORD as environment variables in Vercel.
    const smtpUser = process.env.GMAIL_USER || "aditechglobalservice@gmail.com";
    const smtpPass = process.env.GMAIL_APP_PASSWORD;

    if (!smtpPass) {
      console.warn("GMAIL_APP_PASSWORD is not set in env. Email cannot be sent.");
      return NextResponse.json(
        { error: "Server email credentials are not configured. Please set GMAIL_APP_PASSWORD in environment variables." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"${name}" <${smtpUser}>`, // Must be the authenticated gmail account or alias
      to: "aditechglobalservice@gmail.com",
      replyTo: email, // When replying to this email, it will go to the user
      subject: `New Project Inquiry from ${name} - Aditech Portal`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; max-width: 600px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #4f46e5; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px; margin-bottom: 20px;">New Aditech Project Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #4b5563;">Name/Identity:</td>
              <td style="padding: 8px 0; color: #111827;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Email Address:</td>
              <td style="padding: 8px 0; color: #111827;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Service Segment:</td>
              <td style="padding: 8px 0; color: #111827;"><span style="background-color: #e0e7ff; color: #4338ca; padding: 2px 8px; border-radius: 4px; font-size: 0.85em; font-weight: bold;">${service}</span></td>
            </tr>
          </table>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; border: 1px solid #f3f4f6;">
            <p style="margin-top: 0; font-weight: bold; color: #4b5563;">Project Brief / Message:</p>
            <p style="margin-bottom: 0; color: #1f2937; white-space: pre-wrap;">${brief}</p>
          </div>
          <p style="font-size: 0.8em; color: #9ca3af; margin-top: 30px; border-top: 1px solid #f3f4f6; padding-top: 10px;">
            This email was sent dynamically from the Aditech Portal contact form.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Nodemailer error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
