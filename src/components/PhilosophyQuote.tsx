"use client";

import { motion } from "framer-motion";
import styles from "./PhilosophyQuote.module.css";

export default function PhilosophyQuote() {
  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.quoteWrapper}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.line} />
        
        <motion.div 
          className={styles.quoteContent}
          animate={{ 
            opacity: [1, 0.5, 1],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <div className={styles.quoteBox}>
            <p className={styles.quoteText}>
              <span className={styles.quoteIcon}>“</span>
              I measure my success by the knowledge I share, not the knowledge I keep.
              <span className={styles.quoteIconEnd}>”</span>
            </p>
          </div>
        </motion.div>

        <div className={styles.line} />
      </motion.div>
    </div>
  );
}
