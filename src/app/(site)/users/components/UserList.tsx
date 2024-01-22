"use client";

import { Box, Heading, ScrollArea } from "@radix-ui/themes";
import styles from "@/styles/homepage.module.css";
import UserTile from "./UserTile";
import { User } from "@prisma/client";
import { useStyles } from "tss-react";

function UserList({ users }: { users: User[] }) {
  const { css } = useStyles();

  return (
    <Box
      className={css({
        width: "100%",
        height: "100%",
        maxWidth: "25rem",
        overflow: "hidden",
      })}
    >
      <Box p="6">
        <Heading size="5">Users</Heading>
      </Box>
      <ScrollArea type="auto" scrollbars="vertical">
        {users.map((user) => {
          return <UserTile key={user.id} data={user} />;
        })}
      </ScrollArea>
    </Box>
  );
}

export default UserList;
