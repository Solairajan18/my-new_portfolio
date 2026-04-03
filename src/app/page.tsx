import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import WeekendProjects from "@/components/WeekendProjects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Projects />
        <WeekendProjects />
        <Certifications />
        <Contact />
      </main>
      
      <Chatbot />
      
      <footer style={{ textAlign: "center", padding: "2rem", borderTop: "1px solid var(--card-border)", color: "var(--text-muted)", fontSize: "0.9rem" }}>
        <p>© {new Date().getFullYear()} Solai Rajan. Built with Next.js & Framer Motion.</p>
      </footer>
    </>
  );
}
