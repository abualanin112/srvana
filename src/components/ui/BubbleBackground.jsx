import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * BubbleBackground Component
 * Creates an animated bubble background effect
 */
const BubbleBackground = ({
  children,
  className,
  interactive = false,
  bubbleCount = 20,
}) => {
  const canvasRef = useRef(null);
  const bubblesRef = useRef([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Bubble class
    class Bubble {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.radius = Math.random() * 40 + 20;
        this.speed = Math.random() * 0.5 + 0.2;
        this.opacity = Math.random() * 0.15 + 0.05;
        this.wobble = Math.random() * 2;
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.y -= this.speed;
        this.wobble += this.wobbleSpeed;

        // Reset when bubble goes off screen
        if (this.y + this.radius < 0) {
          this.reset();
        }
      }

      draw() {
        const wobbleX = Math.sin(this.wobble) * 10;

        ctx.beginPath();
        ctx.arc(this.x + wobbleX, this.y, this.radius, 0, Math.PI * 2);

        // Create gradient for bubble
        const gradient = ctx.createRadialGradient(
          this.x + wobbleX - this.radius / 3,
          this.y - this.radius / 3,
          0,
          this.x + wobbleX,
          this.y,
          this.radius
        );

        gradient.addColorStop(0, `rgba(139, 92, 246, ${this.opacity * 1.5})`);
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(139, 92, 246, 0)`);

        ctx.fillStyle = gradient;
        ctx.fill();

        // Add subtle border
        ctx.strokeStyle = `rgba(139, 92, 246, ${this.opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Initialize bubbles
    bubblesRef.current = Array.from(
      { length: bubbleCount },
      () => new Bubble()
    );

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubblesRef.current.forEach((bubble) => {
        bubble.update();
        bubble.draw();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Mouse interaction
    if (interactive) {
      const handleMouseMove = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        bubblesRef.current.forEach((bubble) => {
          const dx = mouseX - bubble.x;
          const dy = mouseY - bubble.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Push bubbles away from cursor
          if (distance < 150) {
            const angle = Math.atan2(dy, dx);
            const force = (150 - distance) / 150;
            bubble.x -= Math.cos(angle) * force * 2;
            bubble.y -= Math.sin(angle) * force * 2;
          }
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", resizeCanvas);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [interactive, bubbleCount]);

  return (
    <div className={cn("relative w-full h-full", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ background: "hsl(var(--primary))" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BubbleBackground;
