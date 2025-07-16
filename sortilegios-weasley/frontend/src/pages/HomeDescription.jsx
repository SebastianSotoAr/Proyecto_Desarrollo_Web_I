import React, { useState } from 'react';
import '../styles/HomeDescription.css';


const HomeDescription = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={`home-description text-light p-4 sharedBackground ${isOpen ? "open" : "closed"}`}>

      <div className="container">
        <h1 className="mb-3">¡Bienvenido a Sortilegios Weasley!</h1>
        <button
          className="btn btn-warning mb-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "🔽 Ver menos" : "📜 Conocenos más"}
        </button>

        {isOpen && (
          <div className="animated fadeIn">
            <h2>About Us — Sobre Nosotros</h2>
        <p>Bienvenido a Sortilegios Weasley, donde la magia y la travesura se unen.
          Fundada por los legendarios gemelos Fred y George Weasley, Sortilegios Weasley (también conocida como Weasley & Weasley) nació de una pasión por las bromas brillantes, la inventiva mágica y, por supuesto, el deseo de hacer del mundo un lugar mucho más divertido (y ruidoso).
          Desde nuestras humildes travesuras en Hogwarts hasta nuestro vibrante local en el Callejón Diagon, nos hemos dedicado a ofrecer productos mágicos únicos para magos, brujas y muggles curiosos. Contamos con un surtido irresistible de artículos de broma, soluciones anti-aburrimiento, productos mágicos de autodefensa, pociones de amor (¡úsalas con cuidado!) y una especial sección para los fans de los trucos muggles.
          Hoy, con Ron Weasley a bordo y una legión de bromistas felices, seguimos creando travesuras inolvidables.
          </p>
        <p>
          Sumérgete en el universo mágico de bromas, encantamientos y dulces explosivos. Esta tienda fue fundada
          por los legendarios gemelos Weasley y ofrece los productos más traviesos y encantadores del mundo mágico.
        </p>
        <p>
          Desde orejas extensibles hasta pociones hilarantes, todo lo que necesitas para vivir la magia... ¡sin romper las reglas (demasiado)!
        </p>
        <h2 className="text-warning fst-italic">
          Recuerda: algunos artículos están prohibidos en Hogwarts… úsalo bajo tu propio riesgo.
        </h2>
        <button
              className="btn btn-warning mt-3"
              onClick={() => setIsOpen(false)}
            >
              🔽 Ver menos
            </button>

          </div>
        )}
      </div>
    </section>
  );
};

export default HomeDescription;