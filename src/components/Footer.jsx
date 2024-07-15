import React from 'react'
import { Footer } from "flowbite-react";
import { Link } from 'react-router-dom';
import techTalkLogo from '../assets/tech_talk.png';
function FooterComp() {
  return (
    <>
        <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            href="/"
            src={techTalkLogo}
            alt="Flowbite Logo"
           
          />
          <Footer.LinkGroup>
            <Footer.Link>
              <Link to="/about">
                About
              </Link>
            </Footer.Link>

          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="/" by="Tech Talk" year={2024} />
      </div>
    </Footer>
    </>
  )
}

export default FooterComp