import React from 'react';
import { Plus, Settings, LogOut } from 'lucide-react';

const CampaignSelector = ({ campaigns, onSelectCampaign, onManageCampaigns, onLogout, isGM }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Gestionnaire de Campagne D&D
            </h1>
            <p className="text-gray-400">Sélectionnez une campagne pour commencer</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>

        {isGM && (
          <div className="mb-6">
            <button
              onClick={onManageCampaigns}
              className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <Settings size={20} />
              Gérer les campagnes
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {campaigns.map((campaign) => (
            <button
              key={campaign.id}
              onClick={() => onSelectCampaign(campaign)}
              className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-left hover:shadow-2xl transition-all transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-bold text-white mb-2">{campaign.name}</h3>
              <p className="text-indigo-200 text-sm">
                Créée le {new Date(campaign.created_at).toLocaleDateString('fr-FR')}
              </p>
            </button>
          ))}

          {campaigns.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-12">
              {isGM 
                ? "Aucune campagne pour le moment. Cliquez sur 'Gérer les campagnes' pour en créer une."
                : "Aucune campagne disponible pour le moment."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignSelector;