"use client";

import { Box, Flex, Heading, Avatar } from "@radix-ui/themes";
import React, { useCallback } from "react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { RxPerson } from "react-icons/rx";
import { useStyles } from "tss-react";

function UserTile({ data }: { data: User }) {
  const { css } = useStyles();
  const router = useRouter();

  const handleClick = useCallback(() => {
    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((res) => {
        router.push(`/conversations/${res.data.id}`);
      });
  }, [data, router]);
  return (
    <Flex
      mx="4"
      p="3"
      my="2"
      align="center"
      onClick={handleClick}
      className={css({
        cursor: "pointer",
        borderRadius: "var(--radius-3)",
        "&:hover": {
          backgroundColor: "var(--accent-4)",
        },
      })}
    >
      <Box position="relative">
        <Avatar
          fallback={<RxPerson />}
          variant="solid"
          m="0"
          src={data?.image || undefined}
        ></Avatar>
        <Box position="absolute"></Box>
      </Box>
      <Box ml="2">
        <Heading size="2" as="h3">
          {data.name}
        </Heading>
      </Box>
    </Flex>
  );
}

export default UserTile;
