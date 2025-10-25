import { useState, useEffect, useRef } from 'react';

/**
 * LazySection component that only renders children when they're near the viewport
 * Prevents initial render lag by deferring off-screen content
 */
const LazySection = ({ children, threshold = 0.1, rootMargin = '200px' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRendered) {
            setIsVisible(true);
            setHasRendered(true);
            // Once rendered, we can disconnect the observer
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin, // Start loading 200px before element enters viewport
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [threshold, rootMargin, hasRendered]);

  return (
    <div ref={sectionRef} className="min-h-[200px]">
      {isVisible ? children : (
        <div className="w-full py-24 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-muted-foreground text-sm font-light">Loading section...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazySection;
