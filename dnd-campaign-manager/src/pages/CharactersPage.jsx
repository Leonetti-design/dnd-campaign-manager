import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import CharacterCard from '../components/Characters/CharacterCard';
import CharacterForm from '../components/Characters/CharacterForm';
import { characterService } from '../services/supabase';
import { useAuth } from '../context/AuthContext';

const CharactersPage = ({ campaignId }) => {
  const [playerCharacters, setPlayerCharacters] = useState([]);
  const [npcs, setNpcs] = useState([]);
  const [editingCharacter, setEditingCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isGM } = useAuth();

  useEffect(() => {
    loadCharacters();
  }, [campaignId]);

  const loadCharacters = async () => {
    try {
      const [pcs, npcList] = await Promise.all([
        characterService.getAll(campaignId, false),
        characterService.getAll(campaignId, true)
      ]);
      setPlayerCharacters(pcs);
      setNpcs(npcList);
    } catch (error) {
      console.error('Erreur chargement personnages:', error);
    }
    setLoading(false);
  };

  const handleSave = async (character) => {
    try {
      const characterData = {
        ...character,
        campaign_id: campaignId,
        is_npc: editingCharacter.isNPC
      };

      if (editingCharacter.isNew) {
        const newChar = await characterService.create(characterData);
        if (editingCharacter.isNPC) {
          setNpcs([...npcs, newChar]);
        } else {
          setPlayerCharacters([...playerCharacters, newChar]);
        }
      } else {
        const updated = await characterService.update(character.id, characterData);
        if (editingCharacter.isNPC) {
          setNpcs(npcs.map(c => c.id === updated.id ? updated : c));
        } else {
          setPlayerCharacters(playerCharacters.map(c => c.id === updated.id ? updated : c));
        }
      }
      setEditingCharacter(null);
    } catch (error) {
      console.error('Erreur sauvegarde personnage:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id, isNPC) => {
    if (!window.confirm('Supprimer ce personnage ?')) return;
    
    try {
      await characterService.delete(id);
      if (isNPC) {
        setNpcs(npcs.filter(c => c.id !== id));
      } else {
        setPlayerCharacters(playerCharacters.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error('Erreur suppression personnage:', error);
      alert('Erreur lors de la suppression');
    }
  };

  if (loading) {
    return <div className="text-white">Chargement...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Personnages Jouables */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Personnages Jouables</h2>
          {isGM() && (
            <button
              onClick={() => setEditingCharacter({ isNew: true, isNPC: false })}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Ajouter
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {playerCharacters.map((char) => (
            <CharacterCard
              key={char.id}
              character={char}
              onEdit={(c) => setEditingCharacter({ ...c, isNPC: false })}
              onDelete={(id) => handleDelete(id, false)}
              canEdit={isGM()}
            />
          ))}
          {playerCharacters.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-8">
              Aucun personnage jouable pour le moment
            </div>
          )}
        </div>
      </div>

      {/* PNJ */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Personnages Non-Jouables (PNJ)</h2>
          {isGM() && (
            <button
              onClick={() => setEditingCharacter({ isNew: true, isNPC: true })}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Ajouter
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {npcs.map((char) => (
            <CharacterCard
              key={char.id}
              character={char}
              onEdit={(c) => setEditingCharacter({ ...c, isNPC: true })}
              onDelete={(id) => handleDelete(id, true)}
              canEdit={isGM()}
            />
          ))}
          {npcs.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-8">
              Aucun PNJ pour le moment
            </div>
          )}
        </div>
      </div>

      {/* Modal d'édition */}
      {editingCharacter && (
        <CharacterForm
          character={editingCharacter.isNew ? null : editingCharacter}
          isNPC={editingCharacter.isNPC}
          onSave={handleSave}
          onCancel={() => setEditingCharacter(null)}
        />
      )}
    </div>
  );
};

export default CharactersPage;