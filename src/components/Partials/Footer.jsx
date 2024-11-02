import React, { useState } from 'react';
import { Footer } from "flowbite-react";
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { AiFillInstagram, AiFillFacebook, AiFillGithub, AiOutlineTwitter, AiOutlineX } from 'react-icons/ai'; // Import icons from react-icons

import techTalkLogo from '../../assets/tech_talk.png';
import CardDonation from '../CardDonation';

function FooterComp() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <Footer container>
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <Footer.Brand
              href="/"
              src={techTalkLogo}
              alt="Tech talk Logo"
            />
            <Footer.LinkGroup>
              <Footer.Link>
                <Link to="#" onClick={() => setModalIsOpen(true)}>
                  Buy me Coffee ☕
                </Link>
              </Footer.Link>
              <Footer.Link>
                <Link to="/about">
                  About
                </Link>
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          <div className="mt-4 flex justify-center md:justify-end space-x-4">
          <Footer.LinkGroup>
              {/* Social media links */}
              <Footer.Link>
                <a href="https://www.instagram.com/yosryy_lenggu/" target="_blank" rel="noopener noreferrer"
                className='text-red-400 text-2xl'>
                  <AiFillInstagram />
                </a>
              </Footer.Link>
              <Footer.Link>
                <a href="https://www.facebook.com/yosry.lenggu/" target="_blank" rel="noopener noreferrer" className='text-blue-600 text-2xl'>
                  <AiFillFacebook />
                </a>
              </Footer.Link>
              <Footer.Link>
                <a href="https://github.com/Joshtri" target="_blank" rel="noopener noreferrer" className='text-slate-950 text-2xl'>
                  <AiFillGithub />
                </a>
              </Footer.Link>
              <Footer.Link>
                <a href="https://x.com/yosry_lenggu" target="_blank" rel="noopener noreferrer" className='text-slate-950 text-2xl'>
                  <AiOutlineX />
                </a>
              </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <Footer.Divider />
          <Footer.Copyright href="/" by="Tech Talk" year={2024} />
        </div>
      </Footer>

      {/* Modal Donasi */}
      <CardDonation isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
    </>
  );
}

export default FooterComp;
