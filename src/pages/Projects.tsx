// src/pages/Projects.tsx
import React from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projectsData"; // Import centralized projects data

const Projects = () => {
  return (
    <div>
      {/* Projects Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-8 sm:mb-12 text-center">My Latest Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {projects.map((project, index) => (
              <Link
                to={`/projects/${project.id}`}
                key={index}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl bg-muted/30"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs px-2 py-1 rounded-full bg-foreground/10 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display">{project.title}</h3>
                    <p className="text-sm sm:text-base text-foreground/60">{project.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 sm:mt-12 text-center">
            <button className="bg-foreground/10 px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-foreground/20 transition-colors text-sm sm:text-base">
              Load More
            </button>
          </div>
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

export default Projects;