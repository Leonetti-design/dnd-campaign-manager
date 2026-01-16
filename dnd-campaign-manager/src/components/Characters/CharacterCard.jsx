import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const CharacterCard = ({ character, onEdit, onDelete, canEdit }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:shadow-xl transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{character.name}</h3>
          <p className="text-indigo-400 text-sm">
            {character.class} - Niveau {character.level}
          </p>
        </div>
        {canEdit && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(character)}
              className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              <Edit2 size={16} className="text-white" />
            </button>
            <button
              onClick={() => onDelete(character.id)}
              className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <Trash2 size={16} className="text-white" />
            </button>
          </div>
        )}
      </div>

      {character.image && (
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-gray-900 rounded-lg p-3">
          <p className="text-gray-400 text-xs">PV</p>
          <p className="text-white font-bold text-lg">{character.hp}</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-3">
          <p className="text-gray-400 text-xs">CA</p>
          <p className="text-white font-bold text-lg">{character.ac}</p>
        </div>
        <div className="bg-gray-900 rounded-lg p-3">
          <p className="text-gray-400 text-xs">Init</p>
          <p className="text-white font-bold text-lg">{character.initiative}</p>
        </div>
      </div>

      {character.description && (
        <p className="text-gray-400 text-sm mb-3">{character.description}</p>
      )}

      {character.equipment && character.equipment.length > 0 && (
        <div className="mt-4">
          <p className="text-gray-400 text-xs mb-2">Équipement:</p>
          <div className="flex flex-wrap gap-2">
            {character.equipment.map((item, idx) => (
              <span
                key={idx}
                className="bg-gray-900 text-gray-300 px-2 py-1 rounded text-xs"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterCard;