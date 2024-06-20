import { NextResponse } from "next/server"

export async function GET(){
    try {
        const response = NextResponse.json({message: "Logout Successfull", success: true}) 

        response.cookies.set("token", "", {httpOnly: true})
        console.log(response);
        return response;
        
    } catch (error: any) {
        return NextResponse.json({message: error.message},{status: 500})
    }
}