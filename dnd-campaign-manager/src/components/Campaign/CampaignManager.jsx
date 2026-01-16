import React, { useState } from 'react';
import { Edit2, Trash2, Plus, Save, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CampaignManager = ({ campaigns, onUpdate, onDelete, onCreate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const { isGM } = useAuth();

  const handleEdit = (campaign) => {
    setEditingId(campaign.id);
    setEditName(campaign.name);
  };

  const handleSaveEdit = async (id) => {
    await onUpdate(id, editName);
    setEditingId(null);
  };

  const handleCreate = async () => {
    if (newName.trim()) {
      await onCreate(newName);
      setNewName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestion des Campagnes</h2>
        {isGM() && (
          <button
            onClick={() => setIsCreating(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} />
            Nouvelle campagne
          </button>
        )}
      </div>

      {isCreating && (
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nom de la campagne"
              className="flex-1 bg-gray-900 text-white rounded-lg px-4 py-2 border border-gray-700"
              autoFocus
            />
            <button
              onClick={handleCreate}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              <Save size={20} />
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                setNewName('');
              }}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-gray-800 rounded-xl p-4 border border-gray-700 flex justify-between items-center"
          >
            {editingId === campaign.id ? (
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 bg-gray-900 text-white rounded-lg px-4 py-2 border border-gray-700"
                  autoFocus
                />
                <button
                  onClick={() => handleSaveEdit(campaign.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  <Save size={20} />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <>
                <div>
                  <h3 className="text-white font-bold text-lg">{campaign.name}</h3>
                  <p className="text-gray-400 text-sm">
                    Créée le {new Date(campaign.created_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                {isGM() && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(campaign)}
                      className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                    >
                      <Edit2 size={16} className="text-white" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Supprimer cette campagne ?')) {
                          onDelete(campaign.id);
                        }
                      }}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg"
                    >
                      <Trash2 size={16} className="text-white" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignManager;