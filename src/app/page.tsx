"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Project = {
  title: string;
  description: string;
  href: string;
  image: string;
  tags: string[];
  categories: string[];
  featured?: boolean;
};

const filters = ["Todos", "IA", "Seguridad", "Sistemas", "Datos"];

const projects: Project[] = [
  {
    title: "Asset Manager & AI",
    description: "Gestión de carteras financieras con motores C++ e IA para análisis predictivo cuantitativo.",
    href: "https://github.com/gamurigm/AssetManager",
    image: "/assets/ai_portfolio_chatbot.png",
    tags: ["C++", "Python", "Finance"],
    categories: ["IA", "Sistemas", "Datos"],
    featured: true,
  },
  {
    title: "SciMind",
    description: "Agente inteligente para investigación científica y gestión de conocimiento con LLMs.",
    href: "https://github.com/gamurigm/SciMind",
    image: "/assets/scimind.png",
    tags: ["LangChain", "OpenAI", "FastAPI"],
    categories: ["IA", "Datos"],
    featured: true,
  },
  {
    title: "pySentinel SOC5",
    description: "Plataforma SOC e IDS con telemetría multi-herramienta e IA para detectar amenazas en tiempo real.",
    href: "https://github.com/gamurigm/pySentinel_SOC5",
    image: "/assets/pysentinel_soc.png",
    tags: ["Suricata & Zeek", "NVIDIA NIM", "PostgreSQL"],
    categories: ["Seguridad", "IA", "Datos"],
  },
  {
    title: "Master Gateway Auth",
    description: "Gateway centralizado con RBAC, menús dinámicos y proxy seguro para microservicios Zero Trust.",
    href: "https://github.com/gamurigm/master-gateway-auth",
    image: "/assets/master-gateway-auth.svg",
    tags: ["NestJS", "TypeScript", "Vue 3"],
    categories: ["Sistemas", "Seguridad"],
  },
  {
    title: "SpeechNotes",
    description: "Transcripción y organización de notas de voz con una experiencia rápida, privada y asistida por IA.",
    href: "https://github.com/gamurigm/SpeechNotes",
    image: "/assets/speechnotes.png",
    tags: ["Whisper", "AI", "Python"],
    categories: ["IA", "Datos"],
  },
  {
    title: "SymptoLeaf",
    description: "Visión por computador para identificar síntomas en hojas y acelerar decisiones en agricultura.",
    href: "https://github.com/gamurigm/backend-login_SymtoLeaf",
    image: "/assets/symptoleaf.png",
    tags: ["PyTorch", "Computer Vision", "Edge Computing"],
    categories: ["IA", "Datos"],
  },
  {
    title: "Inventrack PTES Report",
    description: "Plataforma cloud-native para documentar pruebas de penetración y convertir hallazgos en acciones claras.",
    href: "https://github.com/gamurigm/inventrack-ptes-report",
    image: "/assets/inventrack-ptes-report.svg",
    tags: ["Kubernetes", "Docker", "OWASP ZAP"],
    categories: ["Seguridad", "Sistemas"],
  },
  {
    title: "Federated API Gateway",
    description: "Capa de integración segura con autenticación federada, políticas de acceso y servicios desacoplados.",
    href: "https://github.com/gamurigm/federated-api-gateway",
    image: "/assets/federated-api-gateway.svg",
    tags: ["Next.js", "Supabase", "JWT RS256"],
    categories: ["Sistemas", "Seguridad"],
  },
  {
    title: "DeepSeek R1 RAG",
    description: "Pipeline de recuperación aumentada para consultar conocimiento propio con precisión y contexto.",
    href: "https://github.com/gamurigm/deepseek-r1-rag",
    image: "/assets/deepseek-r1-rag.svg",
    tags: ["DeepSeek R1", "LangChain", "ChromaDB"],
    categories: ["IA", "Datos"],
  },
];

