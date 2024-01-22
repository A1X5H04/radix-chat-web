"use client";

import axios from "axios";
import { Box, Flex, Heading, Avatar } from "@radix-ui/themes";
import { animated, useSpring } from "@react-spring/web";
import React, { useCallback } from "react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { RxPerson } from "react-icons/rx";
import { useStyles } from "tss-react";

const AnimatedFlex = animated(Flex);

function UserTile({ data }: { data: User }) {
  const [loading, setLoading] = React.useState(false);
  const pulse = useSpring({
    from: { opacity: 1 },
    to: { opacity: loading ? 0.5 : 1 },
    reset: true,
    loop: { reverse: true },
  });
  const { css } = useStyles();
  const router = useRouter();

  const handleClick = useCallback(() => {
    setLoading(true);
    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((res) => {
        router.push(`/conversations/${res.data.id}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [data, router]);
  return (
    <AnimatedFlex
      mx="4"
      p="3"
      my="2"
      align="center"
      onClick={handleClick}
      style={pulse}
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
    </AnimatedFlex>
  );
}

export default UserTile;
