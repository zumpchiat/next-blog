import connect from "@/lib/db";
import Category from "@/lib/modals/category";
import User from "@/lib/modals/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userid = searchParams.get("userId");

    if (!userid || !Types.ObjectId.isValid(userid)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missig userid" }),
        { status: 400 }
      );
    }

    await connect();
    const user = await User.findById(userid);
    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "User not found in the database" }),
        {
          status: 400,
        }
      );
    }

    const categories = await Category.find({
      user: new Types.ObjectId(userid),
    });
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching" + error.message, {
      status: 500,
    });
  }
};

export const POST = async (request: Response) => {
  try {
    const { searchParams } = new URL(request.url);
    const userid = searchParams.get("userId");
    const { title } = await request.json();

    if (!userid || !Types.ObjectId.isValid(userid)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or mising userid" }),
        { status: 400 }
      );
    }

    await connect();
    const user = await User.findById(userid);

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or mising userid" }),
        { status: 404 }
      );
    }
    const newCategory = new Category({
      title,
      user: new Types.ObjectId(userid),
    });
    await newCategory.save();

    return new NextResponse(
      JSON.stringify({ message: "Category is created", Category: newCategory }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in fetching" + error.message, {
      status: 500,
    });
  }
};
