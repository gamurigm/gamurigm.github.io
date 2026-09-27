"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { startHeroField } from "./hero-field";

type Project = {
  title: string;
  description: string;
  href: string;
  image: string;
  tags: string[];
  categories: string[];
  mosaic: "feature" | "secondary" | "wide" | "tall" | "square" | "small";
  featured?: boolean;
};

const fragmentGrid = Array.from({ length: 16 }, (_, index) => ({
  column: index % 4,
  index,
  row: Math.floor(index / 4),
}));

const filters = ["Todos", "IA", "Seguridad", "Sistemas", "Datos"];

const projects: Project[] = [
  {
    title: "Asset Manager & AI",
    description: "Gestión de carteras financieras con motores C++ e IA para análisis predictivo cuantitativo.",
    href: "https://github.com/gamurigm/AssetManager",
    image: "/assets/ai_portfolio_chatbot.png",
    tags: ["C++", "Python", "Finance"],
    categories: ["IA", "Sistemas", "Datos"],
    mosaic: "feature",
    featured: true,
  },
  {
    title: "SciMind",
    description: "Agente inteligente para investigación científica y gestión de conocimiento con LLMs.",
    href: "https://github.com/gamurigm/SciMind",
    image: "/assets/scimind.png",
    tags: ["LangChain", "OpenAI", "FastAPI"],
    categories: ["IA", "Datos"],
    mosaic: "secondary",
    featured: true,
  },
  {
    title: "pySentinel SOC5",
    description: "Plataforma SOC e IDS con telemetría multi-herramienta e IA para detectar amenazas en tiempo real.",
    href: "https://github.com/gamurigm/pySentinel_SOC5",
    image: "/assets/pysentinel_soc.png",
    tags: ["Suricata & Zeek", "NVIDIA NIM", "PostgreSQL"],
    categories: ["Seguridad", "IA", "Datos"],
    mosaic: "wide",
  },
  {
    title: "Master Gateway Auth",
    description: "Gateway centralizado con RBAC, menús dinámicos y proxy seguro para microservicios Zero Trust.",
    href: "https://github.com/gamurigm/master-gateway-auth",
    image: "/assets/master-gateway-auth.svg",
    tags: ["NestJS", "TypeScript", "Vue 3"],
    categories: ["Sistemas", "Seguridad"],
    mosaic: "small",
  },
  {
    title: "SpeechNotes",
    description: "Transcripción y organización de notas de voz con una experiencia rápida, privada y asistida por IA.",
    href: "https://github.com/gamurigm/SpeechNotes",
    image: "/assets/speechnotes.png",
    tags: ["Whisper", "AI", "Python"],
    categories: ["IA", "Datos"],
    mosaic: "tall",
  },
  {
    title: "SymptoLeaf",
    description: "Visión por computador para identificar síntomas en hojas y acelerar decisiones en agricultura.",
    href: "https://github.com/gamurigm/backend-login_SymtoLeaf",
    image: "/assets/symptoleaf.png",
    tags: ["PyTorch", "Computer Vision", "Edge Computing"],
    categories: ["IA", "Datos"],
    mosaic: "square",
  },
  {
    title: "Inventrack PTES Report",
    description: "Plataforma cloud-native para documentar pruebas de penetración y convertir hallazgos en acciones claras.",
    href: "https://github.com/gamurigm/inventrack-ptes-report",
    image: "/assets/inventrack-ptes-report.svg",
    tags: ["Kubernetes", "Docker", "OWASP ZAP"],
    categories: ["Seguridad", "Sistemas"],
    mosaic: "wide",
  },
  {
    title: "Federated API Gateway",
    description: "Capa de integración segura con autenticación federada, políticas de acceso y servicios desacoplados.",
    href: "https://github.com/gamurigm/federated-api-gateway",
    image: "/assets/federated-api-gateway.svg",
    tags: ["Next.js", "Supabase", "JWT RS256"],
    categories: ["Sistemas", "Seguridad"],
    mosaic: "tall",
  },
  {
    title: "DeepSeek R1 RAG",
    description: "Pipeline de recuperación aumentada para consultar conocimiento propio con precisión y contexto.",
    href: "https://github.com/gamurigm/deepseek-r1-rag",
    image: "/assets/deepseek-r1-rag.svg",
    tags: ["DeepSeek R1", "LangChain", "ChromaDB"],
    categories: ["IA", "Datos"],
    mosaic: "square",
  },
];

