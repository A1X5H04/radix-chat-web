"use client";

import { Box, Heading } from "@radix-ui/themes";
import styles from "@/styles/homepage.module.css";
import UserTile from "./UserTile";
import { User } from "@prisma/client";

function UserList({ users }: { users: User[] }) {
  return (
    <Box className={styles.userList}>
      <Box p="6">
        <Heading size="5">Users</Heading>
      </Box>
      {users.map((user) => {
        return <UserTile key={user.id} data={user} />;
      })}
    </Box>
  );
}

export default UserList;
