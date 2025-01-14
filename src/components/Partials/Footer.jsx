"use client";

import { useState } from "react";
import { Footer } from "flowbite-react";
import Link from "next/link";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillGithub,
  AiOutlineX,
  AiFillYoutube,
} from "react-icons/ai";
import CardDonation from "../CardDonation";

const techTalkLogo = "/assets/tech_talk_logo.png"; // Pastikan file ada di folder public/assets/

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
              className="w-16 h-auto" // Ubah ukuran gambar dengan Tailwind
            />
            <Footer.LinkGroup>
              <Footer.Link>
                <span
                  className="cursor-pointer"
                  onClick={() => setModalIsOpen(true)}
                >
                  Buy me Coffee ☕
                </span>
              </Footer.Link>
              <Footer.Link>
                <Link href="/about">About</Link>
              </Footer.Link>
            </Footer.LinkGroup>
          </div>

          <div className="mt-4 flex justify-center md:justify-end space-x-4">
            <Footer.LinkGroup>
              {/* Social media links */}
              <Footer.Link>
                <a
                  href="https://www.youtube.com/@yosryy_lenggu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 text-2xl"
                >
                  <AiFillYoutube />
                </a>
              </Footer.Link>
              <Footer.Link>
                <a
                  href="https://www.instagram.com/yosryy_lenggu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 text-2xl"
                >
                  <AiFillInstagram />
                </a>
              </Footer.Link>
              <Footer.Link>
                <a
                  href="https://www.facebook.com/yosry.lenggu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-2xl"
                >
                  <AiFillFacebook />
                </a>
              </Footer.Link>
              <Footer.Link>
                <a
                  href="https://github.com/Joshtri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-950 dark:text-gray-200 text-2xl"
                >
                  <AiFillGithub />
                </a>
              </Footer.Link>
              <Footer.Link>
                <a
                  href="https://x.com/yosryy_lenggu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-950 dark:text-gray-200 text-2xl"
                >
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
      <CardDonation
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      />
    </>
  );
}

export default FooterComp;
