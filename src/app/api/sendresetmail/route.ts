import { connect } from "@/db/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import { User } from "@/models/dataSchema";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    
    const { email } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    await sendEmail({
      email: email,
      emailType: "RESET",
      userId: user._id,
      buyerDetails: "",
      sellerDetails: "",
    });

    const response = NextResponse.json({ message: "Reset mail sent.", success: true });
    response.cookies.set("token", user.forgotPasswordToken, { httpOnly: true });

    return response;
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
