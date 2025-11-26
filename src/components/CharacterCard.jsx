import React, { useState } from "react";

export default function CharacterCard({ character }) {
  const [isOpen, setIsOpen] = useState(false); // pour le modal
  const image =
    character?.images?.jpg?.image_url ?? character?.images?.webp?.image_url ?? "";

  return (
    <>
      <div
        className="bg-white rounded-2xl shadow overflow-hidden flex flex-col cursor-pointer"
        onClick={() => image && setIsOpen(true)} // ouvre le modal au clic
      >
        {image ? (
          <img src={image} alt={character.name} className="w-full h-56 object-cover" />
        ) : (
          <div className="w-full h-56 bg-slate-300 flex items-center justify-center">
            No image
          </div>
        )}
        <div className="p-3 border-t flex flex-col items-center">
          <h3 className="text-center font-medium mb-2">{character.name}</h3>
          {image && (
            <a
              href={image}
              download={`${character.name}.jpg`}
              className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-800 text-sm"
              onClick={(e) => e.stopPropagation()} // pour ne pas ouvrir le modal quand on clique sur le bouton
            >
              Télécharger
            </a>
          )}
        </div>
      </div>

      {/* Modal pour afficher l'image */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)} // ferme le modal au clic en dehors
        >
          <img
            src={image}
            alt={character.name}
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // empêche la fermeture si on clique sur l'image
          />
        </div>
      )}
    </>
  );
}
