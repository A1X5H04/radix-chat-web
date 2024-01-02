import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { name, image } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        image,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error, "ERROR_POST_PROFILE");
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
