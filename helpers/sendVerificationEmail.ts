import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import VerificationEmail from "@/emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import type { SentMessageInfo } from "nodemailer";

export const sendVerificationEmail = async ({
  receiverEmail,
  username,
  code,
}: {
  receiverEmail: string;
  username: string;
  code: string;
}): Promise<ApiResponse> => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const html = render(VerificationEmail({ username, otp: code }));

    const mailOptions: Object = {
      from: process.env.SENDER_MAIL || "",
      to: receiverEmail,
      subject: "Connected with Food Apps",
      html,
    };

    const info: SentMessageInfo = await transporter.sendMail(mailOptions);
    console.log("Message sent:", info.messageId);

    return { success: true, message: "Email sent" };
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Sending email failed:", err);

    return {
      success: false,
      message: err.message,
    };
  }
};

export default sendVerificationEmail;
