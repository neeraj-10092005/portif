
// src/pages/Index.tsx
import React, { useState, useCallback, useEffect, useRef, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import { loadFull } from "tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import Typed from 'typed.js';
import { motion } from "framer-motion";
import { projects as allProjects } from "../data/projectsData";

const ProjectTicker = lazy(() => import('../components/ProjectTicker'));

const Index = () => {
  const [particlesError, setParticlesError] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    try {
      console.log("Particles loaded:", container);
    } catch (error) {
      console.error("Particles failed to load:", error);
      setParticlesError(true);
    }
  }, []);

  const projects = allProjects.slice(0, 2);

  const skills = [
    "Machine Learning",
    "Python",
    "SQL",
    "Data Analysis",
    "Data Science",
    "Web Development",
  ];

  const el = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    const options = {
      strings: ["Data Analyst", "GEN AI/ML Engineer", "Web Developer"],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      backDelay: 1000,
      smartBackspace: true,
    };

    typed.current = new Typed(el.current, options);

    return () => {
      if (typed.current) {
        typed.current.destroy();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-[-100%] left-[-50%] w-[150%] h-[400%] opacity-30"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(72, 71, 71, 0.1) 0%, rgba(128,128,128,0.05) 25%, transparent 50%)",
          }}
        />
      </div>
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 0%, rgba(10,10,10,0.8) 100%)",
          }}
        />
      </div>
      <div className="relative z-10">
        <section className="min-h-screen flex items-center justify-center py-32 px-6 relative">
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%)",
            }}
          />
          <Particles
            id="tsparticles-hero"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
              background: { color: { value: "transparent" } },
              fpsLimit: 60,
              particles: {
                color: { value: "#C2C4CC", animation: { enable: true, speed: 90 } },
                move: { direction: "none", enable: true, speed: 1, outModes: { default: "out" } },
                number: { value: 50 },
                opacity: { value: { min: 0.8, max: 1 } },
                shape: { type: "circle" },
                size: { value: { min: 0.5, max: 1 } },
              },
              interactivity: {
                events: {
                  onHover: {
                    enable: true,
                    mode: "none",
                    parallax: { enable: true, force: 40, smooth: 30 },
                  },
                },
              },
              detectRetina: true,
            }}
            className="absolute inset-0 z-0"
          />
          <div className="absolute top-0 left-0 w-full h-[35vh] md:h-[36vh] overflow-hidden z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover animate-fade"
              style={{ objectPosition: "bottom top" }}
              onError={() => setVideoError(true)}
            >
              <source src="/home page animation.mp4" type="video/mp4" />
              {videoError ? (
                <div className="absolute inset-0 bg-background flex items-center justify-center">
                  <p className="text-foreground/60">Video failed to load</p>
                </div>
              ) : (
                "Your browser does not support the video tag."
              )}
            </video>
          </div>
          <div className="text-center max-w-3xl mx-auto space-y-6 animate-fade-in relative z-20 mt-20">
            <div className="flex-shrink-0 flex justify-center items-center">
              <div className="relative w-[176px] h-[176px] mx-auto">
                <img
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-auto object-cover rounded-full border-4 border-primary/10"
                  src="/Logo.png"
                  alt="Profile Logo"
                />
              </div>
            </div>
            <motion.div 
              className="text-4xl md:text-6xl font-display font-bold text-white flex flex-col items-center"
            >
              <div className="flex justify-center">
                {Array.from("Venkat Neeraj Reddy").map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ 
                      opacity: 0,
                      x: -20,
                      filter: "blur(8px)"
                    }}
                    animate={{ 
                      opacity: 1,
                      x: 0,
                      filter: "blur(0px)"
                    }}
                    transition={{
                      type: "spring",
                      duration: 0.8,
                      delay: index * 0.05,
                      bounce: 0,
                      ease: "easeOut"
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </div>
              <div className="flex justify-center mt-2">
                {Array.from("Dwarampudi").map((letter, index) => (
                  <motion.span
                    key={`last-${index}`}
                    initial={{ 
                      opacity: 0,
                      x: -20,
                      filter: "blur(8px)"
                    }}
                    animate={{ 
                      opacity: 1,
                      x: 0,
                      filter: "blur(0px)"
                    }}
                    transition={{
                      type: "spring",
                      duration: 0.8,
                      delay: (index + "Venkat Neeraj Reddy".length) * 0.05,
                      bounce: 0,
                      ease: "easeOut"
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            <p className="text-foreground/60 text-lg md:text-xl text-white">
              <span ref={el}></span>
            </p>
            <div className="relative flex items-center justify-center gap-3 mt-4">
              {/* Contact Me Button */}
              <Link
                to="/contact"
                className="group relative w-[185px] h-[55px]
                           flex items-center justify-center gap-2 mx-auto"
              >
                <div className="absolute inset-0 box-border w-[185px] h-[55px] rounded-[72px]
                                blur-[15px]
                                shadow-[0px_1px_2px_0px_rgba(0,0,0,0.25)]
                                bg-[radial-gradient(25%_50%_at_50%_100%,#ffffff_0%,rgba(255,255,255,0)_100%)]
                                overflow-hidden z-0
                                border-[2px] border-[#222222]
                                transition-all duration-300" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                w-[167px] h-[55px] rounded-[72px]
                                bg-[radial-gradient(20.7%_50%_at_50%_100%,#ffffff_0%,rgba(255,255,255,0)_100%)]
                                overflow-hidden z-0
                                transition-all duration-300
                                group-hover:bg-[radial-gradient(60.1%_50%_at_50%_100%,#ffffff_0%,rgba(255,255,255,0)_100%)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                w-[166px] h-[55px] rounded-[114px]
                                bg-black
                                overflow-hidden z-0" />
                <span className="relative z-[3] flex items-center gap-2 text-white">
                  Contact Me <ArrowRight size={20} className="transform -rotate-45" />
                </span>
              </Link>

              {/* Removed Resume Button, replaced with duplicate Contact Me Button */}
              <Link
                to="/contact"
                className="group relative w-[185px] h-[55px]
                           flex items-center justify-center gap-2 mx-auto"
              >
                <div className="absolute inset-0 box-border w-[185px] h-[55px] rounded-[72px]
                                blur-[15px]
                                shadow-[0px_1px_2px_0px_rgba(0,0,0,0.25)]
                                bg-[radial-gradient(25%_50%_at_50%_100%,#ffffff_0%,rgba(255,255,255,0)_100%)]
                                overflow-hidden z-0
                                border-[2px] border-[#222222]
                                transition-all duration-300" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                w-[167px] h-[55px] rounded-[72px]
                                bg-[radial-gradient(20.7%_50%_at_50%_100%,#ffffff_0%,rgba(255,255,255,0)_100%)]
                                overflow-hidden z-0
                                transition-all duration-300
                                group-hover:bg-[radial-gradient(60.1%_50%_at_50%_100%,#ffffff_0%,rgba(255,255,255,0)_100%)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                w-[166px] h-[55px] rounded-[114px]
                                bg-black
                                overflow-hidden z-0" />
                <span className="relative z-[3] flex items-center gap-2 text-white">
                  Contact Me <ArrowRight size={20} className="transform -rotate-45" />
                </span>
              </Link>
            </div>
            <div className="flex justify-center flex-wrap mt-6">
              {Array.from("Data is my playground, and I'm here to turn chaos into clarity.").map((letter, index) => (
                <motion.span
                  key={`tagline-${index}`}
                  className="text-white/80 text-lg md:text-xl italic"
                  initial={{ 
                    opacity: 0,
                    x: -20,
                    filter: "blur(8px)"
                  }}
                  animate={{ 
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)"
                  }}
                  transition={{
                    type: "spring",
                    duration: 0.8,
                    delay: (index * 0.05) + ("Venkat Neeraj Reddy Dwarampudi".length * 0.05) + 0.5,
                    bounce: 0,
                    ease: "easeOut"
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </div>
          </div>
        </section>
        <motion.section
          id="projects"
          className="py-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-display font-bold mb-4">My Latest Projects</h2>
              <div className="w-24 h-1 bg-primary mx-auto" />
            </div>
          </div>
          
          <Suspense fallback={
            <div className="w-full h-[400px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          }>
            <ProjectTicker projects={allProjects} />
          </Suspense>
          
          <div className="max-w-7xl mx-auto">
            <div className="text-center mt-12">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
              >
                View All Projects <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </motion.section>
        <footer className="py-8 px-6 border-t border-accent/10">
          <div className="max-w-4xl mx-auto text-center text-foreground/60">
            <p>© 2025 All Rights Reserved</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;

