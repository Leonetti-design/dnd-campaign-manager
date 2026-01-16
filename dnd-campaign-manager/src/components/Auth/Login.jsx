import React, { useState } from 'react';
import { Lock, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginAsGM, loginAsPlayer } = useAuth();

  const handleGMLogin = (e) => {
    e.preventDefault();
    const success = loginAsGM(password);
    if (!success) {
      setError('Mot de passe incorrect');
      setPassword('');
    }
  };

  const handlePlayerLogin = () => {
    loginAsPlayer();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-3">⚔️ D&D Manager</h1>
          <p className="text-gray-400 text-lg">Bienvenue dans votre gestionnaire de campagne</p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700 space-y-6">
          {/* Connexion MJ */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="text-white" size={24} />
              <h2 className="text-xl font-bold text-white">Je suis Maître du Jeu</h2>
            </div>
            <form onSubmit={handleGMLogin} className="space-y-3">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Mot de passe"
                className="w-full bg-white bg-opacity-20 text-white placeholder-gray-300 rounded-lg px-4 py-3 border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white"
              />
              {error && <p className="text-red-300 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-white text-indigo-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Connexion MJ
              </button>
            </form>
          </div>

          {/* Séparateur */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-800 text-gray-400">ou</span>
            </div>
          </div>

          {/* Connexion Joueur */}
          <div className="bg-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-gray-300" size={24} />
              <h2 className="text-xl font-bold text-white">Non, je ne suis qu'un joueur</h2>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              En tant que joueur, vous pouvez consulter toutes les informations de la campagne.
            </p>
            <button
              onClick={handlePlayerLogin}
              className="w-full bg-gray-600 text-white font-semibold py-3 rounded-lg hover:bg-gray-500 transition-colors"
            >
              Accéder en lecture seule
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Les joueurs peuvent tout voir • Le MJ peut tout modifier
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;