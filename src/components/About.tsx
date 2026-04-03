"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Cloud, Server, Database, Container, Code2, MonitorPlay } from "lucide-react";
import styles from "./About.module.css";

const skills = [
  { name: "AWS", icon: Cloud },
  { name: "Terraform", icon: Server },
  { name: "Python", icon: Code2 },
  { name: "GitLab CI/CD", icon: MonitorPlay },
  { name: "Docker/K8s", icon: Container },
  { name: "PostgreSQL", icon: Database },
];

export default function About() {
  return (
    <section className="section-container" id="about">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        About Me
      </motion.h2>

      <div className={styles.about}>
        <motion.div 
          className={styles.textContent}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p>
            I am a Cloud Engineer with a passion for designing resilient and highly-available 
            infrastructure. Over the past few years, I have helped startups and enterprises migrate 
            to AWS, automate their deployments using DevOps best practices, and optimize cloud costs 
            without sacrificing performance.
          </p>
          <p>
            When I'm not writing Terraform configurations or debugging CI/CD pipelines, I enjoy 
            building side projects (often weekend experiments) and exploring the latest advancements 
            in Large Language Models to weave intelligence into classical cloud applications.
          </p>

          <h3 className={styles.skillsTitle}>Key Technologies</h3>
          <div className={styles.skillsGrid}>
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div key={index} className={styles.skillBadge}>
                  <Icon size={18} />
                  <span>{skill.name}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div 
          className={styles.imageWrapper}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image 
            src="/profile.jpg" 
            alt="Profile Photo" 
            width={400} 
            height={500} 
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
