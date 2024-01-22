import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import "./radixui-config.css";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";
import { Theme } from "@radix-ui/themes";
import { AuthContext } from "../../contexts/AuthContext";

const raleway = Raleway({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "Radix Chat",
  description: "A chat app built with Radix UI and Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body className={raleway.variable}>
        <AuthContext>
          <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
            <Theme accentColor="violet" appearance="dark" radius="medium">
              {children}
            </Theme>
          </NextAppDirEmotionCacheProvider>
        </AuthContext>
      </body>
    </html>
  );
}
