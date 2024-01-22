import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { pusherServer } from "@/libs/pusher";
interface IParams {
  messageId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { messageId } = params;

    const deletedMessage = await prisma.message.delete({
      where: {
        id: messageId,
      },
    });

    return NextResponse.json(deletedMessage);
  } catch (error) {
    console.error(error, "ERROR_MESSAGES_DELETE");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  try {
    const { messageId } = params;
    const { message, conversationId } = await request.json();

    const updatedMessage = await prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        body: message,
        isEdited: true,
      },
    });

    console.log(updatedMessage);

    await pusherServer.trigger(
      conversationId,
      "message:update",
      updatedMessage
    );

    return NextResponse.json(updatedMessage);
  } catch (error) {
    console.error(error, "ERROR_MESSAGES_PUT");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
