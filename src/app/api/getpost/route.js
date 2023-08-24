import { NextResponse } from "next/server";
import User from "../../../models/User";
import dbConnection from "../../../utils/db";

export const GET = async (request) => {
  const url = new URL(request.url);
  const userKey = url.searchParams.get("userKey");

  if (!userKey) {
    return new NextResponse("No userKey", { status: 400 });
  }
  await dbConnection();
  let user = await User.findOne({ key: userKey });
  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  let data = user.lists;
  return new NextResponse(JSON.stringify(data), { status: 200 });
};
