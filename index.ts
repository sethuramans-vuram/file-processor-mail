import fs from 'fs';
import path from 'path';
import util from 'util';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.FP_MAIL_SMTP,
    port: 465,
    secure: true,
    auth: {
        user: process.env.FP_MAIL_USER,
        pass: process.env.FP_MAIL_PASS
    }
});

const sendMail = async ({ filepath }) => {
    let info = await transporter.sendMail({
        from: '"Bala Kumaran" <balakumarank@vuram.com>',
        to: "sethuramans@vuram.com",
        subject: "Nodejs Test Mail" + new Date().getTime(),
        text: "Hello World",
        html: "<b>Hello World</b>",
        attachments: [
            {
                path: filepath
            }
        ] 
    });

    console.log({info});
};

const files = await util.promisify(fs.readdir)(path.join(__dirname, "files"));
for (let file of files) {
    await sendMail({ filepath: path.join("files", file) });
}

