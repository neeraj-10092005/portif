import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Slider from "react-slick"; // For carousel effect
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import React, { lazy, Suspense } from 'react';

// Define the Project interface
interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  images: string[];
  features: string[];
  technologies: string[];
}

// Ensure all projects have the required properties
const projects: Project[] = [
  {
    id: "powerbi",
    title: "PowerBI",
    category: "Business Intelligence",
    description: "Business Analytics Reports",
    longDescription:
      "Built a Call Center Analysis report in Power BI, analyzing call resolution metrics to achieve a 3.4/5 customer satisfaction rating using KPIs, improving operational efficiency. " +
      "Created a Churn Analysis dashboard for 7,043 customers, identifying a 26.54% churn rate and 2,955 at-risk customers with charts and DAX, enhancing retention strategies. " +
      "Developed a Diversity & Inclusion report for 500 employees, analyzing gender balance (41% female hires), promotions, turnover, and performance (2.42 average for women), promoting inclusivity.",
    tags: ["Data Visualization", "BI Tool", "KPIs", "DAX", "Customer Insights"],
    image: "/source-images/Power-Bi/call_center_trends.png",
    images: [
      "/source-images/Power-Bi/churn_dashboard.png",
      "/source-images/Power-Bi/customer_risk.png",
      "/source-images/Power-Bi/diversity.png",
      "/source-images/Power-Bi/inclusion.png",
    ],
    features: [
      "Real-Time Data Analysis",
      "Interactive Dashboards",
      "AI-Powered Insights",
      "Customizable Reports",
      "Churn Analysis with DAX",
      "Diversity & Inclusion Metrics",
    ],
    technologies: [
      "Microsoft Power BI",
      "DAX (Data Analysis Expressions)",
      "KPIs (Key Performance Indicators)",
      "Data Visualization",
      "Data Analysis",
      "Customer Retention Strategies",
    ],
  },
  {
    id: "learnx",
    title: "LearnX",
    category: "Education",
    description: "AI-Driven E-Learning Platform",
    longDescription:
      "LearnX is an innovative e-learning platform that leverages AI to provide personalized learning experiences. It offers interactive courses, quizzes, and progress tracking.",
    tags: ["E-Learning", "AI Tutoring"],
    image: "/source-images/LearnX/Home-page.png",
    images: ["/source-images/LearnX/Chatbot.png", "/source-images/LearnX/Carrerpath.png"],
    features: [
      "AI-Powered Recommendations",
      "Interactive Quizzes",
      "Progress Tracking",
      "Gamified Learning",
    ],
    technologies: ["React", "Python", "TensorFlow", "MongoDB"],
  },
  {
    id: "clover",
    title: "Clover",
    category: "Finance",
    description: "Personal Finance Management App",
    longDescription:
      "Clover is a personal finance app designed to help users manage their expenses, track budgets, and save money effectively.",
    tags: ["Budgeting", "Expense Tracking"],
    image: "/source-images/Power-Bi/customer_risk.png",
    images: ["/source-images/clover.png", "/source-images/clover-dashboard.png"],
    features: [
      "Expense Categorization",
      "Budget Alerts",
      "Savings Goals",
      "Transaction History",
    ],
    technologies: ["React Native", "Firebase", "Redux", "Chart.js"],
  },
  {
    id: "coursesite",
    title: "CourseSite",
    category: "Education",
    description: "Web Development Learning Platform",
    longDescription:
      "CourseSite is a comprehensive platform for learning web development. It offers tutorials, hands-on projects, and certification programs.",
    tags: ["Coding", "Tutorials"],
    image: "/source-images/Power-Bi/inclusion.png",
    images: ["/source-images/coursesite.png", "/source-images/coursesite-dashboard.png"],
    features: [
      "Interactive Tutorials",
      "Hands-On Projects",
      "Certification Programs",
      "Community Support",
    ],
    technologies: ["Next.js", "TailwindCSS", "GraphQL", "Stripe API"],
  },
];

// Lazy load the ProjectTicker component
const ProjectTicker = lazy(() => import('../components/ProjectTicker'));

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [otherProjects, setOtherProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Find the current project
    const currentProject = projects.find(p => p.id === id);
    setProject(currentProject || null);

    // Get other projects
    const others = projects.filter(p => p.id !== id);
    setOtherProjects(others);
  }, [id]);

  if (!project) {
    return <div>Project not found</div>;
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: custom * 0.1,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Project Content */}
      <section className="pt-16 sm:pt-20 md:pt-24 lg:pt-32 px-3 sm:px-6">
        <div className="container mx-auto">
          {/* Project Info */}
          <div className="max-w-7xl mx-auto">
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 sm:mb-4"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              {project.title}
            </motion.h1>
            <motion.p
              className="text-sm sm:text-base md:text-lg text-foreground/60 mb-4 sm:mb-6 md:mb-8 lg:mb-12 max-w-3xl"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              {project.description}
            </motion.p>

            <div className="flex flex-col md:grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
              {/* Left Column - Content */}
              <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12 order-2 md:order-1">
                {/* Overview Section */}
                <motion.div
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4">Overview</h3>
                  <p className="text-xs sm:text-sm md:text-base text-foreground/80 leading-relaxed">{project.longDescription}</p>
                </motion.div>

                {/* Technologies Section */}
                <motion.div
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                >
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-foreground/5 rounded-lg text-xs sm:text-sm md:text-base font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Key Features Section */}
                <motion.div
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                >
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 md:mb-4">Key Features</h3>
                  <ul className="space-y-1.5 sm:space-y-2 md:space-y-3">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs sm:text-sm md:text-base text-foreground/80">
                        <span className="text-primary">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Right Column - Image Carousel */}
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate="visible"
                custom={5}
                className="relative order-1 md:order-2"
              >
                <Slider
                  dots={true}
                  infinite={true}
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                  autoplay={true}
                  autoplaySpeed={5000}
                  className="rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden"
                >
                  {project.images.map((image, index) => (
                    <div key={index} className="aspect-video">
                      <img
                        src={image}
                        alt={`${project.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </Slider>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Projects Section */}
      <motion.section 
        className="py-8 sm:py-12 md:py-16 lg:py-20 mt-8 sm:mt-12 md:mt-16"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        custom={5}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-3 sm:mb-4">Other Projects</h2>
            <div className="w-20 sm:w-24 h-0.5 sm:h-1 bg-primary mx-auto" />
          </div>
        </div>
        
        <Suspense fallback={
          <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        }>
          <ProjectTicker projects={otherProjects} />
        </Suspense>
      </motion.section>
    </div>
  );
};

export default ProjectDetails;