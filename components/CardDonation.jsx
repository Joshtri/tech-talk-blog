/* eslint-disable react/prop-types */
"use client"; // Next.js menggunakan mode client untuk komponen seperti ini
import React from "react";
import Modal from "react-modal";
import { Button } from "flowbite-react"; // Mengimpor Button dari flowbite-react
import Image from "next/image"; // Menggunakan Image dari Next.js
import techTalkLogo from "@assets/tech_talk_logo.png";

const CardDonation = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Donation Modal"
      className="modal" // Menambahkan class modal untuk gaya tambahan
      overlayClassName="modal-overlay fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50" // Menambahkan class modal-overlay untuk gaya tambahan pada overlay
      ariaHideApp={false} // Agar tidak ada warning di Next.js
    >
      <div className="modal-content p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Buy Me Coffee gess
        </h2>

        <div className="flex justify-center">
          {/* Gunakan Image dari Next.js */}
          <Image src={techTalkLogo} alt="Gambar" className="w-64 h-auto" />
        </div>

        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-justify mt-4">
          Scan QR Code Saweria ini untuk otomatis masuk ke halaman donasi. Atau
          bisa ke{" "}
          <a
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
            href="https://saweria.co/yostri"
          >
            https://saweria.co/yostri
          </a>
          . Bisa pakai Gopay, OVO, DANA, dan lainnya, loh.
        </p>

        {/* Isi dengan form atau konten lain untuk proses donasi */}
        <Button
          className="bg-blue-500 text-white px-3 py-2 rounded-lg mt-4 hover:bg-blue-600"
          onClick={onRequestClose}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default CardDonation;
