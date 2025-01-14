"use client"; // Required for client-side rendering in Next.js

import Link from "next/link";
import { motion } from "framer-motion";

const ButtonLink = ({ href, label }) => {
  return (
    <Link href={href}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          {label}
        </button>
      </motion.div>
    </Link>
  );
};

export default ButtonLink;
