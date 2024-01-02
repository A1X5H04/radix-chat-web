import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { RiMegaphoneFill } from "react-icons/ri";
import useConversation from "./useConversation";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: BsChatSquareDotsFill,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: FaUserFriends,
        active: pathname === "/users",
      },
      // {
      //   label: "Broadcast",
      //   href: "/broadcast",
      //   icon: RiMegaphoneFill,
      //   active: pathname === "/broadcast",
      // },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
