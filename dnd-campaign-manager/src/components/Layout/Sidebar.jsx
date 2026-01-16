import React from 'react';
import { Menu, Users, Package, BookOpen, Settings, LogOut } from 'lucide-react';

const Sidebar = ({
  selectedCampaign,
  currentView,
  setCurrentView,
  mobileMenuOpen,
  setMobileMenuOpen,
  onBackToCampaigns,
  onManageCampaigns,
  onLogout,
  isGM
}) => {
  return (
    <>
      <div className="lg:hidden bg-gray-800 border-b border-gray-700 p-4 fixed top-0 left-0 right-0 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white flex items-center gap-2"
        >
          <Menu size={24} />
          <span className="font-semibold">{selectedCampaign.name}</span>
        </button>
      </div>

      <aside
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } lg:block fixed top-0 left-0 h-screen w-64 bg-gray-900 border-r border-gray-800 p-6 z-40 overflow-y-auto lg:mt-0 mt-16`}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-1">{selectedCampaign.name}</h2>
          <button
            onClick={onBackToCampaigns}
            className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors"
          >
            ← Changer de campagne
          </button>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => {
              setCurrentView('characters');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentView === 'characters'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Users size={20} />
            <span className="font-medium">Personnages</span>
          </button>

          <button
            onClick={() => {
              setCurrentView('equipment');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentView === 'equipment'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <Package size={20} />
            <span className="font-medium">Équipement</span>
          </button>

          <button
            onClick={() => {
              setCurrentView('history');
              setMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentView === 'history'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <BookOpen size={20} />
            <span className="font-medium">Journal</span>
          </button>
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-800 space-y-2">
          {isGM && (
            <button
              onClick={() => {
                onManageCampaigns();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-all"
            >
              <Settings size={20} />
              <span className="font-medium">Gérer campagnes</span>
            </button>
          )}

          <button
            onClick={() => {
              onLogout();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-gray-800 transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>

      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 mt-16"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;