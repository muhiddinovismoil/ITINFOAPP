import nodemailer from "nodemailer";
import { config } from "dotenv";
config();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "muhiddinovismoil2@gmail.com",
        pass: process.env.APP_PASSWORD,
    },
});
const mailOptions = {
    from: "muhiddinovismoil2@gmail.com",
    to: "muhiddinovi45@gmail.com",
    subject: "oxshadiku jgar",
    text: "oxshadimi ozi rostanam",
};
export const sendMail = (to, subject, text) => {
    transporter.sendMail(
        {
            from: "muhiddinovismoil2@gmail.com",
            to,
            subject,
            text,
        },
        function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        }
    );
};
