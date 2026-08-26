"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Scroll event for navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for scroll animations
    const revealElements = document.querySelectorAll(".project-card, .section-header, .box-glass");

    const revealOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = "1";
          (entry.target as HTMLElement).style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    }, revealOptions);

    revealElements.forEach(el => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(30px)";
      (el as HTMLElement).style.transition = "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Background Elements */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      <div className="bg-shape shape-3"></div>

      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`} id="navbar">
        <div className="container nav-container">
          <Link href="#" className="logo">
            GAMUR<span>.</span>
          </Link>
          <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            <li><a href="#home" onClick={closeMenu}>Inicio</a></li>
            <li><a href="#about" onClick={closeMenu}>Sobre Mí</a></li>
            <li><a href="#projects" onClick={closeMenu}>Proyectos</a></li>
            <li><a href="#contact" onClick={closeMenu}>Contacto</a></li>
          </ul>
          <div className="hamburger" onClick={toggleMenu}>
            <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <p className="subtitle">Hola, soy</p>
            <h1 className="title">Gamur</h1>
            <h2 className="role">Ingeniero de Software <span>& Quant Developer</span></h2>
            <p className="description">
              Especializado en la creación de motores de alto rendimiento, análisis de datos, inteligecia artificial y arquitecturas complejas de aplicaciones modernas y backend.
            </p>
            <div className="hero-btns">
              <a href="#projects" className="btn btn-primary">Ver Mis 7 Proyectos <i className="fas fa-arrow-right"></i></a>
              <a href="#contact" className="btn btn-outline">Contáctame</a>
            </div>
            <div className="social-links">
              <a href="https://github.com/gamurigm" target="_blank" rel="noopener noreferrer" title="GitHub"><i className="fab fa-github"></i></a>
              <a href="#" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" title="Twitter"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-element el-1">
              <i className="fas fa-code"></i>
              <span>Python, C++ & JS</span>
            </div>
            <div className="floating-element el-2">
              <i className="fas fa-chart-line"></i>
              <span>Data & Quant</span>
            </div>
            <div className="floating-element el-3">
              <i className="fas fa-mobile-alt"></i>
              <span>Mobile & UI/UX</span>
            </div>
            <div className="hero-image-wrapper">
              <div className="abstract-sphere"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <div className="section-header">
            <h2>Mis Proyectos Key</h2>
            <p>Una selección de mis 7 repositorios de GitHub más importantes: sistemas distribuidos, IA, ciberseguridad y plataformas cloud-native.</p>
          </div>

          <div className="projects-grid">
            {/* Project 1: AssetManager */}
            <article className="project-card">
              <div className="project-image">
                <Image src="/assets/ai_portfolio_chatbot.png" alt="AssetManager" fill style={{ objectFit: "cover" }} />
                <div className="project-overlay">
                  <a href="https://github.com/gamurigm/AssetManager" target="_blank" rel="noopener noreferrer" className="view-btn"><i className="fas fa-external-link-alt"></i></a>
                </div>
              </div>
              <div className="project-info">
                <div className="tags">
                  <span>C++</span>
                  <span>Python</span>
                  <span>Finance</span>
                </div>
                <h3><a href="https://github.com/gamurigm/AssetManager" target="_blank" rel="noopener noreferrer">Asset Manager & AI</a></h3>
                <p>Gestión de carteras financieras con motores C++ e IA para análisis predictivo cuantitativo.</p>
              </div>
            </article>

            {/* Project 2: SciMind */}
            <article className="project-card">
              <div className="project-image">
                <Image src="/assets/scimind.png" alt="SciMind" fill style={{ objectFit: "cover" }} />
                <div className="project-overlay">
                  <a href="https://github.com/gamurigm/SciMind" target="_blank" rel="noopener noreferrer" className="view-btn"><i className="fas fa-external-link-alt"></i></a>
                </div>
              </div>
              <div className="project-info">
                <div className="tags">
                  <span>LangChain</span>
                  <span>OpenAI</span>
                  <span>FastAPI</span>
                </div>
                <h3><a href="https://github.com/gamurigm/SciMind" target="_blank" rel="noopener noreferrer">SciMind</a></h3>
                <p>Agente inteligente para investigación científica y gestión de conocimiento con LLMs.</p>
              </div>
            </article>

            {/* Project 3: pySentinel_SOC5 */}
            <article className="project-card">
              <div className="project-image">
                <Image src="/assets/pysentinel_soc.png" alt="pySentinel_SOC5" fill style={{ objectFit: "cover" }} />
                <div className="project-overlay">
                  <a href="https://github.com/gamurigm/pySentinel_SOC5" target="_blank" rel="noopener noreferrer" className="view-btn"><i className="fas fa-external-link-alt"></i></a>
                </div>
              </div>
              <div className="project-info">
                <div className="tags">
                  <span>SOC</span>
                  <span>Wazuh</span>
                  <span>Docker</span>
                </div>
                <h3><a href="https://github.com/gamurigm/pySentinel_SOC5" target="_blank" rel="noopener noreferrer">pySentinel SOC5</a></h3>
                <p>Detección de amenazas con Wazuh, Suricata y Velociraptor para monitoreo en tiempo real.</p>
              </div>
            </article>

            {/* Project 4: Master Gateway Auth */}
            <article className="project-card">
              <div className="project-image">
                <Image src="/assets/cyberpunk_music_player.png" alt="Master Gateway Auth" fill style={{ objectFit: "cover" }} />
                <div className="project-overlay">
                  <a href="https://github.com/gamurigm/master-gateway-auth" target="_blank" rel="noopener noreferrer" className="view-btn"><i className="fas fa-external-link-alt"></i></a>
                </div>
              </div>
              <div className="project-info">
                <div className="tags">
                  <span>NestJS</span>
                  <span>TypeScript</span>
                  <span>Vue 3</span>
                </div>
                <h3><a href="https://github.com/gamurigm/master-gateway-auth" target="_blank" rel="noopener noreferrer">Master Gateway Auth</a></h3>
                <p>Gateway de autenticación y autorización centralizada con RBAC, menús dinámicos y proxy seguro para microservicios Zero Trust.</p>
              </div>
            </article>

            {/* Project 5: SpeechNotes */}
            <article className="project-card">
              <div className="project-image">
                <Image src="/assets/speechnotes.png" alt="SpeechNotes" fill style={{ objectFit: "cover" }} />
                <div className="project-overlay">
                  <a href="https://github.com/gamurigm/SpeechNotes" target="_blank" rel="noopener noreferrer" className="view-btn"><i className="fas fa-external-link-alt"></i></a>
                </div>
              </div>
              <div className="project-info">
                <div className="tags">
                  <span>Whisper</span>
                  <span>AI</span>
                  <span>Python</span>
                </div>
                <h3><a href="https://github.com/gamurigm/SpeechNotes" target="_blank" rel="noopener noreferrer">SpeechNotes</a></h3>
                <p>Transcriptor y resumidor inteligente de notas de voz con modelos SOTA.</p>
              </div>
            </article>

            {/* Project 6: SymptoLeaf */}
            <article className="project-card">
              <div className="project-image">
                <Image src="/assets/symptoleaf.png" alt="SymptoLeaf" fill style={{ objectFit: "cover" }} />
                <div className="project-overlay">
                  <a href="https://github.com/gamurigm/backend-login_SymtoLeaf" target="_blank" rel="noopener noreferrer" className="view-btn"><i className="fas fa-external-link-alt"></i></a>
                </div>
              </div>
              <div className="project-info">
                <div className="tags">
                  <span>PyTorch</span>
                  <span>Computer Vision</span>
                  <span>Edge Computing</span>
                </div>
                <h3><a href="https://github.com/gamurigm/backend-login_SymtoLeaf" target="_blank" rel="noopener noreferrer">SymptoLeaf</a></h3>
                <p>Detector de enfermedades agrícolas mediante visión artificial y optimización ONNX.</p>
              </div>
            </article>

            {/* Project 7: Inventrack PTES Report */}
            <article className="project-card">
              <div className="project-image">
                <Image src="/assets/planing_app.png" alt="Inventrack PTES Report" fill style={{ objectFit: "cover" }} />
                <div className="project-overlay">
                  <a href="https://github.com/gamurigm/inventrack-ptes-report" target="_blank" rel="noopener noreferrer" className="view-btn"><i className="fas fa-external-link-alt"></i></a>
                </div>
              </div>
              <div className="project-info">
                <div className="tags">
                  <span>Kubernetes</span>
                  <span>Docker</span>
                  <span>OWASP ZAP</span>
                </div>
                <h3><a href="https://github.com/gamurigm/inventrack-ptes-report" target="_blank" rel="noopener noreferrer">Inventrack PTES Report</a></h3>
                <p>Informe técnico de pentesting sobre Inventrack en Kubernetes, con evidencias, análisis de vulnerabilidades y validación de controles de seguridad.</p>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* CTA / Contact */}
      <section id="contact" className="contact">
        <div className="container contact-container box-glass">
          <div className="contact-content">
            <h2>¿Listo para innovar?</h2>
            <p>Si buscas soluciones escalables en trading algorítmico, desarrollo backend o inteligencia artificial, conversemos.</p>
          </div>
          <a href="mailto:example@gmail.com" className="btn btn-primary btn-large">Hablemos <i className="fas fa-paper-plane"></i></a>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container footer-container">
          <div className="footer-logo">GAMUR<span>.</span></div>
          <p>&copy; 2026 Gamur. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}
