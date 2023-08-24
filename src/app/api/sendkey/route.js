import { NextResponse } from "next/server";
import sendMail from "./sendMail";
import crypto from "crypto";
import dbConnection from "../../../utils/db";
import User from "../../../models/User";

export const POST = async (request) => {
  const { name, email } = await request.json();
  console.log(name, email);
  try {
    await dbConnection();
    let isUserExist = await User.findOne({ email: email });
    if (isUserExist) {
      console.log("User already exists");
      return new NextResponse("User already exist", { status: 409 });
    }
    let key = crypto.randomBytes(8).toString("hex").slice(0, 8);
    sendMail(name, email, key);
    let newUser = User({
      name: name,
      email: email,
      key: key,
    });
    await newUser.save();

    return new NextResponse("Success", { status: 200 });
  } catch (err) {
    return new NextResponse("Error", { status: 500 });
  }
};
