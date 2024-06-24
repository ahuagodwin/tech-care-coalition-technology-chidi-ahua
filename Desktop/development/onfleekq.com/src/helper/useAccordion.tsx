
import { useState } from 'react';

// Custom hook for managing accordion state
const useAccordion = (initialIndex: number | null = null) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(initialIndex);

  // Function to toggle the visibility of accordion content
  const toggleContentVisibility = (index: number) => {
    setActiveIndex(prevIndex => (prevIndex === index ? null : index));
  };

  // Return active index and toggle function
  return { activeIndex, toggleContentVisibility };
};

export default useAccordion;
