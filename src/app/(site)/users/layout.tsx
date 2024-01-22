import UserList from "@/app/(site)/users/components/UserList";
import { Flex } from "@radix-ui/themes";
import getUsers from "@/actions/getUsers";
import NavLayout from "@/components/navlayout/NavLayout";

async function UserLayout({ children }: { children: React.ReactNode }) {
  const users = await getUsers();
  return (
    <NavLayout>
      <Flex
        display={{
          initial: "none",
          sm: "flex",
        }}
        width="100%"
        height="100%"
      >
        <UserList users={users} />
        {children}
      </Flex>
    </NavLayout>
  );
}

{
  /* <Flex justify="center" align="center">
<Image
  src="/logo.svg"
  width="50"
  height="50"
  alt="Radix Chat Logo"
/>
<Heading size="4">Radix Chat</Heading>
</Flex> */
}

export default UserLayout;
