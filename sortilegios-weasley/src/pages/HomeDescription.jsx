import React from 'react';
import '../styles/HomeDescription.css'; // Asegúrate de crear este archivo CSS

const HomeDescription = () => {
  return (
    <section className="home-description text-light p-4">
      <div className="container">
        <h1 className="mb-3">¡Bienvenido a Sortilegios Weasley!</h1>
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
      </div>
    </section>
  );
};

export default HomeDescription;
