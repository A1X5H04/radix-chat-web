import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

interface IParams {
  messageId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const { messageId } = params;

    const messageIsStarred = await prisma.message.findUnique({
      where: {
        id: messageId,
      },
      select: {
        isStarred: true,
      },
    });

    console.log(messageIsStarred);

    if (messageIsStarred?.isStarred) {
      const updatedMessage = await prisma.message.update({
        where: {
          id: messageId,
        },
        data: {
          isStarred: false,
        },
      });

      return NextResponse.json(updatedMessage);
    } else {
      const updatedMessage = await prisma.message.update({
        where: {
          id: messageId,
        },
        data: {
          isStarred: true,
        },
      });
      return NextResponse.json(updatedMessage);
    }
  } catch (error) {
    console.error(error, "ERROR_MESSAGES_PUT");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
