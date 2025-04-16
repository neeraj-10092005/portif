import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import PageTransition from "./PageTransition";
import { AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { scrollToSection } = useSmoothScroll();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/skills", label: "Skills" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-accent/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ 
          backgroundColor: "rgba(0, 0, 0, 0.95)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
          transition: {
            duration: 0.2,
            ease: "easeInOut"
          }
        }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="text-lg sm:text-xl md:text-2xl font-display text-white hover:text-white/80 transition-all duration-200 hover:scale-105"
              onClick={() => scrollToSection('top')}
            >
              Portfolio
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.to}
                  to={link.to}
                  className="text-sm lg:text-base text-white/80 hover:text-white transition-all duration-200 hover:scale-105 relative group"
                  onClick={() => scrollToSection(link.to.slice(1))}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white/80 hover:text-white transition-colors p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            className="md:hidden overflow-hidden"
            initial={false}
            animate={{ height: isMenuOpen ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="py-3 sm:py-4 space-y-3 sm:space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-sm sm:text-base text-white/80 hover:text-white transition-all duration-200 hover:scale-105"
                  onClick={() => {
                    setIsMenuOpen(false);
                    scrollToSection(link.to.slice(1));
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.nav>
      <main className="flex-1 pt-16">
        <div className="relative">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <div className="min-h-screen">
                {children}
              </div>
            </PageTransition>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Layout; 