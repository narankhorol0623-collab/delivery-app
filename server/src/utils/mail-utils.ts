import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";

configDotenv();

const { APP_USER_MAIL, APP_PASSWORD } = process.env;

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: APP_USER_MAIL,
    pass: APP_PASSWORD,
  },
});

export const verifyUserEmail = async (receiver: string, verifyLink: string) => {
  try {
    await transport.sendMail({
      from: `"Food Delivery" <${APP_USER_MAIL}>`,
      to: receiver,
      subject: "Verify user link.",
      html: `
        <div style="width: 300px; padding: 20px; border-radius: 20px; background-color: blanchedalmond; text-align: center;">
          <a href="${verifyLink}" target="_blank" style="font-weight: bold; font-size: 20px; color: #ec4899; text-decoration: none;">
            Verify your Email!
          </a>
        </div>`,
    });
  } catch (error) {
    console.error("Email send failed:", error);
  }
};
