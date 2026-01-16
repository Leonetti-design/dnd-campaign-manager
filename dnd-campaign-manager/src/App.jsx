import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Auth/Login';
import CampaignSelector from './components/Campaign/CampaignSelector';
import CampaignManager from './components/Campaign/CampaignManager';
import Sidebar from './components/Layout/Sidebar';
import CharactersPage from './pages/CharactersPage';
import EquipmentPage from './pages/EquipmentPage';
import HistoryPage from './pages/HistoryPage';
import { campaignService } from './services/supabase';
import { LogOut } from 'lucide-react';

const AppContent = () => {
  const { user, logout, isGM } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [currentView, setCurrentView] = useState('characters');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCampaignManager, setShowCampaignManager] = useState(false);

  useEffect(() => {
    if (user) {
      loadCampaigns();
    }
  }, [user]);

  const loadCampaigns = async () => {
    try {
      const data = await campaignService.getAll();
      setCampaigns(data);
    } catch (error) {
      console.error('Erreur chargement campagnes:', error);
    }
  };

  const handleCreateCampaign = async (name) => {
    try {
      const newCampaign = await campaignService.create(name);
      setCampaigns([newCampaign, ...campaigns]);
    } catch (error) {
      console.error('Erreur création campagne:', error);
    }
  };

  const handleUpdateCampaign = async (id, name) => {
    try {
      await campaignService.update(id, name);
      setCampaigns(campaigns.map(c => c.id === id ? { ...c, name } : c));
    } catch (error) {
      console.error('Erreur mise à jour campagne:', error);
    }
  };

  const handleDeleteCampaign = async (id) => {
    try {
      await campaignService.delete(id);
      setCampaigns(campaigns.filter(c => c.id !== id));
      if (selectedCampaign?.id === id) {
        setSelectedCampaign(null);
      }
    } catch (error) {
      console.error('Erreur suppression campagne:', error);
    }
  };

  if (!user) {
    return <Login />;
  }

  if (showCampaignManager) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <button
              onClick={() => setShowCampaignManager(false)}
              className="text-indigo-400 hover:text-indigo-300"
            >
              ← Retour
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-gray-400 hover:text-white"
            >
              <LogOut size={20} />
              Déconnexion
            </button>
          </div>
          <CampaignManager
            campaigns={campaigns}
            onCreate={handleCreateCampaign}
            onUpdate={handleUpdateCampaign}
            onDelete={handleDeleteCampaign}
          />
        </div>
      </div>
    );
  }

  if (!selectedCampaign) {
    return (
      <CampaignSelector
        campaigns={campaigns}
        onSelectCampaign={setSelectedCampaign}
        onManageCampaigns={() => setShowCampaignManager(true)}
        onLogout={logout}
        isGM={isGM()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Sidebar
        selectedCampaign={selectedCampaign}
        currentView={currentView}
        setCurrentView={setCurrentView}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onBackToCampaigns={() => setSelectedCampaign(null)}
        onManageCampaigns={() => setShowCampaignManager(true)}
        onLogout={logout}
        isGM={isGM()}
      />

      <main className="lg:ml-64 p-6 lg:p-8">
        {currentView === 'characters' && <CharactersPage campaignId={selectedCampaign.id} />}
        {currentView === 'equipment' && <EquipmentPage campaignId={selectedCampaign.id} />}
        {currentView === 'history' && <HistoryPage campaignId={selectedCampaign.id} />}
      </main>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;