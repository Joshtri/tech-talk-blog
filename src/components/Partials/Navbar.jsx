import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from "flowbite-react";
import { NavLink } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import techTalkLogo from '../../assets/tech_talk.png';

function NavbarComp() {
  const [hovered, setHovered] = useState(null);
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.background = 'linear-gradient(to bottom, #1f2937, #111827)';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.background = '';
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const linkVariants = {
    hidden: { y: 0 },
    hover: { y: -5, transition: { type: "spring", stiffness: 300 } },
  };

  const floatingVariants = {
    animate: {
      y: [0, -2, 0],
      transition: {
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      className="rounded-xl shadow-lg"
      variants={floatingVariants}
      animate="animate"
    >
      <Navbar fluid rounded className="px-4 py-2 mt-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
        <Navbar.Brand href="/">
          <img src={techTalkLogo} className="mr-3 h-12 sm:h-10" alt="Tech Talk Logo" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link>
            <NavLink to="/" className="text-lg">
              <motion.div
                variants={linkVariants}
                initial="hidden"
                animate={hovered === "home" ? "hover" : "hidden"}
                onMouseEnter={() => setHovered("home")}
                onMouseLeave={() => setHovered(null)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
              >
                Blog
              </motion.div>
            </NavLink>
          </Navbar.Link>
          <Navbar.Link>
            <NavLink to="/about" className="text-lg">
              <motion.div
                variants={linkVariants}
                initial="hidden"
                animate={hovered === "about" ? "hover" : "hidden"}
                onMouseEnter={() => setHovered("about")}
                onMouseLeave={() => setHovered(null)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
              >
                About
              </motion.div>
            </NavLink>
          </Navbar.Link>
          <Navbar.Link>
            <NavLink to="/news" className="text-lg">
              <motion.div
                variants={linkVariants}
                initial="hidden"
                animate={hovered === "news" ? "hover" : "hidden"}
                onMouseEnter={() => setHovered("news")}
                onMouseLeave={() => setHovered(null)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
              >
                News
              </motion.div>
            </NavLink>
          </Navbar.Link>
          <Navbar.Link>
            <NavLink to="/games" className="text-lg">
              <motion.div
                variants={linkVariants}
                initial="hidden"
                animate={hovered === "games" ? "hover" : "hidden"}
                onMouseEnter={() => setHovered("games")}
                onMouseLeave={() => setHovered(null)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
              >
                Games
              </motion.div>
            </NavLink>
          </Navbar.Link>
          <Navbar.Link>
            <NavLink to="/voice-labs" className="text-lg">
              <motion.div
                variants={linkVariants}
                initial="hidden"
                animate={hovered === "voice" ? "hover" : "hidden"}
                onMouseEnter={() => setHovered("voice")}
                onMouseLeave={() => setHovered(null)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
              >
                Voice Lab
              </motion.div>
            </NavLink>
          </Navbar.Link>
                  {/* Toggle Dark Mode Button */}
        <button
          onClick={toggleTheme}
          className="ml-4 text-gray-700 dark:text-gray-300 focus:outline-none"
        >
          {theme === 'dark' ? <FaSun className="h-6 w-6" /> : <FaMoon className="h-6 w-6" />}
        </button>
        </Navbar.Collapse>

      </Navbar>
    </motion.div>
  );
}

export default NavbarComp;
