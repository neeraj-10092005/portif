import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSmoothScroll = () => {
  const navigate = useNavigate();

  const scrollToSection = useCallback((sectionId: string, path?: string) => {
    if (path) {
      navigate(path);
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }, [navigate]);

  return { scrollToSection };
}; 