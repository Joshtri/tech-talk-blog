import "./globals.css"; // Import Tailwind
import NavbarComp from "@/components/Partials/Navbar";
import Footer from "@/components/Partials/Footer";

export const metadata = {
  title: "Tech Talks Blog",
  description: "Explore tech insights and trends.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900">
        <NavbarComp />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
