import { useState, useEffect, useRef } from 'react';


/* Copy pasted hook from stack overflow to detect clicks outside component */
export default function useComponentVisible(initialIsVisible:boolean) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef<any>(null);

    const handleHideDropdown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsComponentVisible(false);
        }
      };
    
      const handleClickOutside = (event:MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsComponentVisible(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener("keydown", handleHideDropdown, true);
        document.addEventListener("click", handleClickOutside, true);
        return () => {
          document.removeEventListener("keydown", handleHideDropdown, true);
          document.removeEventListener("click", handleClickOutside, true);
        };
      });
    
      return { ref, isComponentVisible, setIsComponentVisible };
    }
    