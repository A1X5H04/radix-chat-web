import getCurrentUser from "@/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
import styles from "@/styles/components/sidebar.module.css";
import MobileHeader from "./MobileHeader";

async function NavLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  return (
    <div className={styles.container}>
      <DesktopSidebar currentUser={currentUser!} />
      <MobileHeader currentUser={currentUser} />
      <main className={styles.main}>{children}</main>
      <MobileFooter />
    </div>
  );
}

export default NavLayout;
