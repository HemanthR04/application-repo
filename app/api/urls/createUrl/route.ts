import { connectToDB } from "@/dbConfig/dbConfig";
import URL from "@/models/url.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  connectToDB();
  try {
    const reqBody = await request.json();
    const { type, link, clientApps, application, environment } = reqBody;

  

    //check if app already exists
    const urlLink = await URL.findOne({ link });

    if (urlLink) {
      return NextResponse.json(
        { error: "URL already exists" },
        { status: 400 }
      );
    }

    const newURL = new URL({
      type : type.toLowerCase(),
      link : link.toLowerCase(),
      clientApps,
      application,
      environment,
    });

    const saveURL = await newURL.save();
    

    return NextResponse.json({
      message: "URL created successfully",
      success: true,
      saveURL,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
