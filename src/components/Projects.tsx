"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, X, Calendar } from "lucide-react";
import styles from "./Projects.module.css";

const projects = [
  {
    id: 5,
    title: "Tax Filing Application with Batch Workflows",
    company: "Statefarm",
    date: "2026 - Present",
    description: [
      "Developed a critical data processing application using AWS Glue, Lambda, Step Functions, SQS, and Iceberg tables.",
      "Implemented 200+ business validations to ensure data accuracy and compliance.",
      "Integrated external government APIs for real-time validation and processing.",
      "Designed and orchestrated batch workflows using Step Functions for efficient data processing.",
      "Developed APIs to support user operations such as approve, validate, compare, and generate reports.",
      "Implemented secure file upload and download functionality using pre-signed URLs.",
      "Ensured high reliability, scalability, and performance for large-scale data processing."
    ],
    tech: ["AWS Glue", "AWS Lambda", "AWS Step Functions", "AWS SQS", "Iceberg tables"]
  },
  {
    id: 4,
    title: "Mainframe to AWS Modernization",
    company: "Statefarm",
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
    company: "Statefarm",
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
    company: "Statefarm",
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
    company: "Philips DA",
    date: "2022 - 2023",
    description: [
      "Migrated a .NET application and SQL Server database from Atos Cloud to AWS.",
      "Analyzed existing infrastructure and defined migration requirements.",
      "Provisioned AWS EC2 for application hosting and RDS (SQL Server) for database.",
      "Installed and configured required software and dependencies.",
      "Supported testing for functional and performance validation post-migration.",
      "Delivered solutions aligned with stakeholder requirements."
    ],
    tech: ["AWS EC2", "AWS RDS (SQL Server)", ".NET", "Cloud Migration"]
  }
];

export default function Projects() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedId !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedId]);

  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <section className="section-container" id="projects">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Featured Projects & Experience
      </motion.h2>

      <div className={styles.grid}>
        {projects.map((project, i) => (
          <motion.div 
            key={project.id}
            className={styles.card}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            onClick={() => setSelectedId(project.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedId(project.id);
              }
            }}
          >
            <div className={styles.image}>
              <Layers size={60} className={styles.iconOverlay} />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{project.title}</h3>
              <div className={styles.company}>
                {project.company} &bull; {project.date}
              </div>
              
              <div className={styles.techStack}>
                {project.tech.slice(0, 4).map((t, index) => (
                  <span key={index} className={styles.tech}>{t}</span>
                ))}
                {project.tech.length > 4 && (
                  <span className={styles.tech}>+{project.tech.length - 4}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId !== null && selectedProject && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Prevent clicking inside modal from closing it
            >
              <div className={styles.modalHeader}>
                <div>
                  <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                  <div className={styles.modalCompany}>
                    {selectedProject.company} &mdash; {selectedProject.date}
                  </div>
                </div>
                <button 
                  className={styles.closeBtn} 
                  onClick={() => setSelectedId(null)}
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className={styles.modalBody}>
                <ul className={styles.descriptionList}>
                  {selectedProject.description.map((item, i) => (
                    <li key={i} className={styles.descriptionItem}>{item}</li>
                  ))}
                </ul>

                <div className={styles.modalTechStack}>
                  {selectedProject.tech.map((t, index) => (
                    <span key={index} className={styles.modalTech}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
