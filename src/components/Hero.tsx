"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Mail, Download, Cloud, Server, Container, Database, MonitorPlay, Code2 } from "lucide-react";
import styles from "./Hero.module.css";

const roles = [
  "Cloud Engineer",
  "AWS Solutions Architect",
  "AI Enthusiast",
  "DevOps Engineer",
];

const skills = [
  { name: "AWS", icon: Cloud },
  { name: "Terraform", icon: Server },
  { name: "Python", icon: Code2 },
  { name: "GitLab CI/CD", icon: MonitorPlay },
  { name: "Docker/K8s", icon: Container },
  { name: "PostgreSQL", icon: Database },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText.length < current.length) {
      timeout = setTimeout(() => setDisplayText(current.slice(0, displayText.length + 1)), 80);
    } else if (!isDeleting && displayText.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 45);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className={styles.hero} id="home">
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className={styles.wrapper}>
        {/* LEFT — Text Content */}
        <motion.div
          className={styles.textSide}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p className={styles.greeting} variants={itemVariants}>
            👋 Hello, I'm
          </motion.p>

          <motion.h1 className={styles.name} variants={itemVariants}>
            Solai Rajan
          </motion.h1>

          <motion.div className={styles.roleRow} variants={itemVariants}>
            <span className={styles.roleTyped}>
              {displayText}
              <span className={styles.cursor}>|</span>
            </span>
          </motion.div>

          {/* About summary — moved from About section */}
          <motion.p className={styles.subtitle} variants={itemVariants}>
            Cloud Engineer with a passion for designing resilient and highly-available
            infrastructure. I help teams migrate to AWS, automate deployments using DevOps
            best practices, and weave intelligence into cloud applications using LLMs.
          </motion.p>



          {/* Skills row */}
          <motion.div className={styles.skillsRow} variants={itemVariants}>
            {skills.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <div key={i} className={styles.skillChip}>
                  <Icon size={14} />
                  <span>{skill.name}</span>
                </div>
              );
            })}
          </motion.div>

          <motion.div className={styles.ctaGroup} variants={itemVariants}>
            <a href="#projects" className="glass-button primary">
              View Projects <ArrowRight size={18} />
            </a>
            <a href="/resume.pdf" download className="glass-button secondary" aria-label="Download Resume">
              Resume <Download size={18} />
            </a>
            <a href="#contact" className="glass-button secondary">
              Contact Me <Mail size={18} />
            </a>
          </motion.div>

          <motion.div className={styles.socials} variants={itemVariants}>
            <a href="https://github.com/Solairajan18" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.socialLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/solai-rajan/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT — Profile Photo */}
        <motion.div
          className={styles.photoSide}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 100 }}
        >
          <div className={styles.photoRing}>
            <div className={styles.photoInner}>
              <Image
                src="/profile.jpg"
                alt="Solai Rajan"
                fill
                sizes="(max-width: 800px) 200px, 280px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
          <motion.div
            className={`${styles.floatBadge} ${styles.floatBadgeRight}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <span className={styles.floatEmoji}>⚡</span>
            <span>5+ Yrs Exp</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
