"use client";

import {
  Avatar,
  Flex,
  Box,
  Heading,
  IconButton,
  Text,
  AlertDialog,
  Button,
  Strong,
  ScrollArea,
  Grid,
  Switch,
} from "@radix-ui/themes";
import { animated, easings, useSpring, useTransition } from "@react-spring/web";
import useOtherUser from "@/hooks/useOtherUser";
import { useCallback, useMemo } from "react";
import { Conversation, User } from "@prisma/client";
import { RxCaretRight, RxPerson } from "react-icons/rx";
import { PiTrashFill } from "react-icons/pi";
import { CgClose } from "react-icons/cg";
import axios from "axios";
import { useRouter } from "next/navigation";
import useConversation from "@/hooks/useConversation";
import { tss } from "tss-react";
import { formatDate } from "@/libs/utils";

interface ProfileDrawerProps {
  data: Conversation & {
    users: User[];
  };
  isOpen: boolean;
  onClose: () => void;
}

const profileDrawerStyles = tss.create({
  modalBackground: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor: "var(--color-overlay)",
    zIndex: 25,
    boxSizing: "border-box",
  },

  modal: {
    maxWidth: "25rem",
    backgroundColor: "var(--color-background)",
    height: "calc(100% - 2rem)",
    borderRadius: "var(--radius-5)",
    boxShadow: "var(--shadow-6)",
    overflow: "hidden",
    zIndex: 30,
  },
  infoContainer: {
    backgroundColor: "var(--gray-2)",
    padding: "var(--space-4)",
    borderRadius: "var(--radius-4)",
  },
});

const AnimatedBox = animated(Box);

function ProfileDrawer({ data, isOpen, onClose }: ProfileDrawerProps) {
  const otherUser = useOtherUser(data);
  const router = useRouter();
  const { conversationId } = useConversation();
  const { classes } = profileDrawerStyles();

  const modalTransition = useTransition(isOpen, {
    from: { transform: "translateX(10%)" },
    enter: { transform: "translateX(0%)" },
    leave: { transform: "translateX(5%)" },
  });

  const backgroundAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 200,
      easing: easings.easeOutCubic,
    },
    reverse: !isOpen,
  });

  const deleteChat = useCallback(() => {
    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        router.push("/conversations");
        router.refresh();
      })
      .catch(() => {
        alert("Something went wrong!");
      });
  }, [router, conversationId]);

  const joinedDate = useMemo(() => {
    return formatDate(otherUser.createdAt);
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return "Online";
  }, [data]);

  return modalTransition(
    (style, item) =>
      item && (
        <animated.div
          className={classes.modalBackground}
          style={backgroundAnimation}
          onClick={onClose}
        >
          <AnimatedBox
            style={style}
            className={classes.modal}
            position="fixed"
            top="0"
            right="0"
            width="100%"
            m="4"
            py="5"
            px="2"
            onClick={(e) => e.stopPropagation()}
          >
            <Flex justify="between" px="3">
              <Box mb="5">
                <Heading size="4">Profile Info</Heading>
                <Text size="2" mt="5">
                  View Conversation Info
                </Text>
              </Box>
              <IconButton size="2" variant="ghost" onClick={onClose}>
                <CgClose />
              </IconButton>
            </Flex>
            <ScrollArea
              scrollbars="vertical"
              style={{
                height: "calc(100% - 4rem)",
              }}
            >
              <Box mt="6" pl="3" pr="4">
                <Flex direction="column" align="center">
                  <Avatar
                    fallback={<RxPerson size={40} />}
                    src={otherUser.image || undefined}
                    variant="solid"
                    size="7"
                  />
                  <Heading size="4" mt="5">
                    {title}
                  </Heading>
                  <Text size="1" mt="1">
                    {statusText}
                  </Text>
                </Flex>
                <Flex
                  align="center"
                  justify="center"
                  gap="8"
                  width="100%"
                  mt="8"
                >
                  <Flex align="center" direction="column" gap="2">
                    <AlertDialog.Root>
                      <AlertDialog.Content style={{ maxWidth: 450 }}>
                        <AlertDialog.Title>
                          Delete Conversation?
                        </AlertDialog.Title>
                        <AlertDialog.Description size="2">
                          Are you sure you want to delete this conversation
                          with&nbsp;
                          <Strong>{otherUser.name}?</Strong>
                        </AlertDialog.Description>

                        <Flex gap="3" mt="4" justify="end">
                          <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                              Cancel
                            </Button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action>
                            <Button
                              variant="solid"
                              color="red"
                              onClick={deleteChat}
                            >
                              Delete
                            </Button>
                          </AlertDialog.Action>
                        </Flex>
                      </AlertDialog.Content>
                      <AlertDialog.Trigger>
                        <IconButton size="3" color="red" variant="soft">
                          <PiTrashFill size="25" />
                        </IconButton>
                      </AlertDialog.Trigger>
                    </AlertDialog.Root>
                    <Text size="1" mt="1" weight="medium">
                      Delete Chat
                    </Text>
                  </Flex>
                  {/* <Flex align="center" direction="column" gap="2">
            <IconButton size="3" variant="soft">
            <PiTrashFill size="25" />
            </IconButton>
            <Text size="1" mt="1" weight="medium">
              Add to Favourite
              </Text>
            </Flex> */}
                </Flex>
                <Box mt="8" className={classes.infoContainer}>
                  <Box mb="5">
                    <Heading size="2" mt="1" weight="bold">
                      Bio
                    </Heading>
                    <Text size="2" mt="1" weight="medium" color="gray">
                      {otherUser?.bio || "No bio"}
                    </Text>
                  </Box>
                  <Box my="5">
                    <Heading size="2" mt="1" weight="bold">
                      Email
                    </Heading>
                    <Text size="2" mt="1" weight="medium" color="gray">
                      {otherUser?.email}
                    </Text>
                  </Box>
                  <Box mt="5">
                    <Heading size="2" mt="1" weight="bold">
                      Joined
                    </Heading>
                    <Text
                      size="2"
                      mt="1"
                      weight="medium"
                      color="gray"
                      suppressHydrationWarning
                    >
                      {joinedDate}
                    </Text>
                  </Box>
                </Box>

                {/* <Box my="2" className={classes.infoContainer}>
                  <Box>
                    <Flex justify="between" align="center">
                      <Heading size="2" mt="1" weight="bold">
                        Media, Links, and Docs
                      </Heading>
                      <RxCaretRight size={20} />
                    </Flex>
                    <Grid
                      mt="4"
                      columns="repeat(auto-fit, minmax(100px, 1fr))"
                      gap="4"
                    ></Grid>
                  </Box>
                </Box>
                <Box my="2" className={classes.infoContainer}>
                  <Flex mb="6" justify="between" align="center">
                    <Heading size="2" mt="1" weight="bold">
                      Mute Notifications
                    </Heading>
                    <Switch size="1" variant="soft" />
                  </Flex>
                  <Flex justify="between" align="center">
                    <Heading size="2" mt="1" weight="bold">
                      Starred Messages
                    </Heading>
                    <RxCaretRight size={20} />
                  </Flex>
                </Box> */}
              </Box>
            </ScrollArea>
          </AnimatedBox>
        </animated.div>
      )
  );
}

export default ProfileDrawer;
