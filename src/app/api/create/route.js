import { NextResponse } from "next/server";
import User from "../../../models/User";
import dbConnection from "../../../utils/db";

export const POST = async (request) => {
  const { title, desc, time, date, key } = await request.json();
  console.log(title, desc, time, date, key);
  if (title && desc && time && date && key) {
    try {
      await dbConnection();
      let user = await User.findOne({ key: key });
      if (user) {
        const newListItem = {
          title: title,
          content: desc,
        };
        user.lists.push(newListItem);
        await user.save();
      }
    } catch (err) {
      console.log(err);
      return new NextResponse("Error", { status: 500 });
    }
  }
  return new NextResponse("sucess", { status: 200 });
};
