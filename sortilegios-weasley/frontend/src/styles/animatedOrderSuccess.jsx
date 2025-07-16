import { gsap } from "gsap";

const animateOrderSuccess = () => {
  const particlesCount = 64;
  const colors = ["#ffd700", "#ff8c00", "#ffffff", "#87ceeb"];
  const startX = window.innerWidth / 2;
  const startY = window.innerHeight / 2;

  const particles = []; // Guardamos las partículas para reutilizarlas luego

  // 🔥 1) EXPLOSIÓN INICIAL
  for (let i = 0; i < particlesCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    document.body.appendChild(particle);

    particle.style.position = "fixed";
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    particle.style.width = "8px";
    particle.style.height = "8px";
    particle.style.borderRadius = "50%";
    particle.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    particle.style.zIndex = "9999";
    particle.style.pointerEvents = "none";
    particle.style.boxShadow = "0 0 8px " + particle.style.backgroundColor;

    particles.push(particle);

    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 120;

    gsap.to(particle, {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      scale: 0.5,
      opacity: 0.7,
      duration: 1.2 + Math.random(),
      ease: "power2.out",
    });
  }

  // ✨ Zoom mágico en el panel
  gsap.fromTo(
    ".cart-summary-panel",
    { scale: 1 },
    { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut" }
  );

  // ✅ 2) VUELO AL ÍCONO "MIS PEDIDOS"
  setTimeout(() => {
    const ordersIcon = document.querySelector("#orders-icon");
    if (!ordersIcon) return;

    const endRect = ordersIcon.getBoundingClientRect();

    particles.forEach((particle) => {
      gsap.to(particle, {
        x: endRect.left - startX + (Math.random() * 30 - 15), // leve dispersión
        y: endRect.top - startY + (Math.random() * 30 - 15),
        scale: 0.3,
        opacity: 0,
        duration: 1 + Math.random() * 0.5,
        ease: "power2.inOut",
        onComplete: () => particle.remove(),
      });
    });

    // ✨ Rebote mágico en el ícono al final
    gsap.fromTo(
      ordersIcon,
      { scale: 1 },
      { scale: 1.3, duration: 0.3, yoyo: true, repeat: 2, ease: "power1.inOut" }
    );
  }, 1200); // Se lanzan después de la explosión
};


export default animateOrderSuccess;