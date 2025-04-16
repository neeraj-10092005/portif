import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const handleMailClick = () => {
    window.location.href = 'mailto:dvenkatneerajreddy10@gmail.com';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <section id="contact" className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 bg-muted/10">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 -mt-20 sm:-mt-32">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold">Let's Stay Connected</h2>
          <p className="text-sm sm:text-base text-foreground/60">
            Get in touch to start a conversation! Feel free to reach out.
          </p>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-4 sm:gap-6">
            <a 
              href="https://github.com/Neerajreddy-2005" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <FaGithub 
                size={24}
                className="sm:w-7 sm:h-7 text-foreground/60 transition-all duration-300 group-hover:text-primary group-hover:scale-110" 
              />
            </a>
            <a 
              href="https://linkedin.com/in/venkat-neeraj-reddy-dwarampudi-463597299/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <FaLinkedin 
                size={24}
                className="sm:w-7 sm:h-7 text-foreground/60 transition-all duration-300 group-hover:text-primary group-hover:scale-110" 
              />
            </a>
          </div>

          <button 
            onClick={handleMailClick}
            className="bg-foreground text-background px-4 sm:px-6 py-2 sm:py-3 rounded-full flex items-center gap-2 mx-auto hover:bg-foreground/90 transition-colors text-sm sm:text-base"
          >
            <Mail size={16} className="sm:w-5 sm:h-5" />
            Mail Me
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 sm:py-6 px-4 sm:px-6 border-t border-accent/10">
        <div className="max-w-4xl mx-auto text-center text-foreground/60 text-sm sm:text-base">
          <p>© 2025 All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
