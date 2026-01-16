import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import SessionForm from '../components/Sessions/SessionForm';
import SecretNotes from '../components/Sessions/SecretNotes';
import { sessionService } from '../services/supabase';
import { useAuth } from '../context/AuthContext';

const HistoryPage = ({ campaignId }) => {
  const [sessions, setSessions] = useState([]);
  const [editingSession, setEditingSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isGM } = useAuth();

  useEffect(() => {
    loadSessions();
  }, [campaignId]);

  const loadSessions = async () => {
    try {
      const data = await sessionService.getAll(campaignId);
      setSessions(data);
    } catch (error) {
      console.error('Erreur chargement sessions:', error);
    }
    setLoading(false);
  };

  const handleSave = async (session) => {
    try {
      const sessionData = { ...session, campaign_id: campaignId };
      
      if (editingSession.isNew) {
        const newSession = await sessionService.create(sessionData);
        setSessions([newSession, ...sessions]);
      } else {
        const updated = await sessionService.update(session.id, sessionData);
        setSessions(sessions.map(s => s.id === updated.id ? updated : s));
      }
      setEditingSession(null);
    } catch (error) {
      console.error('Erreur sauvegarde session:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette session ?')) return;
    
    try {
      await sessionService.delete(id);
      setSessions(sessions.filter(s => s.id !== id));
    } catch (error) {
      console.error('Erreur suppression session:', error);
      alert('Erreur lors de la suppression');
    }
  };

  if (loading) {
    return <div className="text-white">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Notes Secrètes du MJ */}
      <SecretNotes campaignId={campaignId} />

      {/* Journal de Campagne */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Journal de Campagne</h2>
          {isGM() && (
            <button
              onClick={() =>
                setEditingSession({
                  isNew: true,
                  date: new Date().toISOString().split('T')[0]
                })
              }
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Nouvelle Session
            </button>
          )}
        </div>

        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{session.title}</h3>
                  <p className="text-indigo-400 text-sm">
                    {new Date(session.date).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                {isGM() && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingSession(session)}
                      className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} className="text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(session.id)}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} className="text-white" />
                    </button>
                  </div>
                )}
              </div>

              {session.map_url && (
                <img
                  src={session.map_url}
                  alt="Carte"
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              )}

              <p className="text-gray-300 whitespace-pre-wrap">{session.notes}</p>
            </div>
          ))}
          {sessions.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              Aucune session enregistrée pour le moment
            </div>
          )}
        </div>
      </div>

      {/* Modal d'édition */}
      {editingSession && (
        <SessionForm
          session={editingSession.isNew ? null : editingSession}
          onSave={handleSave}
          onCancel={() => setEditingSession(null)}
        />
      )}
    </div>
  );
};

export default HistoryPage;