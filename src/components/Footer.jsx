import React, { useState } from 'react';
import { Footer } from "flowbite-react";
import { Link } from 'react-router-dom';
import Modal from 'react-modal'; // Pastikan untuk mengimpor react-modal

import techTalkLogo from '../assets/tech_talk.png';
import CardDonation from './CardDonation'; // Pastikan untuk mengimpor CardDonation

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
