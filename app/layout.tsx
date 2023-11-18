import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./Navbar";
import "./globals.css";
import Provider from "./auth/Provider";
import QueryClientProvider from "./QueryClientProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="winter">
      <body className={inter.className}>
        <QueryClientProvider>
          <Provider>
            <Theme accentColor="violet">
              <Navbar />
              <Container>
                <main className="p-5">{children}</main>
              </Container>
            </Theme>
          </Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
