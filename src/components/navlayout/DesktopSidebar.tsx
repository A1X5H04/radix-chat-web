"use client";

import useRoutes from "@/hooks/useRoutes";
import React from "react";
import DesktopItem from "./DesktopItem";
import { Avatar, Box, Flex, IconButton } from "@radix-ui/themes";
import { RxExit, RxGear, RxPerson } from "react-icons/rx";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import SettingsDialog from "../SettingsDialog";
import ProfileDialog from "../ProfileDialog";
function DesktopSidebar({ currentUser }: { currentUser: User }) {
  const routes = useRoutes();

  return (
    <Flex
      display={{
        initial: "none",
        md: "flex",
      }}
      position="fixed"
      top="0"
      left="0"
      direction="column"
      align="center"
      height="100%"
      width="9"
      px="7"
      py="4"
      style={{
        backgroundColor: "var(--color-background)",
        boxShadow: "var(--shadow-4)",
        overflowY: "auto",
        zIndex: 20,
        overflowX: "hidden",
      }}
      justify="between"
    >
      {/* <ProfileDialog currentUser={currentUser}>
        <Box>
        </Box>
      </ProfileDialog> */}
      <Avatar
        fallback={<RxPerson />}
        src={currentUser?.image || undefined}
        mt="4"
        radius="full"
        size="3"
      />

      <Box>
        <ul role="list">
          {routes.map((item) => {
            return (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
              />
            );
          })}
        </ul>
      </Box>
      <Flex direction="column" gap="4">
        {/* <SettingsDialog>
          <IconButton variant="ghost" size="2" m="2">
            <RxGear />
          </IconButton>
        </SettingsDialog> */}
        <IconButton onClick={() => signOut()} variant="ghost" size="3" m="2">
          <RxExit />
        </IconButton>
      </Flex>
    </Flex>
  );
}

export default DesktopSidebar;
