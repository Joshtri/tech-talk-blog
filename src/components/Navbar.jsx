import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from "flowbite-react";
import { NavLink } from 'react-router-dom';
import techTalkLogo from '../assets/tech_talk.png';

function NavbarComp() {
  const [hovered, setHovered] = useState(null);

  // Variants untuk animasi link navigasi
  const linkVariants = {
    hidden: { y: 0 },
    hover: { y: -5, transition: { type: "spring", stiffness: 300 } },
  };

  // Variants untuk animasi floating navbar
  const floatingVariants = {
    animate: {
      y: [0, -5, 0], // Pergerakan ke atas dan turun
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity, // Agar animasi terus berjalan
      },
    },
  };

  return (
    <motion.div
      className="rounded-xl shadow-md" // Adjusted shadow and removed padding
      variants={floatingVariants}
      animate="animate"
    >
      <Navbar fluid rounded className="px-3 mt-3 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-xl">
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
                className="text-white hover:text-gray-800 transition duration-300"
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
                className="text-white hover:text-gray-800 transition duration-300"
              >
                About
              </motion.div>
            </NavLink>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </motion.div>
  );
}

export default NavbarComp;
