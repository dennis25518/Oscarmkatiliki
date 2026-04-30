import { useEffect, useRef, useState } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<CursorPosition>({ x: 0, y: 0 });
  const circlePos = useRef<CursorPosition>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(undefined);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Update cursor dot position immediately
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animateCircle = () => {
      if (circleRef.current && cursorRef.current) {
        // Smooth easing for the circle to follow the dot
        const easing = 0.15; // Lower = slower follow, higher = faster
        circlePos.current.x += (mousePos.x - circlePos.current.x) * easing;
        circlePos.current.y += (mousePos.y - circlePos.current.y) * easing;

        circleRef.current.style.left = `${circlePos.current.x}px`;
        circleRef.current.style.top = `${circlePos.current.y}px`;
      }

      animationFrameRef.current = requestAnimationFrame(animateCircle);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameRef.current = requestAnimationFrame(animateCircle);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePos]);

  return (
    <>
      {/* Outer Circle */}
      <div ref={circleRef} className="custom-cursor-circle" />
      {/* Inner Dot */}
      <div ref={cursorRef} className="custom-cursor" />
    </>
  );
}
