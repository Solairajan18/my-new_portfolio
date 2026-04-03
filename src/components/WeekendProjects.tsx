"use client";

import { motion } from "framer-motion";
import { FolderGit2, Star } from "lucide-react";
import styles from "./WeekendProjects.module.css";

const miniProjects = [
  {
    id: 1,
    title: "Ask Your Docs",
    description: "A RAG Chatbot Using Free & Open-Source Tools.",
    link: "https://solairajan18.medium.com/building-a-simple-ask-your-docs-rag-chatbot-using-free-open-source-tools-7f9e8d440330",
  },
  {
    id: 2,
    title: "Sol AI",
    description: "A AI based Chatbot using LLM and Vector DB for my portfolio website it will answer about me in natural language.",
    link: "#",
  },
  {
    id: 3,
    title: "Keyless AWS Access",
    description: "Securely Access AWS Using OIDC Role in GitLab CI/CD Pipelines.",
    link: "https://solairajan18.medium.com/how-to-access-aws-using-oidc-role-in-gitlab-runner-8d9570635aaa",
  },
  {
    id: 4,
    title: "Azure AD SSO",
    description: "How to Access AWS Console Using Azure AD SSO (SAML Federation).",
    link: "https://solairajan18.medium.com/how-to-access-aws-console-using-azure-ad-sso-saml-federation-d48493456910",
  },
  {
    id: 5,
    title: "Recovering or Replacing a Key Pair in AWS EC2",
    description: "Recovering or Replacing a Key Pair in AWS EC2: A Step-by-Step Guide",
    link: "https://solairajan18.medium.com/recovering-or-replacing-a-key-pair-in-aws-ec2-a-step-by-step-guide-d3fbfe94aa65",
  }
];

export default function WeekendProjects() {
  return (
    <section className="section-container" style={{ padding: '2rem 2rem 6rem' }}>
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'left' }}
      >
        Weekend Experiments
      </motion.h2>
      
      <div className={styles.weekendGrid}>
        {miniProjects.map((proj, i) => (
          <motion.a 
            key={proj.id}
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.miniCard}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <h3 className={styles.title}>
              <span className={styles.header}>
                <FolderGit2 size={18} /> {proj.title}
              </span>
              <Star size={14} className="hover:text-amber-400 cursor-pointer" />
            </h3>
            <p className={styles.description}>{proj.description}</p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