function closeMenu(setIsMenuOpen: (value: boolean) => void) {
  setIsMenuOpen(false);
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const visibleProjects = projects.filter(
    (project) => activeFilter === "Todos" || project.categories.includes(activeFilter),
  );

  return (
    <>
      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>

      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#home" aria-label="Gabriel Murillo, inicio">
            GM<span>.</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>

          <nav
            className={`primary-nav ${isMenuOpen ? "is-open" : ""}`}
            id="primary-navigation"
            aria-label="Navegación principal"
          >
            <a href="#home" onClick={() => closeMenu(setIsMenuOpen)}>
              Inicio
            </a>
            <a href="#about" onClick={() => closeMenu(setIsMenuOpen)}>
              Sobre mí
            </a>
            <a href="#projects" onClick={() => closeMenu(setIsMenuOpen)}>
              Proyectos
            </a>
            <a className="nav-contact" href="#contact" onClick={() => closeMenu(setIsMenuOpen)}>
              Hablemos <span aria-hidden="true">↗</span>
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="shell hero-grid">
            <div className="hero-copy" id="about">
              <p className="eyebrow">Gabriel Murillo / Software Engineer</p>
              <h1 id="hero-title">
                Construyo sistemas que <span>hacen avanzar</span> ideas ambiciosas.
              </h1>
              <p className="hero-description">
                Ingeniería de software, inteligencia artificial y plataformas seguras para convertir problemas complejos en productos claros.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  Ver proyectos <span aria-hidden="true">↘</span>
                </a>
                <a className="button button-quiet" href="mailto:gabriel.murillo@unl.edu.ec">
                  Contactar
                </a>
              </div>

              <div className="social-links" aria-label="Perfiles profesionales">
                <a href="https://github.com/gamurigm" target="_blank" rel="noopener noreferrer">
                  GitHub <span aria-hidden="true">↗</span>
                </a>
                <a href="https://www.linkedin.com/in/gmurillo-medina/" target="_blank" rel="noopener noreferrer">
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            <figure className="hero-visual">
              <Image
                src="/assets/hero-systems.png"
                alt="Visual abstracto de sistemas de software conectados en una arquitectura de datos"
                fill
                priority
                sizes="(max-width: 760px) 100vw, 52vw"
              />
              <figcaption>Arquitecturas que conectan datos, producto y negocio.</figcaption>
            </figure>
          </div>
        </section>

        <section className="work-section" id="projects" aria-labelledby="projects-title">
          <div className="shell">
            <div className="section-intro">
              <div>
                <p className="section-index">01 / Trabajo seleccionado.</p>
                <h2 id="projects-title">Ideas convertidas en sistemas que funcionan.</h2>
              </div>
              <p>
                Una selección de proyectos donde producto, datos e ingeniería se encuentran para resolver problemas reales.
              </p>
            </div>

            <div className="project-filters" role="group" aria-label="Filtrar proyectos por área">
              {filters.map((filter) => (
                <button
                  className={activeFilter === filter ? "is-active" : ""}
                  key={filter}
                  type="button"
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <p className="results-status" role="status" aria-live="polite">
              {visibleProjects.length} {visibleProjects.length === 1 ? "proyecto visible" : "proyectos visibles"}
            </p>

            <div className="projects-grid">
              {visibleProjects.map((project) => (
                <article className={`project-card ${project.featured ? "project-card-featured" : ""}`} key={project.title}>
                  <a className="project-media" href={project.href} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={project.image}
                      alt={`Vista previa de ${project.title}`}
                      fill
                      sizes={project.featured ? "(max-width: 760px) 100vw, 50vw" : "(max-width: 760px) 100vw, 33vw"}
                    />
                    <span className="project-link" aria-hidden="true">↗</span>
                  </a>

                  <div className="project-content">
                    <ul className="project-tags" aria-label={`Tecnologías de ${project.title}`}>
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <h3>
                      <a href={project.href} target="_blank" rel="noopener noreferrer">
                        {project.title}
                      </a>
                    </h3>
                    <p>{project.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="statement-section" aria-labelledby="statement-title">
          <div className="shell statement-grid">
            <p className="section-index">02 / Forma de trabajar</p>
            <div>
              <h2 id="statement-title">Precisión técnica. Curiosidad constante. Resultados que se sienten simples.</h2>
              <p>
                Me gusta trabajar cerca del problema: entender el contexto, diseñar una base sólida y dejar una experiencia que se sienta inevitablemente clara.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div className="shell footer-grid">
          <div>
            <p className="section-index">03 / Contacto</p>
            <h2>¿Tienes un problema interesante?</h2>
          </div>
          <div className="footer-contact">
            <p>Hablemos sobre una idea, un producto o un sistema que merezca ser construido.</p>
            <a className="footer-email" href="mailto:gabriel.murillo@unl.edu.ec">
              gabriel.murillo@unl.edu.ec <span aria-hidden="true">↗</span>
            </a>
            <p className="footer-meta">© {new Date().getFullYear()} Gabriel Murillo</p>
          </div>
        </div>
      </footer>
    </>
  );
}
