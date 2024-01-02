"use client";

import { User } from "@prisma/client";
import { Avatar, Box, Flex, IconButton } from "@radix-ui/themes";
import { signOut } from "next-auth/react";
import React from "react";
import { RxExit, RxGear, RxPerson } from "react-icons/rx";
import { useStyles } from "tss-react";

function MobileHeader({ currentUser }: { currentUser: User }) {
  const { css } = useStyles();
  return (
    <Flex
      align="center"
      justify="between"
      className={css({
        backgroundColor: "var(--color-background)",
        boxShadow: "var(--shadow-4)",
        zIndex: 100,
      })}
      py="3"
      px="5"
      display={{
        initial: "flex",
        md: "none",
      }}
    >
      <Avatar
        src={currentUser?.image || undefined}
        radius="full"
        fallback={<RxPerson />}
      />
      <Box>
        <IconButton variant="ghost" mr="4">
          <RxGear />
        </IconButton>
        <IconButton onClick={() => signOut()} variant="ghost" ml="4">
          <RxExit />
        </IconButton>
      </Box>
    </Flex>
  );
}

export default MobileHeader;
