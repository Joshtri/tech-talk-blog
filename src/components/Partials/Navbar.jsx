"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import techTalkLogo from "@assets/tech_talk_logo.png";

function NavbarComp() {
  const [theme, setTheme] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light")
      : "light"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sync theme dengan localStorage
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.style.backgroundColor = "#111827";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.backgroundColor = "";
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo dan Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src={techTalkLogo}
                alt="Tech Talk Logo"
                width={40}
                height={40}
                className="mr-3"
              />
              <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
                Tech Talks Blog
              </span>
            </Link>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-8">
            {[
              { name: "Blog", href: "/" },
              { name: "About", href: "/about" },
              { name: "News", href: "/news" },
              { name: "Games", href: "/games" },
              { name: "CS Hub", href: "/cs-hub" },
              { name: "Tech Talk Video", href: "/tech-talk-video" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-lg transition duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Toggle Theme Button */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              ☰
            </button>

            <button
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              {theme === "dark" ? (
                <FaSun className="h-6 w-6" />
              ) : (
                <FaMoon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            {[
              { name: "Blog", href: "/" },
              { name: "About", href: "/about" },
              { name: "News", href: "/news" },
              { name: "Games", href: "/games" },
              { name: "CS Hub", href: "/cs-hub" },
              { name: "Tech Talk Video", href: "/tech-talk-video" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-lg transition duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavbarComp;
