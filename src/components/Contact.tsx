"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Briefcase, Mail, MessageCircle, CheckCircle2 } from "lucide-react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Custom Validation
    const formData = new FormData(e.currentTarget);
    const newErrors: { [key: string]: string } = {};
    
    const name = formData.get("entry.2005620554") as string;
    const email = formData.get("entry.1045781291") as string;
    const subject = formData.get("entry.1065046570") as string;
    const message = formData.get("entry.1166974658") as string;
    
    if (!name || name.trim() === "") newErrors.name = "Please enter your name";
    if (!email || email.trim() === "") {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!subject || subject.trim() === "") newErrors.subject = "Please enter a subject";
    if (!message || message.trim() === "") newErrors.message = "Please enter a message";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setIsSubmitting(true);

    try {
      await fetch("https://docs.google.com/forms/u/0/d/e/1FAIpQLSfPLlt-WYPMHcCRsRIOEYpXYlZdo9-Mu41EpkZ92HWi8DZNXg/formResponse", {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting form", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-container" id="contact">
      <div className={styles.contact}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.h2>

        {/* <motion.p 
          className={styles.text}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, 
          I'll try my best to get back to you!
        </motion.p> */}

        <motion.div 
          className={styles.socials}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <a href="#" className={styles.iconLink} aria-label="GitHub">
            <Code2 size={24} />
          </a>
          <a href="#" className={styles.iconLink} aria-label="LinkedIn">
            <Briefcase size={24} />
          </a>
          <a href="#" className={styles.iconLink} aria-label="Twitter">
            <MessageCircle size={24} />
          </a>
          <a href="#" className={styles.iconLink} aria-label="Email">
            <Mail size={24} />
          </a>
        </motion.div>

        {!isSubmitted ? (
          <motion.form 
            className={styles.form}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            noValidate // Disables the default browser HTML5 tooltips
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>Your Name</label>
                <input 
                  type="text" 
                  name="entry.2005620554" 
                  id="name" 
                  className={styles.input} 
                  placeholder="First Last" 
                  style={errors.name ? { borderColor: '#ef4444' } : {}}
                  onChange={() => setErrors({ ...errors, name: '' })}
                />
                {errors.name && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '-0.25rem' }}>{errors.name}</span>}
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>Your Email</label>
                <input 
                  type="email" 
                  name="entry.1045781291" 
                  id="email" 
                  className={styles.input} 
                  placeholder="you@example.com" 
                  style={errors.email ? { borderColor: '#ef4444' } : {}}
                  onChange={() => setErrors({ ...errors, email: '' })}
                />
                {errors.email && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '-0.25rem' }}>{errors.email}</span>}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="subject" className={styles.label}>Subject</label>
              <input 
                type="text" 
                name="entry.1065046570" 
                id="subject" 
                className={styles.input} 
                placeholder="What is this regarding?" 
                style={errors.subject ? { borderColor: '#ef4444' } : {}}
                onChange={() => setErrors({ ...errors, subject: '' })}
              />
              {errors.subject && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '-0.25rem' }}>{errors.subject}</span>}
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="message" className={styles.label}>Message</label>
              <textarea 
                name="entry.1166974658" 
                id="message" 
                className={styles.textarea} 
                placeholder="Leave a message here..." 
                style={{ height: '180px', ...(errors.message ? { borderColor: '#ef4444' } : {}) }}
                onChange={() => setErrors({ ...errors, message: '' })}
              ></textarea>
              {errors.message && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '-0.25rem' }}>{errors.message}</span>}
            </div>
            
            <button type="submit" className="glass-button primary" disabled={isSubmitting} style={{ marginTop: '0.5rem', width: '100%', opacity: isSubmitting ? 0.7 : 1 }}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        ) : (
          <motion.div
            className={styles.form}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              textAlign: 'center',
              minHeight: '400px'
            }}
          >
            <CheckCircle2 size={64} style={{ color: '#10B981', margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>Message Sent!</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Thank you for reaching out. I will get back to you as soon as possible.</p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="glass-button secondary" 
              style={{ marginTop: '1.5rem' }}
            >
              Send Another Message
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
