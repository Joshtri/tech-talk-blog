
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { NavLink } from 'react-router-dom';


function NavbarComp() {


  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand href="/">
          <img src="/public/tech_talk.png" className="mr-3 h-12 sm:h-10" alt="Flowbite React Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"></span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link  >
            <NavLink to="/" active>
                Blog
            </NavLink>
          </Navbar.Link>
          <Navbar.Link >
            <NavLink to="/about" active>
                About
            </NavLink>
          </Navbar.Link>
          {/* <Navbar.Link href="#">Services</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link> */}
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default NavbarComp