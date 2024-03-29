import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";
import { pusherServer } from "@/libs/pusher";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { message, image, conversationId } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const newMessage = await prisma.message.create({
      include: {
        seen: true,
        sender: true,
      },
      data: {
        body: message,
        image: image,
        conversation: {
          connect: { id: conversationId },
        },
        sender: {
          connect: { id: currentUser.id },
        },
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true,
          },
        },
      },
    });

    await pusherServer.trigger(conversationId, "messages:new", newMessage);

    const lastMessage = updatedConversation.messages.at(
      updatedConversation.messages.length - 1
    );

    updatedConversation.users.forEach((user) => {
      pusherServer.trigger(user.email!, "conversation:update", {
        id: conversationId,
        messages: [lastMessage],
      });
    });
    return NextResponse.json(newMessage);
  } catch (error) {
    console.log(error, "ERROR_MESSAGES_POST");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const deleteMessages = await prisma.message.deleteMany({
      where: {
        id: {
          in: body,
        },
      },
    });

    return NextResponse.json(deleteMessages);
  } catch (error) {
    console.log(error, "ERROR_MESSAGES_DELETE_MANY");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
