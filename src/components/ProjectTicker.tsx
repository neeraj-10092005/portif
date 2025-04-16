import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  images: string[]; // Array of project images
}

interface ProjectTickerProps {
  projects: Project[];
}

const ProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get the second image if available, otherwise use the first image
  const hoverImage = project.images?.[1] || project.image;

  return (
    <motion.div
      className="flex-shrink-0 w-[600px] mx-8"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link
        to={`/projects/${project.id}`}
        className="group relative aspect-[16/10] block overflow-hidden rounded-2xl bg-muted/30"
      >
        <div className="relative w-full h-full">
          {/* Main Image */}
          <img
            src={project.image}
            alt={project.title}
            className="absolute w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: isHovered ? 0 : 1 }}
          />
          {/* Hover Image */}
          <img
            src={hoverImage}
            alt={`${project.title} - Preview`}
            className="absolute w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: isHovered ? 1 : 0 }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <div className="space-y-3">
            <div className="flex gap-2">
              {project.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="text-sm px-3 py-1.5 rounded-full bg-foreground/10 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-3xl font-display text-white">{project.title}</h3>
            <p className="text-lg text-foreground/60">{project.description}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ProjectTicker: React.FC<ProjectTickerProps> = ({ projects }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate total width of a single project (card width + margin)
  const projectWidth = 600; // w-[600px]
  const projectMargin = 32; // mx-8 (8 * 4 = 32px)
  const totalProjectWidth = projectWidth + (projectMargin * 2);
  
  // Triple the projects to ensure smooth transition
  const tripleProjects = [...projects, ...projects, ...projects];

  return (
    <div className="w-full overflow-hidden relative">
      <motion.div
        className="flex"
        initial={{ x: 0 }}
        animate={{ x: `-${totalProjectWidth * projects.length}px` }}
        transition={{
          duration: isHovered ? 100 : 60,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {tripleProjects.map((project, index) => (
          <ProjectCard 
            key={`${project.id}-${index}`} 
            project={project}
          />
        ))}
      </motion.div>
    </div>
  );
};

// Export as default for better code splitting
export default ProjectTicker; 