import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
// import jwt from "jsonwebtoken";

configDotenv();

const { APP_USER_MAIL, APP_PASSWORD } = process.env;

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: APP_USER_MAIL,
    pass: APP_PASSWORD,
  },
});
export const verifyUserEmail = async (reciver: string, verifyLink: string) => {
  await transport.sendMail({
    from: `"food delivery" ${APP_USER_MAIL}`,
    to: reciver,
    subject: "Verify user link.",
    html: `<div style="width: 300px; height: 200px; border-radius: 20px; background-color: blanchedalmond; display: flex; justify-content: center; align-items: center;">
                <a href="${verifyLink}" target="_blank" class="font-bold text-xl text-pink-500">Verify your Email!</a>
            </div>`,
  });
};
