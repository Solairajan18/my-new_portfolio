"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";
import styles from "./Experience.module.css";

const experiences = [
  {
    id: 5,
    title: "Task Filing Application with Batch Workflows",
    company: "Batch Workflows",
    date: "2026 - Present",
    description: [
      "Developed a critical data processing application using AWS Glue, Lambda, Step Functions, SQS, and Iceberg tables.",
      "Implemented 200+ business validations to ensure data accuracy and compliance.",
      "Integrated external government APIs for real-time validation and processing.",
      "Designed and orchestrated batch workflows using Step Functions for efficient data processing.",
      "Developed APIs to support user operations such as approve, validate, compare, and generate reports.",
      "Implemented secure file upload and download functionality using pre-signed URLs.",
      "Developed a Copilot agent to generate Terraform code based on user requirements, leveraging internal reusable modules and ensuring compliance with project standards",
      "Ensured high reliability, scalability, and performance for large-scale data processing."
    ],
    tech: ["AWS Glue", "AWS Lambda", "AWS Step Functions", "AWS SQS", "Iceberg tables", "AWS Copilot", "Terraform", "Python"]
  },
  {
    id: 4,
    title: "Mainframe to AWS Modernization",
    company: "Mainframe to AWS",
    date: "2025 - 2026",
    description: [
      "Developed high-availability APIs using API Gateway (private), Lambda, and DynamoDB.",
      "Implemented multi-region disaster recovery with DynamoDB Global Tables.",
      "Configured Route 53 failover with health checks and load balancers.",
      "Automated monitoring using EventBridge, Lambda, and CloudWatch alarms.",
      "Ensured zero/low downtime through automated failover mechanisms.",
      "Built infrastructure using reusable Terraform modules.",
      "Integrated CI/CD via GitLab with Scalr, Terratest, and security scans."
    ],
    tech: ["API Gateway", "Lambda", "DynamoDB", "Route 53", "EventBridge", "CloudWatch", "Terraform", "GitLab CI"]
  },
  {
    id: 3,
    title: "DB2 to DynamoDB Data Migration",
    company: "DB2 to DynamoDB",
    date: "2024 - 2025",
    description: [
      "Executed end-to-end migration from DB2 to DynamoDB.",
      "Used AWS Transfer Service, S3, Glue, and VPC Endpoints for secure data flow.",
      "Performed ETL using AWS Glue for transformation and preparation.",
      "Ensured data integrity and compliance during migration, optimizing DynamoDB for scale.",
      "Built reusable Terraform modules stored in GitLab and used Scalr for state management.",
      "Integrated security scans (Sync Scan, LabLooter) and Pytest in pipeline."
    ],
    tech: ["AWS Transfer Service", "AWS S3", "AWS Glue", "DynamoDB", "Terraform", "Scalr", "Terratest", "Pytest"]
  },
  {
    id: 2,
    title: "API Lambda Development",
    company: "API Development",
    date: "2023 - 2024",
    description: [
      "Developed modular Python-based AWS Lambda functions for API operations.",
      "Implemented input validation and exception handling following best practices.",
      "Optimized Lambda performance (reduced execution time and memory usage).",
      "Wrote unit tests using Pytest and integrated into CI/CD pipeline.",
      "Created HLD, LLD, and component design documentation."
    ],
    tech: ["Python", "AWS Lambda", "Pytest", "CI/CD", "System Design"]
  },
  {
    id: 1,
    title: "Atos Cloud to AWS Migration",
    company: "Atos Cloud to AWS",
    date: "2022 - 2023",
    description: [
      "Migrated a .NET application and SQL Server database from Atos Cloud to AWS.",
      "Analyzed existing infrastructure and defined migration requirements.",
      "Provisioned AWS EC2 for application hosting and RDS (MySQL) for database.",
      "Installed and configured required software and dependencies.",
      "Supported testing for functional and performance validation post-migration.",
      "Delivered solutions aligned with stakeholder requirements."
    ],
    tech: ["AWS EC2", "AWS RDS (MySQL)", ".NET", "Cloud Migration"]
  }
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 800);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeExp = experiences[activeTab];

  return (
    <section className="section-container" id="experience">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Where I've Worked
      </motion.h2>

      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.tabList}>
          {experiences.map((exp, index) => (
            <button
              key={exp.id}
              className={`${styles.tabButton} ${activeTab === index ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(index)}
              aria-selected={activeTab === index}
              role="tab"
            >
              {exp.company}
            </button>
          ))}
          <motion.div
            className={styles.highlight}
            initial={false}
            animate={{
              y: isMobile ? 0 : activeTab * 52, // 52px is approx height of each tab
              x: isMobile ? activeTab * 140 : 0, // Approx width of mobile tab
              height: isMobile ? "2px" : "52px",
              width: isMobile ? "140px" : "2px",
              bottom: isMobile ? -2 : "auto",
              left: isMobile ? 0 : -2,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              // For a perfectly robust implementation, one would use measurements via Refs.
              // We fallback to standard active class border if this animation is uncalibrated.
              display: 'none'
            }}
          />
        </div>

        <div className={styles.contentContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3 className={styles.roleTitle}>
                {activeExp.title} <span className={styles.companyColor}>@ {activeExp.company}</span>
              </h3>

              <div className={styles.dateRange}>
                <Calendar size={16} /> {activeExp.date}
              </div>

              <ul className={styles.descriptionList}>
                {activeExp.description.map((item, i) => (
                  <li key={i} className={styles.descriptionItem}>{item}</li>
                ))}
              </ul>

              {activeExp.tech && activeExp.tech.length > 0 && (
                <div className={styles.techStack}>
                  {activeExp.tech.map((t, idx) => (
                    <span key={idx} className={styles.tech}>{t}</span>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
