"use client";

import { type MouseEvent, useEffect, useState } from "react";
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

  const scrollToContact = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    closeMenu();
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
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
            <li><a href="#contact" onClick={scrollToContact}>Contacto</a></li>
          </ul>
          <div className="hamburger" onClick={toggleMenu}>
            <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container hero-container">
          <div className="hero-content" id="about">
            <p className="subtitle">Hola, soy</p>
            <h1 className="title">Gabriel Murillo</h1>
            <h2 className="role">Ingeniero de Software <span>& Full Stack Developer</span></h2>
            <p className="description">
              Desarrollo soluciones web y backend, con interés en inteligencia artificial, análisis de datos, ciberseguridad y arquitecturas de aplicaciones modernas.
            </p>
            <div className="hero-btns">
              <a href="#projects" className="btn btn-primary">Ver Mis 9 Proyectos <i className="fas fa-arrow-right"></i></a>
            </div>
            <div className="social-links">
              <a href="https://github.com/gamurigm" target="_blank" rel="noopener noreferrer" title="GitHub"><i className="fab fa-github"></i></a>
              <a href="https://www.linkedin.com/in/gmurillo-medina/" target="_blank" rel="noopener noreferrer" title="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-element el-1">
              <i className="fas fa-code"></i>
              <span>Python, C++ & TS</span>
            </div>
            <div className="floating-element el-2">
              <i className="fas fa-chart-line"></i>
              <span>Data & AI</span>
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
            <h2>Mis 9 Proyectos Key</h2>
            <p>Una selección de mis 9 repositorios de GitHub más importantes: sistemas distribuidos, IA, ciberseguridad y plataformas cloud-native.</p>
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
                  <span>Suricata &amp; Zeek</span>
                  <span>NVIDIA NIM</span>
                  <span>PostgreSQL</span>
                </div>
                <h3><a href="https://github.com/gamurigm/pySentinel_SOC5" target="_blank" rel="noopener noreferrer">pySentinel SOC5</a></h3>
                <p>Plataforma SOC/IDS con respuesta automatizada, telemetría multi-herramienta e IA para detección y análisis de amenazas en tiempo real.</p>
              </div>
            </article>

            {/* Project 4: Master Gateway Auth */}
            <article className="project-card">
              <div className="project-image">
                <Image src="/assets/master-gateway-auth.svg" alt="Master Gateway Auth" fill style={{ objectFit: "cover" }} />
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
                <Image src="/assets/inventrack-ptes-report.svg" alt="Inventrack PTES Report" fill style={{ objectFit: "cover" }} />
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

            {/* Project 8: Federated API Gateway */}
            <article className="project-card">
              <div className="project-image">
                <Image src="/assets/federated-api-gateway.svg" alt="Federated API Gateway" fill style={{ objectFit: "cover" }} />
                <div className="project-overlay">
                  <a href="https://github.com/gamurigm/API_Server" target="_blank" rel="noopener noreferrer" className="view-btn"><i className="fas fa-external-link-alt"></i></a>
                </div>
              </div>
              <div className="project-info">
                <div className="tags">
                  <span>Next.js</span>
                  <span>Supabase</span>
                  <span>JWT RS256</span>
                </div>
                <h3><a href="https://github.com/gamurigm/API_Server" target="_blank" rel="noopener noreferrer">Federated API Gateway</a></h3>
                <p>Gateway serverless para integrar APIs externas con autenticación RS256/JWKS y credenciales de upstream protegidas.</p>
              </div>
            </article>

            {/* Project 9: DeepSeek R1 RAG */}
            <article className="project-card">
              <div className="project-image">
                <Image src="/assets/deepseek-r1-rag.svg" alt="DeepSeek R1 RAG" fill style={{ objectFit: "cover" }} />
                <div className="project-overlay">
                  <a href="https://github.com/gamurigm/deepSeek_r1_distill_RAG" target="_blank" rel="noopener noreferrer" className="view-btn"><i className="fas fa-external-link-alt"></i></a>
                </div>
              </div>
              <div className="project-info">
                <div className="tags">
                  <span>DeepSeek R1</span>
                  <span>LangChain</span>
                  <span>ChromaDB</span>
                </div>
                <h3><a href="https://github.com/gamurigm/deepSeek_r1_distill_RAG" target="_blank" rel="noopener noreferrer">DeepSeek R1 RAG</a></h3>
                <p>Sistema multiagente de QA/RAG que transforma documentos PDF en una base de conocimiento consultable.</p>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact">
        <div className="container footer-container">
          <div className="footer-logo">GAMUR<span>.</span></div>
          <div className="footer-contact">
            <a href="tel:+593984919443"><i className="fas fa-phone"></i> 0984919443</a>
            <a href="mailto:gamurigm@gmail.com"><i className="fas fa-envelope"></i> gamurigm@gmail.com</a>
            <a href="https://www.linkedin.com/in/gmurillo-medina/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i> LinkedIn</a>
          </div>
        </div>
      </footer>
    </>
  );
}
