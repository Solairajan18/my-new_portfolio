"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import styles from "./Chatbot.module.css";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Hi! I'm the AI assistant. Ask me anything about my cloud experience or projects!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(["Experience?", "Projects?", "Skills?", "Certifications?", "Contact?"]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSend = async (e?: React.FormEvent, text?: string) => {
    if (e) e.preventDefault();
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setSuggestions([]); // Clear suggestions while loading
    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL;
      const apiKey = process.env.NEXT_PUBLIC_CHATBOT_API_KEY;

      if (!apiUrl) {
        throw new Error("Chatbot API URL is not configured.");
      }

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-api-key": apiKey || "" 
        },
        body: JSON.stringify({ message: messageText })
      });

      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      const data = await res.json();
      const replyText = data.reply ?? data.message ?? data.response ?? "I didn't get a response, please try again.";

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: replyText
      }]);

      // Add follow-up suggestions
      setSuggestions(["Projects?", "Certifications?", "Contact?", "Skills?"]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "assistant",
        content: "Sorry, I'm having trouble connecting to my backend right now. Please try again!"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = (content: string) => {
    // Regex for URLs and Emails (refined to exclude trailing punctuation)
    const urlRegex = /(https?:\/\/[^\s]+?)(?=[.,?!]?(?:\s|$))/g;
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+?)(?=[.,?!]?(?:\s|$))/g;
    
    const parts = content.split(/(\*\*.*?\*\*|(?:https?:\/\/[^\s]+?|[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+?)(?=[.,?!]?(?:\s|$)))/g);
    
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      if (part.match(urlRegex)) {
        return <a key={i} href={part} target="_blank" rel="noopener noreferrer">{part}</a>;
      }
      if (part.match(emailRegex)) {
        return <a key={i} href={`mailto:${part}`}>{part}</a>;
      }
      return part;
    });
  };

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.chatWindow}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20, transition: { duration: 0.2 } }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                <Bot size={20} style={{ color: "var(--accent-color)" }} />
                <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Sol</span><span style={{ color: 'var(--accent-color)', fontWeight: 700 }}>AI</span>
              </div>
              <button onClick={toggleChat} className={styles.closeBtn} aria-label="Close Chat">
                <X size={20} />
              </button>
            </div>

            <div className={styles.messages}>
              {messages.map((m) => (
                <div 
                  key={m.id} 
                  className={`${styles.message} ${m.role === "user" ? styles.userMessage : styles.botMessage}`}
                >
                  {renderContent(m.content)}
                </div>
              ))}
              
              {isLoading && (
                <div className={`${styles.message} ${styles.botMessage} ${styles.typingIndicator}`}>
                  <div className={styles.dot}></div>
                  <div className={styles.dot}></div>
                  <div className={styles.dot}></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {suggestions.length > 0 && (
              <div className={styles.suggestionsContainer}>
                {suggestions.map((suggestion, i) => (
                  <motion.button
                    key={i}
                    className={styles.suggestionChip}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleSend(undefined, suggestion)}
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            )}

            <form onSubmit={handleSend} className={styles.inputArea}>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..." 
                className={styles.input}
                disabled={isLoading}
              />
              <button type="submit" className={styles.sendBtn} disabled={!input.trim() || isLoading} aria-label="Send">
                <Send size={16} />
              </button>
            </form>
            <div className={styles.footer}>
              Powered by <span>SolAI</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <motion.button 
            className={styles.fab} 
            onClick={toggleChat}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Open Chat"
          >
            <MessageSquare size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
