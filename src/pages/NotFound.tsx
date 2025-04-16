import { useLocation } from "react-router-dom";
import { useEffect, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { loadFull } from "tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";

const NotFound = () => {
  const location = useLocation();

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log("Particles loaded:", container);
  }, []);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Particles Background */}
      <Particles
        id="tsparticles-404"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.1,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 0.5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.15,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* Light Source Effect */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute top-[-50%] left-[-25%] w-[150%] h-[150%] opacity-30"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 25%, transparent 50%)",
          }}
        />
      </div>

      {/* Dimming Rays */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "linear-gradient(0deg, transparent 0%, rgba(10,10,10,0.8) 100%)",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* 404 Content */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8">
          <div className="relative group w-full max-w-4xl">
            <div className="text-[12rem] sm:text-[16rem] md:text-[20rem] font-bold text-muted/30 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:text-muted/50 group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              404
            </div>
            <div className="relative z-10 text-center space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold">
                Whoa!
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-foreground/60">
                That didn't work out.
              </p>
              <p className="text-sm sm:text-base text-foreground/40 max-w-md mx-auto">
                The page you are looking for either doesn't exist or currently not available
              </p>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors text-sm sm:text-base"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                Go to homepage
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-3 sm:py-4 border-t border-accent/10">
          <div className="container mx-auto px-4 sm:px-6 text-center text-foreground/40 text-sm sm:text-base">
            <p>© 2025 All Rights Reserved</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default NotFound;
