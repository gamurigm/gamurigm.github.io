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
            <p>Una selección de mis 7 repositorios de GitHub más importantes que reflejan soluciones prácticas, IA, ciberseguridad y UI/UX.</p>
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
                  <span>FastAPI</span>
                  <span>React/NextJS</span>
                  <span>C++ Engine</span>
                </div>
                <h3>Asset Manager & AI</h3>
                <p>Aplicación de gestión de portafolios y activos potenciada por una infraestructura C++ y un bot o sistema inteligente para análisis financiero.</p>
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
                  <span>AI/ML</span>
                  <span>Python</span>
                  <span>NLP</span>
                </div>
                <h3>SciMind</h3>
                <p>Asistente de inteligencia artificial y sistema de procesamiento de lenguaje enfocado en análisis científico, conocimiento y parsing de datos.</p>
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
                  <span>Cybersecurity</span>
                  <span>Python</span>
                  <span>SOC</span>
                </div>
                <h3>pySentinel SOC5</h3>
                <p>Herramienta y dashboard de ciberseguridad diseñado para ser integrado en Operaciones de Centro de Seguridad (SOC), con monitorización proactiva.</p>
              </div>
            </article>

            {/* Project 4: Music Player Flutter */}
            <article className="project-card">
              <div className="project-image">
                <Image src="/assets/cyberpunk_music_player.png" alt="Music Player Flutter" fill style={{ objectFit: "cover" }} />
                <div className="project-overlay">
                  <a href="#" className="view-btn"><i className="fas fa-external-link-alt"></i></a>
                </div>
              </div>
              <div className="project-info">
                <div className="tags">
                  <span>Flutter</span>
                  <span>Mobile App</span>
                  <span>Audio UI</span>
                </div>
                <h3>Cyber Music Player</h3>
                <p>Reproductor de música robusto y moderno para dispositivos móviles desarrollado nativamente en Flutter, destacado por una interfaz fluida e inmersiva.</p>
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
                  <span>Voice-to-Text</span>
                  <span>Utility UX</span>
                  <span>Tools</span>
                </div>
                <h3>SpeechNotes</h3>
                <p>Aplicación diseñada para máxima productividad, permitiendo transcribir voz a texto rápidamente con una interfaz limpia, enfocada en la usabilidad.</p>
              </div>
            </article>

            {/* Project 6: SymptoLeaf */}
            <article className="project-card">
              <div className="project-image">
                <Image src="/assets/symptoleaf.png" alt="SymptoLeaf" fill style={{ objectFit: "cover" }} />
                <div className="project-overlay">
                  <a href="https://github.com/gamurigm/SymptoLeaf" target="_blank" rel="noopener noreferrer" className="view-btn"><i className="fas fa-external-link-alt"></i></a>
                </div>
              </div>
              <div className="project-info">
                <div className="tags">
                  <span>Computer Vision</span>
                  <span>Colaboración</span>
                  <span>Health</span>
                </div>
                <h3>SymptoLeaf</h3>
                <p>Plataforma para el escaneo y diagnóstico instantáneo de síntomas y enfermedades en hojas de plantas usando visión por computadora e inteligencia artificial.</p>
              </div>
            </article>

            {/* Project 7: Planing_App */}
            <article className="project-card">
              <div className="project-image">
                <Image src="/assets/planing_app.png" alt="Planing_App" fill style={{ objectFit: "cover" }} />
                <div className="project-overlay">
                  <a href="https://github.com/gamurigm/Planing_App" target="_blank" rel="noopener noreferrer" className="view-btn"><i className="fas fa-external-link-alt"></i></a>
                </div>
              </div>
              <div className="project-info">
                <div className="tags">
                  <span>Productivity</span>
                  <span>Frontend</span>
                  <span>UX Design</span>
                </div>
                <h3>Planning App</h3>
                <p>Tablero de organización personal y sistema de agenda, enfocado en maximizar el seguimiento de tareas con un diseño atractivo e interacciones pulidas.</p>
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
