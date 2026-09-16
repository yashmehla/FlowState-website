import { useEffect, useRef, memo } from 'react';

const Starfield = memo(function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Handle high-DPI displays for crisp rendering
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    function createStar(w, h) {
      // Pick a random angle (0 to 360 degrees) and a very slow speed
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.05 + 0.01; 

      return {
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() > 0.95 ? 2.0 : Math.random() > 0.7 ? 1.2 : 0.8,
        baseOpacity: Math.random() * 0.3 + 0.2, // 0.2 to 0.5
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        twinkleSpeed: Math.random() * 0.01 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      };
    }

    // Initialize stars
    const numStars = 140;
    const stars = Array.from({ length: numStars }).map(() => 
      createStar(window.innerWidth, window.innerHeight)
    );

    let time = 0;
    const render = () => {
      time += 1;
      
      // Clear canvas
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      stars.forEach((star) => {
        // Move star continuously in its own unique direction
        star.x += star.dx;
        star.y += star.dy;

        // Wrap around screen edges seamlessly if they drift too far off-screen
        if (star.x < -20) star.x = window.innerWidth + 20;
        else if (star.x > window.innerWidth + 20) star.x = -20;

        if (star.y < -20) star.y = window.innerHeight + 20;
        else if (star.y > window.innerHeight + 20) star.y = -20;

        // Twinkle effect (sine wave oscillation)
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        // Alpha bounces around baseOpacity
        const alpha = Math.max(0.1, Math.min(1, star.baseOpacity + twinkle * 0.4));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        
        // Add soft glow to brighter stars
        if (alpha > 0.6 || star.size > 1.2) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(255, 255, 255, ${alpha})`;
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 0
      }}
      aria-hidden="true"
    />
  );
});

export default Starfield;
