import React, { useState, useEffect } from 'react';
import { Lock, Save } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { useAuth } from '../../context/AuthContext';

const SecretNotes = ({ campaignId }) => {
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const { isGM } = useAuth();

  useEffect(() => {
    loadNotes();
  }, [campaignId]);

  const loadNotes = async () => {
    const { data, error } = await supabase
      .from('campaigns')
      .select('secret_notes')
      .eq('id', campaignId)
      .single();
    
    if (!error && data) {
      setNotes(data.secret_notes || '');
    }
    setLoading(false);
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from('campaigns')
      .update({ secret_notes: notes })
      .eq('id', campaignId);
    
    if (!error) {
      alert('Notes secrètes sauvegardées !');
    }
  };

  if (!isGM()) {
    return null; // Les joueurs ne voient pas cette section
  }

  if (loading) {
    return <div className="text-gray-400">Chargement...</div>;
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-yellow-600 border-opacity-50">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-yellow-600 bg-opacity-20 rounded-lg">
          <svg
            className="w-6 h-6 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-yellow-500">Notes Secrètes du MJ</h3>
          <p className="text-gray-400 text-sm">Visible uniquement par le Maître du Jeu</p>
        </div>
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={10}
        placeholder="Préparez vos futures sessions ici... Intrigues, surprises, rencontres à venir..."
        className="w-full bg-gray-900 text-white rounded-lg px-4 py-3 border border-gray-700 focus:border-yellow-500 focus:outline-none mb-4"
      />

      <button
        onClick={handleSave}
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-semibold"
      >
        <Save size={20} />
        Sauvegarder les notes secrètes
      </button>
    </div>
  );
};

export default SecretNotes;