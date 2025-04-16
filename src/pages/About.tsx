import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            More about myself
          </motion.h2>

          {/* About Text */}
          <motion.div 
            className="text-white/60 leading-relaxed whitespace-pre-wrap space-y-6 sm:space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="group cursor-default transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] text-sm sm:text-base">
              I'm a 3rd-year Artificial Intelligence student obsessed with uncovering stories hidden in datasets. Whether it's cracking complex problems with machine learning or digging into data to spot trends, I thrive on transforming raw numbers into insights that matter. My approach? Methodical yet creative—I break challenges down with razor-sharp logic, then build innovative solutions that stick.
            </p>

            <p className="group cursor-default transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] text-sm sm:text-base">
              I'm the kind of thinker who asks "Why?" and "What if?"—a curiosity that's fueled my growth in AI and keeps me ahead of the curve. From tweaking algorithms to collaborating with peers on projects, I bring a mix of critical thinking and teamwork to the table.
            </p>

            <p className="group cursor-default transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] text-sm sm:text-base">
              Right now, I'm honing my skills in Python, SQL, and data visualization, eager to dive into data analysis or data science roles where I can make a real impact. I'm all about learning fast, adapting faster, and delivering results that drive decisions. If you're looking for a passionate problem-solver with a growth mindset, I'd love to connect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 sm:py-6 px-4 sm:px-6 border-t border-accent/10">
        <div className="max-w-4xl mx-auto text-center text-white/60 text-sm sm:text-base">
          <p>© 2025 All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default About;