import { FullMessageType } from "@/types";
import {
  Avatar,
  Checkbox,
  ContextMenu,
  AlertDialog,
  Button,
  Flex,
  Text,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { animated } from "@react-spring/web";
import { tss } from "tss-react";
import { RiCheckDoubleFill, RiCheckFill } from "react-icons/ri";
import React from "react";
import { PiStarFill } from "react-icons/pi";
import ImageViewer from "@/components/ImageViewer";
import MessageContextMenu from "@/components/MessageContextMenu";

interface MessageTileProps {
  message: FullMessageType;
  isInGroupChat: boolean | null;
  isLastInMessageGroup?: boolean;
  selectMode: boolean;
  setEditMessage: (value: any) => void;
  // setSelectedMessages: (value: any) => void;
}

const messageTileStyles = tss
  .withParams<{ isMe: boolean }>()
  .create(({ isMe }) => ({
    messageTile: {
      textAlign: isMe ? "right" : "left",
      paddingBlock: "var(--space-1)",
      paddingInline: "var(--space-2)",
    },

    messageContainer: {
      width: "75%",
      marginInline: "var(--space-2)",
      userSelect: "none",
    },

    messageBubble: {
      maxWidth: "max-content",
      position: "relative",
      backgroundColor: isMe ? "var(--accent-9)" : "var(--accent-3)",
      color: isMe ? "var(--accent-9-contrast)" : "inherit",
      borderRadius: "var(--radius-5)",
      padding: "0.25rem 0.50rem",
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
      maxWidth: "350px",
      maxHeight: "200px",
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
        cursor: "pointer",
      },
    },

    messageImageStatus: {
      position: "absolute",
      bottom: "var(--space-1)",
      right: "var(--space-1)",
      display: "inline-flex",
      alignItems: "center",
      color: "var(--color-text)",
      fontSize: "calc(0.65rem * var(--scaling))",
      fontWeight: 400,
      margin: 0,
      backgroundColor: "var(--color-background)",
      padding: "2px 6px",
      borderRadius: "var(--radius-5)",
      marginInline: "2px",
      gap: "2px",
    },

    messageDate: {
      whiteSpace: "nowrap",
      color: "inherit",
      fontSize: "calc(0.65rem * var(--scaling))",
      marginLeft: "20px",
      fontWeight: 400,
      margin: 0,
    },

    messageStar: {
      color: "inherit",
      margin: 0,
      marginRight: "2px",
      lineHeight: 0,
    },

    messageMeta: {
      height: "100%",
      display: "inline-flex",
      alignItems: "center",
      float: "right",
      fontSize: "calc(0.65rem * var(--scaling))",
      fontWeight: 400,
      margin: "0.50rem 0 -0.10rem 0.75rem ",
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
  // selectMode,
  setEditMessage,
}: // setSelectedMessages,
MessageTileProps) {
  const session = useSession();
  const [isContextMenuOpen, setIsContextMenuOpen] = React.useState(false);
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
    <ContextMenu.Root onOpenChange={setIsContextMenuOpen}>
      <label>
        <Flex
          className={classes.messageTile}
          justify={isMe ? "end" : "start"}
          align="center"
        >
          {/* {selectMode && <Checkbox />} */}

          <Flex
            justify={!isMe ? "start" : "end"}
            className={classes.messageContainer}
            style={{
              filter: isContextMenuOpen ? "brightness(50%)" : "none",
            }}
          >
            {isInGroupChat && <Avatar fallback="A" />}

            <MessageContextMenu
              data={message}
              setEditMessage={setEditMessage}
              isMe={isMe}
            >
              {message.body ? (
                <animated.div className={classes.messageBubble}>
                  <div className={classes.messageText}>
                    {message.body}
                    <div className={classes.messageMeta}>
                      {message.isStarred && (
                        <animated.div
                          className={classes.messageStar}
                          title="Starred Message"
                        >
                          <PiStarFill />
                        </animated.div>
                      )}
                      {message.isEdited && (
                        <Text asChild mr="1">
                          <i>edited</i>
                        </Text>
                      )}
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
                    <ImageViewer
                      src={message.image || "/images/placeholder.png"}
                    />
                    <div className={classes.messageImageStatus}>
                      {message.isStarred && (
                        <animated.div
                          className={classes.messageStar}
                          title="Starred Message"
                        >
                          <PiStarFill />
                        </animated.div>
                      )}

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
            </MessageContextMenu>
          </Flex>
        </Flex>
      </label>
    </ContextMenu.Root>
  );
}

export default MessageTile;
