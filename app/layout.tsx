// app/layout.tsx
import ToastProvider from "@/components/ToastContainer";
import "./globals.css";
import SessionProviderWrapper from "./providers/SessionProviderWrapper";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "My App",
  description: "Demo App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <SessionProviderWrapper>
          <ToastProvider />
          {children}
        </SessionProviderWrapper>
        <Footer />
      </body>
    </html>
  );
}
