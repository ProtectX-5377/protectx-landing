import { useState } from "react";
import reviews from "./reviews.json";

export default function ReviewsCarousel() {
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 3;

  const totalPages = Math.ceil(reviews.length / pageSize);

  const getVisibleReviews = (page) => {
    const start = page * pageSize;
    const end = start + pageSize;
    return reviews.slice(start, end);
  };

  const handleNext = () => {
    setPageIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setPageIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleReviews = getVisibleReviews(pageIndex);

  // Renderiza estrellas según el puntaje
  const renderStars = (score) => {
    return "⭐".repeat(score);
  };

  return (
    <section className="w-full max-w-4xl mx-auto relative">
  {/* Botón izquierdo */}
  <button
    onClick={handlePrev}
    className="absolute left-[-2rem] top-1/2 -translate-y-1/2 z-10 bg-white shadow-md w-10 h-10 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 hover:scale-110 transition"
  >
    ◀
  </button>

  {/* Botón derecho */}
  <button
    onClick={handleNext}
    className="absolute right-[-2rem] top-1/2 -translate-y-1/2 z-10 bg-white shadow-md w-10 h-10 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 hover:scale-110 transition"
  >
    ▶
  </button>

  {/* Grid de reseñas */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {visibleReviews.map((r) => (
      <article
        key={r.id}
        className="p-6 rounded-2xl shadow bg-white flex flex-col justify-between relative"
      >
        {/* Icono de comillas */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-300 mb-4 mx-auto">
          <div className="text-white">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="icon icon-tabler icons-tabler-filled icon-tabler-quote"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 5a2 2 0 0 1 2 2v6c0 3.13 -1.65 5.193 -4.757 5.97a1 1 0 1 1 -.486 -1.94c2.227 -.557 3.243 -1.827 3.243 -4.03v-1h-3a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-3a2 2 0 0 1 2 -2z" />
              <path d="M18 5a2 2 0 0 1 2 2v6c0 3.13 -1.65 5.193 -4.757 5.97a1 1 0 1 1 -.486 -1.94c2.227 -.557 3.243 -1.827 3.243 -4.03v-1h-3a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-3a2 2 0 0 1 2 -2z" />
            </svg>
          </div>
        </div>

        {/* Estrellas */}
        <div className="mb-3 text-yellow-500 text-lg text-center">
          {renderStars(r.Review)}
        </div>

        {/* Descripción */}
        <p className="text-gray-700 text-center mb-4">“{r.Description}”</p>

        {/* Línea divisoria */}
        <div className="border-t border-gray-300 my-4"></div>

        {/* Datos del revisor */}
        <div className="flex items-center justify-center text-center gap-4 mt-3">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 text-white font-bold text-lg">
            {r.Initials}
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="font-semibold text-base">{r.Reviewer}</div>
            {r.Rol && (
              <div className="text-xs italic text-gray-600">{r.Rol}</div>
            )}

          </div>
        </div>
      </article>
    ))}
  </div>
</section>


  );
}