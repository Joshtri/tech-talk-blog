import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from "flowbite-react";
import { NavLink } from 'react-router-dom';
import techTalkLogo from '../../assets/tech_talk.png';

function NavbarComp() {
  const [hovered, setHovered] = useState(null);

  // Variants for nav link animations
  const linkVariants = {
    hidden: { y: 0 },
    hover: { y: -5, transition: { type: "spring", stiffness: 300 } },
  };

  // Variants for subtle floating navbar animation
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
      <Navbar fluid rounded className="px-4 py-2 mt-3 bg-white border border-gray-200 rounded-xl shadow-md">
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
                className="text-gray-700 hover:text-blue-600 transition duration-300"
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
                className="text-gray-700 hover:text-blue-600 transition duration-300"
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
                className="text-gray-700 hover:text-blue-600 transition duration-300"
              >
                News
              </motion.div>
            </NavLink>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </motion.div>
  );
}

export default NavbarComp;
