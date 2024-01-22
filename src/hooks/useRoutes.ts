import { useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  PiChatsTeardropFill,
  PiUsersFill,
  PiCircleDashedFill,
  PiMegaphoneFill,
  PiNotificationFill,
} from "react-icons/pi";
import useConversation from "./useConversation";

const useRoutes = () => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversations",
        icon: PiChatsTeardropFill,
        active: pathname === "/conversations" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: PiUsersFill,
        active: pathname === "/users",
      },
      // {
      //   label: "Channels",
      //   href: "/channels",
      //   icon: PiMegaphoneFill,
      //   active: pathname === "/channels",
      // },
      // {
      //   label: "Stories",
      //   href: "/stories",
      //   icon: PiCircleDashedFill,
      //   active: pathname === "/stories",
      // },
    ],
    [pathname, conversationId]
  );

  return routes;
};

export default useRoutes;
