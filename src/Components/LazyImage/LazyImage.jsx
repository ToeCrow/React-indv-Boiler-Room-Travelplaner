import React, { useRef, useState, useEffect } from 'react';

const LazyImage = ({ smallSrc, largeSrc, altText }) => {
  const imgRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);  // När bilden är synlig, ändra till stor bild
          }
        });
      },
      { threshold: 0.1 } // När 10% av bilden är synlig
    );

    if (imgRef.current) {
      observer.observe(imgRef.current); // Observera bildens ref
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current); // Städa upp när komponenten avlägsnas
      }
    };
  }, []);

  return (
    <img
  ref={imgRef}
  src={isIntersecting ? largeSrc : smallSrc}
  alt={altText}
  style={{
    width: isIntersecting ? "100%" : "80%",
    opacity: isIntersecting ? 1 : 0.6,
    transition: "all 0.3s ease-in-out"
  }}
/>

  );
};

export default LazyImage;
