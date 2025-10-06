import React, { useEffect, useRef } from "react";

const FireworksBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    class Firework {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
        this.dx = (Math.random() - 0.5) * 3;
        this.dy = -(Math.random() * 10 + 10);
        this.exploded = false;
        this.particles = [];
        this.age = 0;
      }
      launch() {
        this.x += this.dx;
        this.y += this.dy;
        ctx.beginPath();
        ctx.moveTo(this.x - this.dx, this.y - this.dy);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        if (this.y <= canvas.height * Math.random() * 0.5) {
          this.explode();
        }
      }
      explode() {
        const particleCount = Math.floor(Math.random() * 50 + 50);
        for (let i = 0; i < particleCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 5 + 2;
          this.particles.push({
            x: this.x,
            y: this.y,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            size: Math.random() * 3 + 1,
            alpha: 1,
            color: this.color,
            trail: [{ x: this.x, y: this.y }],
            maxTrailLength: 10,
          });
        }
        this.exploded = true;
      }
      updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
          const p = this.particles[i];
          p.x += p.dx;
          p.y += p.dy;
          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > p.maxTrailLength) p.trail.shift();
          p.dy += 0.15;
          p.dx *= 0.99;
          if (p.trail.length > 1) {
            ctx.beginPath();
            ctx.moveTo(p.trail[0].x, p.trail[0].y);
            for (let j = 1; j < p.trail.length; j++) {
              ctx.lineTo(p.trail[j].x, p.trail[j].y);
            }
            ctx.strokeStyle = `rgba(${getRGB(p.color)}, ${p.alpha})`;
            ctx.lineWidth = p.size / 2;
            ctx.stroke();
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${getRGB(p.color)}, ${p.alpha})`;
          ctx.fill();
          p.alpha -= 0.01;
          if (
            p.alpha <= 0 ||
            p.x < 0 ||
            p.x > canvas.width ||
            p.y > canvas.height
          ) {
            this.particles.splice(i, 1);
          }
        }
      }
      update() {
        this.age++;
        if (!this.exploded) this.launch();
        else this.updateParticles();
        if (this.exploded && this.particles.length === 0) this.reset();
      }
    }

    function getRGB(hslColor) {
      const match = hslColor.match(/hsl\((\d+\.?\d*),\s*(\d+)%,\s*(\d+)%\)/);
      if (match) {
        const [_, h, s, l] = match;
        const rgb = hslToRgb(parseFloat(h), parseInt(s), parseInt(l));
        return rgb.join(",");
      }
      return "255,255,255";
    }
    function hslToRgb(h, s, l) {
      s /= 100;
      l /= 100;
      const k = (n) => (n + h / 30) % 12;
      const a = s * Math.min(l, 1 - l);
      const f = (n) =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
      return [
        Math.round(255 * f(0)),
        Math.round(255 * f(8)),
        Math.round(255 * f(4)),
      ];
    }

    const fireworks = [];
    for (let i = 0; i < 8; i++) {
      fireworks.push(new Firework());
    }

    let animationFrameId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // <-- Clear with transparency
      fireworks.forEach((fw) => fw.update());
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="fireworks-canvas"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 5,
        pointerEvents: "none",
      }}
    />
  );
};

export default FireworksBackground;