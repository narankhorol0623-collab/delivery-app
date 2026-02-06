import { configDotenv } from "dotenv";
import { Resend } from "resend";

configDotenv();

const { APP_USER_MAIL } = process.env;

const resend = new Resend(process.env.RESEND_API_KEY);

export const verifyUserEmail = async (receiver: string, verifyLink: string) => {
  await resend.emails.send({
    from: `onboarding@resend.dev`,
    to: receiver,
    subject: "Verify user link.",
    html: `
        <div style="width: 300px; padding: 20px; border-radius: 20px; background-color: blanchedalmond; text-align: center;">
          <a href="${verifyLink}" target="_blank" style="font-weight: bold; font-size: 20px; color: #ec4899; text-decoration: none; 
      }">
            Verify your Email!
          </a>
        </div>`,
  });
};
