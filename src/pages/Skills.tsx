import React, { useState } from 'react';
import { FaPython, FaReact, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaDatabase, FaChartBar, FaTable, FaExchangeAlt, FaBrain, FaChartLine, FaUsers, FaLightbulb, FaMicrosoft } from 'react-icons/fa';
import { SiR, SiTypescript, SiMysql, SiPandas, SiNumpy, SiScikitlearn, SiTensorflow, SiOpenai, SiNodedotjs, SiExpress, SiMongodb, SiVite } from 'react-icons/si';
import { IoMdAnalytics } from 'react-icons/io';
import { BsGraphUp, BsGearFill } from 'react-icons/bs';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { IoAnalytics } from 'react-icons/io5';
import { BiBarChartAlt2 } from 'react-icons/bi';
import { TbChartBar } from 'react-icons/tb';
import '../styles/honeycomb.css';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = {
    all: 'All Skills',
    languages: 'Languages',
    frameworks: 'Frameworks',
    libraries: 'Libraries',
    tools: 'Tools',
    technical: 'Technical Skills',
    soft: 'Soft Skills'
  };

  const skills = [
    { name: "Python", icon: <FaPython className="text-[#3776AB]" />, category: "languages" },
    { name: "R", icon: <SiR className="text-[#276DC3]" />, category: "languages" },
    { name: "SQL", icon: <FaDatabase className="text-[#E48E00]" />, category: "languages" },
    { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E]" />, category: "languages" },
    { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" />, category: "languages" },
    { name: "React", icon: <FaReact className="text-[#61DAFB]" />, category: "frameworks" },
    { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" />, category: "frameworks" },
    { name: "Express.js", icon: <SiExpress className="text-[#000000]" />, category: "frameworks" },
    { name: "HTML", icon: <FaHtml5 className="text-[#E34F26]" />, category: "libraries" },
    { name: "CSS", icon: <FaCss3Alt className="text-[#1572B6]" />, category: "libraries" },
    { name: "Pandas", icon: <SiPandas className="text-[#150458]" />, category: "libraries" },
    { name: "NumPy", icon: <SiNumpy className="text-[#013243]" />, category: "libraries" },
    { name: "Scikit-Learn", icon: <SiScikitlearn className="text-[#F7931E]" />, category: "libraries" },
    { name: "TensorFlow", icon: <SiTensorflow className="text-[#FF6F00]" />, category: "libraries" },
    { name: "Matplotlib", icon: <TbChartBar className="text-[#11557C]" />, category: "libraries" },
    { name: "Git", icon: <FaGitAlt className="text-[#F05032]" />, category: "tools" },
    { name: "Power BI", icon: <BiBarChartAlt2 className="text-[#F2C811]" />, category: "tools" },
    { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" />, category: "tools" },
    { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" />, category: "tools" },
    { name: "Vite", icon: <SiVite className="text-[#646CFF]" />, category: "tools" },
    { name: "Excel", icon: <FaMicrosoft className="text-[#00A4EF]" />, category: "tools" },
    { name: "Data Visualization", icon: <BsGraphUp className="text-[#FF6B6B]" />, category: "technical" },
    { name: "Data Modelling", icon: <FaExchangeAlt className="text-[#4ECDC4]" />, category: "technical" },
    { name: "Data Preprocessing", icon: <BsGearFill className="text-[#45B7D1]" />, category: "technical" },
    { name: "Statistical Analysis", icon: <FaChartLine className="text-[#96CEB4]" />, category: "technical" },
    { name: "Business Intelligence", icon: <FaChartBar className="text-[#FFEEAD]" />, category: "technical" },
    { name: "Predictive Analytics", icon: <IoMdAnalytics className="text-[#D4A5A5]" />, category: "technical" },
    { name: "Machine Learning", icon: <GiArtificialIntelligence className="text-[#9B59B6]" />, category: "technical" },
    { name: "Artificial Intelligence", icon: <GiArtificialIntelligence className="text-[#8E44AD]" />, category: "technical" },
    { name: "Deep Learning", icon: <GiArtificialIntelligence className="text-[#9B59B6]" />, category: "technical" },
    { name: "Generative AI", icon: <SiOpenai className="text-[#412991]" />, category: "technical" },
    { name: "Critical Thinking", icon: <FaBrain className="text-[#3498DB]" />, category: "soft" },
    { name: "Problem-Solving", icon: <FaLightbulb className="text-[#F1C40F]" />, category: "soft" },
    { name: "Team Collaboration", icon: <FaUsers className="text-[#2ECC71]" />, category: "soft" },
    { name: "Growth Mindset", icon: <FaChartLine className="text-[#E74C3C]" />, category: "soft" }
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <div>
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 sm:mb-6 md:mb-8 text-center">Skills</h2>
          
          {/* Category Buttons */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8 md:mb-12">
            {Object.entries(categories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-medium transition-all duration-300 ${
                  activeCategory === key
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-muted/30 text-white/60 hover:bg-muted/40'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Honeycomb Grid */}
          <div className="honeycomb-container">
            <div className="honeycomb-grid">
              {filteredSkills.map((skill, index) => (
                <div
                  key={index}
                  className={`honeycomb-cell group opacity-100`}
                >
                  <div className="honeycomb-content flex flex-col items-center justify-center">
                    <span className="text-base sm:text-lg md:text-xl lg:text-2xl transition-all duration-300 group-hover:scale-110 mb-1 sm:mb-2 text-white">
                      {skill.icon}
                    </span>
                    <span className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-medium text-center transition-all duration-300 px-1 text-white">
                      {skill.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <footer className="py-3 sm:py-4 md:py-6 px-4 sm:px-6 border-t border-accent/10">
        <div className="max-w-4xl mx-auto text-center text-foreground/60 text-xs sm:text-sm md:text-base">
          <p>© 2025 All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Skills;
