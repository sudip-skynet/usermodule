import nodemailer from 'nodemailer';
import crypto from 'crypto';
import User from '@/models/userModel';
import { Connect } from "@/database/dbConfige";

interface SendEmailParams {
  email: string;
  emailType: 'VERIFY' | 'RESET';
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailParams) => {
  try {
    await Connect();

    // Generate a secure random token
    const rawToken = crypto.randomBytes(32).toString('hex');

    let emailBody = '';

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: rawToken,
          verifyTokenExpiry: Date.now() + 3600000, // 1 hour
        },
      });

      emailBody = `
        <p>Click the link below to verify your email:</p>
        <a href="${process.env.DOMAIN}/userverify?token=${rawToken}">Verify Email</a>
      `;
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: rawToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
        },
      });

      emailBody = `
        <p>Click the link below to reset your password:</p>
        <a href="${process.env.DOMAIN}/resetpassword?token=${rawToken}">Reset Password</a>
      `;
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // use true for port 465
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: emailBody,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;

  } catch (error: any) {
    console.error('❌ Email sending failed:', error.message);
    throw new Error(error.message);
  }
};