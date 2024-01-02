import { FullMessageType } from "@/types";
import { Avatar, Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { RxImage, RxPerson } from "react-icons/rx";
import { animated, useSpring } from "@react-spring/web";
import { tss } from "tss-react";
import { RiCheckDoubleFill, RiCheckFill } from "react-icons/ri";
import Image from "next/image";

interface MessageTileProps {
  message: FullMessageType;
  isInGroupChat: boolean | null;
  isLastInMessageGroup?: boolean;
}

const messageTileStyles = tss
  .withParams<{ isMe: boolean }>()
  .create(({ isMe }) => ({
    messageTile: {
      textAlign: isMe ? "right" : "left",
      marginBlock: "var(--space-1)",
    },

    messageContainer: {
      width: "75%",
      marginInline: "var(--space-2)",
    },

    messageBubble: {
      maxWidth: "max-content",
      position: "relative",
      backgroundColor: isMe ? "var(--accent-9)" : "var(--accent-3)",
      color: isMe ? "var(--accent-9-contrast)" : "inherit",
      borderRadius: "var(--radius-5)",
      padding: "0.25rem 0.75rem",
    },

    messageText: {
      margin: 0,
      wordBreak: "break-word",
      whiteSpace: "pre-wrap",
      display: "block",
      textAlign: "left",
      unicodeBidi: "plaintext",
      color: "inherit",
      fontSize: "var(--font-size-2)",
      fontWeight: 500,
      lineHeight: "var(--line-height-2)",
    },

    messageImageBubble: {
      width: "300px",
      height: "250px",
      backgroundColor: isMe ? "var(--accent-9)" : "var(--accent-5)",
      padding: "var(--space-1)",
      borderRadius: "var(--radius-5)",
    },

    messageImage: {
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      borderRadius: "var(--radius-4)",
      "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },

    messageImageStatus: {
      position: "absolute",
      bottom: "var(--space-1)",
      right: "var(--space-1)",
      display: "flex",
      alignItems: "center",
      color: "var(--color-text)",
      fontSize: "calc(0.65rem * var(--scaling))",
      fontWeight: 400,
      margin: 0,
      backgroundColor: "var(--color-background)",
      padding: "2px 4px",
      borderRadius: "var(--radius-5)",
      marginInline: "2px",
      gap: "2px",
    },

    messageDate: {
      alignSelf: "flex-end",
      whiteSpace: "nowrap",
      color: "inherit",
      fontSize: "calc(0.65rem * var(--scaling))",
      marginLeft: "20px",
      fontWeight: 400,
      margin: 0,
    },

    messageMeta: {
      height: "100%",
      display: "inline-flex",
      alignItems: "end",
      float: "right",
      margin: "0.5rem -0.25rem 0 0.6375rem ",
      bottom: "auto",
      right: "auto",
      gap: "2px",
    },

    messageSeenIndicator: {
      color: "inherit",
      marginBottom: "-3.5px",
      fontSize: "calc(0.85rem * var(--scaling))",
    },
  }));

function MessageTile({
  message,
  isLastInMessageGroup,
  isInGroupChat,
}: MessageTileProps) {
  const session = useSession();
  const isMe = session?.data?.user?.email === message?.sender?.email;

  const seenList = (message.seen || [])
    .filter((user) => user.email !== message?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const hasSeen =
    (message.seen || []).filter((user) => user.email !== message?.sender?.email)
      .length !== 0;

  const lastMessageSeen = isLastInMessageGroup && hasSeen;

  const formattedDate = new Date(message.createdAt).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }
  );

  const { classes } = messageTileStyles({ isMe });
  return (
    <Flex className={classes.messageTile} justify={isMe ? "end" : "start"}>
      {isInGroupChat && <Avatar fallback="A" />}
      <Flex
        justify={isMe ? "end" : "start"}
        className={classes.messageContainer}
      >
        {message.body ? (
          <animated.div className={classes.messageBubble}>
            <div className={classes.messageText}>
              {message.body}
              <div className={classes.messageMeta}>
                <Text
                  title={message.createdAt.toLocaleString()}
                  className={classes.messageDate}
                >
                  {formattedDate}
                </Text>
                {isMe && (
                  <p className={classes.messageSeenIndicator}>
                    {hasSeen ? <RiCheckDoubleFill /> : <RiCheckFill />}
                  </p>
                )}
              </div>
            </div>
          </animated.div>
        ) : (
          <animated.div className={classes.messageImageBubble}>
            <div className={classes.messageImage}>
              <Image
                src={message.image || "/images/placeholder.png"}
                layout="fill"
                objectFit="cover"
                alt="Message Image"
              />
              <div className={classes.messageImageStatus}>
                <Text
                  title={message.createdAt.toLocaleString()}
                  className={classes.messageDate}
                >
                  {formattedDate}
                </Text>
                {isMe && (
                  <p className={classes.messageSeenIndicator}>
                    {hasSeen ? <RiCheckDoubleFill /> : <RiCheckFill />}
                  </p>
                )}
              </div>
            </div>
          </animated.div>
        )}
      </Flex>
    </Flex>
  );
}

export default MessageTile;
