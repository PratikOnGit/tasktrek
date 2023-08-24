import { NextResponse } from "next/server";
import dbConnection from "../../../utils/db";
import User from "../../../models/User";

export const DELETE = async (request) => {
  const { key, objID } = await request.json();
  console.log(key, objID);
  if (!objID || !key) {
    return new NextResponse("No such key", { status: 403 });
  }
  await dbConnection();
  User.findOneAndUpdate(
    { key: key },
    { $pull: { lists: { _id: objID } } },
    { new: true }
  )
    .then((updatedUser) => {
      if (updatedUser) {
        console.log("List item removed:", updatedUser);
      } else {
        console.log("User not found");
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
  return new NextResponse("Successfully deleted", { status: 200 });
};
