import nodemailer from 'nodemailer';
import { User } from '@/models/dataSchema';
import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';

interface SendEmailProps {
  email: string;
  emailType: string;
  userId: string;
  buyerDetails?: any;
  sellerDetails?: any;
}

export const sendEmail = async ({ email, emailType, userId, buyerDetails, sellerDetails }: SendEmailProps) => {
  try {
    // const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // if (emailType === "VERIFY") {
    //   await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 });
    // } else if (emailType === "RESET") {
    //   await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 });
    // }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD
      }
    });

    let subject = '';
    let htmlContent = '';

    // if (emailType === "VERIFY") {
    //   subject = "Verify your email";
    //   htmlContent = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to verify your Email
    //     or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
    //     </p>`;
    // } else if (emailType === "RESET") {
    //   subject = "Reset your password";
    //   htmlContent = `<p>Click <a href="${process.env.DOMAIN}/passwordreset?token=${hashedToken}">here</a> to reset your Password
    //     or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/passwordreset?token=${hashedToken}
    //     </p>`;
    // } else if (emailType === "INTEREST") {}
    subject = "Buyer Interested in Your Property";
    htmlContent = `<p>A buyer has expressed interest in your property.</p>
      <h3>Buyer Details:</h3>
      <p>Name: ${buyerDetails.name}</p>
      <p>Email: ${buyerDetails.email}</p>
      <p>Phone: ${buyerDetails.phone}</p>`;

    const sellerMailOptions = {
      from: 'authrentify@gmail.com',
      to: sellerDetails.email,
      subject: subject,
      html: htmlContent
    };

    subject = "Buyer Interested in Your Property";
    htmlContent = `<p>Details of the property owner, you have shown interest.</p>
      <h3>Seller Details:</h3>
      <p>Name: ${sellerDetails.name}</p>
      <p>Email: ${sellerDetails.email}</p>
      <p>Phone: ${sellerDetails.phone}</p>`;

    const buyerMailOptions = {
      from: 'authrentify@gmail.com',
      to: buyerDetails.email,
      subject: subject,
      html: htmlContent
    };

    await transporter.sendMail(sellerMailOptions);
    await transporter.sendMail(buyerMailOptions);
    
    return NextResponse.json({message: "Mail sent to seller and buyer."}, {status: 200});

  } catch (error: any) {
    throw new Error(error.message);
  }
};
