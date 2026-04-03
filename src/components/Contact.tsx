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
          {/* GitHub */}
          <a href="https://github.com/Solairajan18" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="GitHub">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
          
          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/solai-rajan/" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="LinkedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          
          {/* Instagram */}
          <a href="https://www.instagram.com/solai.kamaraj" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="Instagram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          
          {/* Medium */}
          <a href="https://solairajan18.medium.com/" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="Medium">
            <svg viewBox="0 0 1043.63 592.71" width="24" height="24" fill="currentColor"><path d="M585.24 296.36c0 163.62-131 296.35-292.62 296.35S0 459.98 0 296.36 131 0 292.62 0s292.62 132.73 292.62 296.36zM927.37 296.36c0 151.11-65.49 273.61-146.28 273.61s-146.28-122.5-146.28-273.61 65.49-273.61 146.28-273.61 146.28 122.5 146.28 273.61zM1043.63 296.36c0 138-23.17 249.91-51.76 249.91s-51.76-111.91-51.76-249.91 23.17-249.91 51.76-249.91 51.76 111.91 51.76 249.91z"/></svg>
          </a>
          
          {/* Linktree */}
          <a href="https://linktr.ee/solairajan" target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="Linktree">
            <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor"><path d="m15.7603 6.829 4.6725-4.80317 2.712 2.77734-4.9012 4.67248h6.8944v3.85565h-6.9271l4.9339 4.7922-2.712 2.7229-6.6983-6.731-6.69829 6.731-2.712-2.712 4.93387-4.7923h-6.92703v-3.86645h6.89436l-4.9012-4.67248 2.712-2.77734 4.67249 4.80317v-6.829h4.0516zm-4.0516 12.0243h4.0516v9.1489h-4.0516z" /></svg>
          </a>

          {/* Email */}
          <a href="mailto:solairajan18@gmail.com" className={styles.iconLink} aria-label="Email">
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
