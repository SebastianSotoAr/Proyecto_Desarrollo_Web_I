import React from 'react';
import '../styles/TermsModal.css';

const TermsModal = ({ forceOpen, onClose }) => {
  if (!forceOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content scrollable">
        <h2>Términos y Condiciones</h2>
        <p>Este sitio está destinado a la venta ficticia de productos mágicos. Al acceder, aceptas no usar estos productos para fines oscuros 🧙‍♂️.</p>
        <p>Los datos ingresados son de prueba y no se almacenan.</p>
        <p>Los precios en galeones no representan valor real.</p>

        <h2>🔄 Políticas de Devolución</h2>
        <p>En Sortilegios Weasley, queremos que cada producto provoque carcajadas, desmayos (consentidos), y alguna que otra mordida ocasional. Pero si algo salió mal, aquí te dejamos nuestras condiciones de devolución:</p>

        <h3>🧾 Condiciones Generales de Devolución</h3>
        <ul>
          <li>Aceptamos devoluciones dentro de los 14 días posteriores a la compra.</li>
          <li>Los artículos deben estar sin usar, sin activar y, muy importante: sin efectos secundarios en curso.</li>
          <li>No devolvemos productos que hayan causado accidentes mágicos por mal uso.</li>
        </ul>

        <h3>🎉 Productos con Condiciones Especiales</h3>
        <p><strong>🍬 Bombones Desmayo (1 galeón/unidad):</strong> No se aceptan devoluciones de unidades parcialmente consumidas. Se requiere asistencia para evitar desmayos prolongados.</p>

        <p><strong>🕵️ Caramelos de la Verdad (10 sickles/unidad):</strong> No se aceptan devoluciones por verdades dolorosas ni por relaciones arruinadas.</p>

        <p><strong>💘 Pociones de Amor:</strong> No se hacen devoluciones por amor no correspondido ni efectos inesperados. No aceptamos frascos vacíos usados como perfume.</p>

        <p><strong>📚 Libro Mordedor (5 galeones/unidad):</strong> No se aceptan devoluciones por mordidas leves. Se requiere el libro y el trozo de nariz para procesar devolución.</p>

        <p>🎁 Artículos defectuosos serán reemplazados por uno igual o similar (puede tener mejoras mágicas inesperadas).</p>
        <p>📜 Para iniciar una devolución, contacta al Departamento de Travesuras No Intencionales usando nuestro formulario encantado.</p>

        <h2>🔐 Política de Privacidad</h2>
        <p>En Sortilegios Weasley, tomamos en serio tu privacidad… bueno, tan en serio como se puede sin dejar de hacer bromas.</p>

        <h3>🧠 ¿Qué recopilamos?</h3>
        <ul>
          <li>Tu nombre (real o mágico)</li>
          <li>Dirección mágica o muggle</li>
          <li>Correos y mensajes (especialmente si incluyen chistes)</li>
          <li>Información técnica para mejorar nuestra tienda mágica digital</li>
        </ul>

        <h3>🔒 ¿Cómo usamos tu información?</h3>
        <ul>
          <li>Para enviarte tu pedido sin que se teletransporte al baño de los Merodeadores</li>
          <li>Para avisarte de nuestras nuevas invenciones</li>
          <li>Para protegerte de magos oscuros con malas intenciones digitales</li>
        </ul>

        <h3>🚫 Lo que nunca haremos:</h3>
        <p>No vendemos, compartimos ni intercambiamos tu información con terceros (ni con el Ministerio de Magia, a menos que nos lancen veritaserum).</p>

        <h3>✨ Seguridad mágica:</h3>
        <p>Hemos encantado nuestros servidores con hechizos de protección, runas de confidencialidad y al menos tres encantamientos Confundus… solo para despistar a los hackers.</p>

        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default TermsModal;
