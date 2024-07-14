
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Avatar, Dropdown, Navbar } from "flowbite-react";


function NavbarComp() {


  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Tech Talk</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link  active>
            Blog
          </Navbar.Link>
          <Navbar.Link href="#">
            About
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