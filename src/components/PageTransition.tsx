import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <motion.div
      key={location.pathname}
      initial={{ 
        opacity: 0,
        x: -20
      }}
      animate={{ 
        opacity: 1,
        x: 0
      }}
      exit={{ 
        opacity: 0,
        x: 20
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.6 },
        x: { duration: 0.4 }
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition; 