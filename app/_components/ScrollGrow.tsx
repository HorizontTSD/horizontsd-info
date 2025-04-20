"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Grow, GrowProps } from "@mui/material";

interface ScrollGrowProps extends Omit<GrowProps, 'children'> {
  children: React.ReactElement;
  animationDelay?: number;
  threshold?: number;
  timeout?: number;
  transformOrigin?: string;
}

const ScrollGrow = ({
  children,
  animationDelay = 200,
  threshold = 0.01,
  timeout = 200,
  transformOrigin = "0 0 0",
  ...growProps
}: ScrollGrowProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setTimeout(() => {
        setIsVisible(true);
      }, animationDelay);
    }
  }, [animationDelay]);

  useEffect(() => {
    const currentRef = componentRef.current;
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold,
    });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleIntersection, threshold]);

  return (
    <div ref={componentRef}>
      <Grow
        in={isVisible}
        timeout={timeout}
        style={{ transformOrigin }}
        {...growProps}
      >
        {children}
      </Grow>
    </div>
  );
};

export default ScrollGrow;