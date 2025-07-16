import { gsap } from "gsap";

const animateToCart = (buttonRef, cartIconRef) => {
  const buttonRect = buttonRef.getBoundingClientRect();
  const cartRect = cartIconRef.getBoundingClientRect();

  const cartCenterX = cartRect.left + cartRect.width / 2;
  const cartCenterY = cartRect.top + cartRect.height / 2;

  const particlesCount = 64; // 🔥 Más partículas para que se vea mágico
  const colors = ["#ffd700", "#ff8c00", "#ff00ff", "#00ffff", "#7fff00"];

  for (let i = 0; i < particlesCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    document.body.appendChild(particle);

    particle.style.position = "fixed";
    particle.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
    particle.style.top = `${buttonRect.top + buttonRect.height / 2}px`;
    particle.style.width = `${6 + Math.random() * 6}px`;
    particle.style.height = particle.style.width;
    particle.style.borderRadius = "50%";
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.zIndex = "9999";
    particle.style.pointerEvents = "none";

    // ✅ Movimiento en espiral antes de ir al carrito
    const angle = Math.random() * Math.PI * 2;
    const radius = 40 + Math.random() * 40;
    const spiralTime = 0.5 + Math.random() * 0.3;

    gsap.to(particle, {
      duration: spiralTime,
      x: `+=${Math.cos(angle) * radius}`,
      y: `+=${Math.sin(angle) * radius}`,
      rotation: 360,
      ease: "power1.inOut",
      onComplete: () => {
        // Luego vuela al carrito
        gsap.to(particle, {
          duration: 0.8,
          x: cartCenterX - (buttonRect.left + buttonRect.width / 2),
          y: cartCenterY - (buttonRect.top + buttonRect.height / 2),
          scale: 0.5,
          opacity: 0.5,
          ease: "power2.inOut",
          onComplete: () => particle.remove(),
        });
      },
    });
  }

  // ✅ Rebote mágico en el carrito
  gsap.fromTo(
    cartIconRef,
    { scale: 1 },
    { scale: 1.3, duration: 0.25, yoyo: true, repeat: 1, ease: "power1.inOut" }
  );
};
export default animateToCart;