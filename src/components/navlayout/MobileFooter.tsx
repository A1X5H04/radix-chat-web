"use client";

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import styles from "@/styles/components/mobilefooter.module.css";
import MobileNavItem from "./MobileNavItem";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.ul}>
        {routes.map((route) => (
          <MobileNavItem
            key={route.label}
            label={route.label}
            icon={route.icon}
            active={route.active}
            href={route.href}
          />
        ))}
      </ul>
    </div>
  );
};

export default MobileFooter;
