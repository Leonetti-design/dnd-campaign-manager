import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const storedUser = localStorage.getItem('dnd_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const loginAsGM = (password) => {
    if (password === process.env.REACT_APP_GM_PASSWORD) {
      const gmUser = { role: 'gm', name: 'Maître du Jeu' };
      setUser(gmUser);
      localStorage.setItem('dnd_user', JSON.stringify(gmUser));
      return true;
    }
    return false;
  };

  const loginAsPlayer = () => {
    const playerUser = { role: 'player', name: 'Joueur' };
    setUser(playerUser);
    localStorage.setItem('dnd_user', JSON.stringify(playerUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dnd_user');
  };

  const isGM = () => user?.role === 'gm';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginAsGM,
        loginAsPlayer,
        logout,
        isGM
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};