function closeMenu(setIsMenuOpen: (value: boolean) => void) {
  setIsMenuOpen(false);
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [activeProjectTitle, setActiveProjectTitle] = useState(projects[0].title);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeroFieldReady, setIsHeroFieldReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    return startHeroField(canvas, () => setIsHeroFieldReady(true));
  }, []);

  const visibleProjects = projects.filter(
    (project) => activeFilter === "Todos" || project.categories.includes(activeFilter),
  );
  const activeProject = visibleProjects.find((project) => project.title === activeProjectTitle) ?? visibleProjects[0];

  const selectFilter = (filter: string) => {
    setActiveFilter(filter);
    const firstProject = projects.find(
      (project) => filter === "Todos" || project.categories.includes(filter),
    );
    if (firstProject) setActiveProjectTitle(firstProject.title);
  };

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
                <a className="button button-quiet" href="mailto:gamurigm@gmail.com">
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

            <figure className={`hero-visual ${isHeroFieldReady ? "has-field" : ""}`}>
              <Image
                src="/assets/hero-systems.png"
                alt="Visual abstracto de sistemas de software conectados en una arquitectura de datos"
                fill
                priority
                sizes="(max-width: 760px) 100vw, 52vw"
              />
              <canvas className="hero-field" ref={canvasRef} aria-hidden="true" />
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
                  onClick={() => selectFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <p className="results-status" role="status" aria-live="polite">
              {visibleProjects.length} {visibleProjects.length === 1 ? "proyecto visible" : "proyectos visibles"}
            </p>

            <div className="collage-stage">
              <div className="projects-grid">
              {visibleProjects.map((project) => (
                <article className={`project-tile project-tile-${project.mosaic}`} key={project.title}>
                  <a
                    className="project-media"
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title}: ${project.description}`}
                    onMouseEnter={() => setActiveProjectTitle(project.title)}
                    onFocus={() => setActiveProjectTitle(project.title)}
                  >
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="(max-width: 820px) 100vw, 60vw"
                    />
                    <span className="project-fragments">
                      {fragmentGrid.map(({ column, index, row }) => {
                        const fragmentStyle = {
                          "--fragment-delay": `${index * 16}ms`,
                          "--fragment-image": `url("${project.image}")`,
                          "--fragment-position": `${column * 33.3333}% ${row * 33.3333}%`,
                          "--fragment-rx": `${(row - 1.5) * -9}deg`,
                          "--fragment-ry": `${(column - 1.5) * 11}deg`,
                          "--fragment-x": `${(column - 1.5) * 26}px`,
                          "--fragment-y": `${(row - 1.5) * 22}px`,
                          "--fragment-z": `${Math.abs(column - 1.5) * 14 + Math.abs(row - 1.5) * 12}px`,
                        } as CSSProperties;
                        return <span className="project-fragment" key={index} style={fragmentStyle} />;
                      })}
                    </span>
                    <span className="project-link" aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
              </div>

              {activeProject && (
                <aside className="project-detail" aria-live="polite" aria-label="Detalle del proyecto seleccionado">
                  <div className="project-detail-inner" key={activeProject.title}>
                    <p className="project-detail-label">Proyecto seleccionado</p>
                    <h3>{activeProject.title}</h3>
                    <p>{activeProject.description}</p>
                    <ul className="project-detail-tags" aria-label={`Tecnologías de ${activeProject.title}`}>
                      {activeProject.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <a className="project-detail-link" href={activeProject.href} target="_blank" rel="noopener noreferrer">
                      Explorar proyecto <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </aside>
              )}
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
            <a className="footer-email" href="mailto:gamurigm@gmail.com">
              gamurigm@gmail.com <span aria-hidden="true">↗</span>
            </a>
            <div className="footer-links" aria-label="Otros medios de contacto">
              <a className="footer-link" href="https://wa.me/593984919443" target="_blank" rel="noopener noreferrer">
                WhatsApp / 098 491 9443 <span aria-hidden="true">↗</span>
              </a>
              <a className="footer-link" href="https://www.linkedin.com/in/gmurillo-medina/" target="_blank" rel="noopener noreferrer">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="footer-meta">© {new Date().getFullYear()} Gabriel Murillo</p>
          </div>
        </div>
      </footer>
    </>
  );
}
