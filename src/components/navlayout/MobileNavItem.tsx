import React from "react";
import Link from "next/link";
import styles from "@/styles/components/mobilenavitem.module.css";
import { IconButton, Tooltip } from "@radix-ui/themes";

interface MobileNavItemProps {
  label: string;
  icon: any;
  href: string;
  active?: boolean;
}

function MobileNavItem({
  label,
  icon: Icon,
  href,
  active,
}: MobileNavItemProps) {
  return (
    <li className={styles.li}>
      <Link href={href}>
        <div className={styles.iconButton} data-active={active}>
          <Icon />
          <span className={styles.srOnly}>{label}</span>
        </div>
      </Link>
    </li>
  );
}

export default MobileNavItem;
