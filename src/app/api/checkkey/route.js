import { NextResponse } from "next/server";
import dbConnection from "../../../utils/db";
import User from "../../../models/User";
import { json } from "stream/consumers";

export const POST = async (request) => {
  const { name, key } = await request.json();
  console.log(name, key);
  try {
    dbConnection();
    let userValid = await User.findOne({
      $and: [{ name: name }, { key: key }],
    });
    if (userValid) {
      console.log(userValid);
      return new NextResponse(JSON.stringify(key), { status: 200 });
    } else {
      console.log("User Not Found mai chala");
      const responseJSON = {
        message: "User Not Found",
      };
      return new NextResponse(JSON.stringify(responseJSON), { status: 403 });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Error", { status: 500 });
  }
};
