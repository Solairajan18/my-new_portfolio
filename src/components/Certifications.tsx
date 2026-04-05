"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./Certifications.module.css";

const certs = [
  { id: 1, name: "AWS Certified Solutions Architect", image: "/aws-saa.png", link: "https://www.credly.com/badges/0f8942c9-7fc0-4ece-8ca4-4f158a86ff04" },
  { id: 2, name: "Azure Fundamentals", image: "/az-900.png", link: "https://learn.microsoft.com/en-gb/users/solairajan-3120/credentials/20e20661d6a24ace?ref=https%3A%2F%2Fwww.solairajan.space%2F" },
  { id: 3, name: "AWS Cloud Quest", image: "/cloud-quest.png", link: "https://www.credly.com/badges/34d4ed6b-3c8f-4e91-8894-8ff11de70910" }
];

export default function Certifications() {
  return (
    <section className="section-container" id="certifications">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Licenses & Certifications
      </motion.h2>

      <div className={styles.certGrid}>
        {certs.map((cert, i) => {
          return (
            <motion.a
              key={cert.id}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.badge}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 100 }}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Image
                src={cert.image}
                alt={cert.name}
                width={110}
                height={110}
                className={styles.certImage}
              />
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
