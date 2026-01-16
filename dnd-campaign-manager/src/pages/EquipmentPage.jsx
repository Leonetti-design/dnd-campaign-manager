import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import EquipmentForm from '../components/Equipment/EquipmentForm';
import { equipmentService, goldService } from '../services/supabase';
import { useAuth } from '../context/AuthContext';

const EquipmentPage = ({ campaignId }) => {
  const [equipment, setEquipment] = useState([]);
  const [gold, setGold] = useState(0);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isGM } = useAuth();

  useEffect(() => {
    loadData();
  }, [campaignId]);

  const loadData = async () => {
    try {
      const [equipData, goldAmount] = await Promise.all([
        equipmentService.getAll(campaignId),
        goldService.get(campaignId)
      ]);
      setEquipment(equipData);
      setGold(goldAmount);
    } catch (error) {
      console.error('Erreur chargement équipement:', error);
    }
    setLoading(false);
  };

  const handleGoldChange = async (newGold) => {
    try {
      await goldService.update(campaignId, newGold);
      setGold(newGold);
    } catch (error) {
      console.error('Erreur mise à jour or:', error);
    }
  };

  const handleSave = async (item) => {
    try {
      const itemData = { ...item, campaign_id: campaignId };
      
      if (editingEquipment.isNew) {
        const newItem = await equipmentService.create(itemData);
        setEquipment([...equipment, newItem]);
      } else {
        const updated = await equipmentService.update(item.id, itemData);
        setEquipment(equipment.map(e => e.id === updated.id ? updated : e));
      }
      setEditingEquipment(null);
    } catch (error) {
      console.error('Erreur sauvegarde équipement:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet équipement ?')) return;
    
    try {
      await equipmentService.delete(id);
      setEquipment(equipment.filter(e => e.id !== id));
    } catch (error) {
      console.error('Erreur suppression équipement:', error);
      alert('Erreur lors de la suppression');
    }
  };

  if (loading) {
    return <div className="text-white">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Trésor du Groupe */}
      <div className="bg-gradient-to-r from-yellow-600 to-amber-600 rounded-xl p-6 shadow-lg">
        <h3 className="text-white text-lg font-semibold mb-4">Trésor du Groupe</h3>
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={gold}
            onChange={(e) => handleGoldChange(parseInt(e.target.value) || 0)}
            disabled={!isGM()}
            className={`flex-1 bg-yellow-700 bg-opacity-30 text-white rounded-lg px-4 py-3 text-2xl font-bold border-2 border-yellow-400 focus:outline-none ${
              !isGM() ? 'cursor-not-allowed opacity-75' : ''
            }`}
          />
          <span className="text-white text-2xl font-bold">PO</span>
        </div>
        {!isGM() && (
          <p className="text-yellow-200 text-sm mt-2">
            Seul le MJ peut modifier l'or du groupe
          </p>
        )}
      </div>

      {/* Équipement */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Équipement du Groupe</h2>
          {isGM() && (
            <button
              onClick={() => setEditingEquipment({ isNew: true })}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Ajouter
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipment.map((item) => (
            <div key={item.id} className="bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-white font-bold text-lg">{item.name}</h3>
                {isGM() && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingEquipment(item)}
                      className="p-1 bg-indigo-600 hover:bg-indigo-700 rounded transition-colors"
                    >
                      <Edit2 size={14} className="text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1 bg-red-600 hover:bg-red-700 rounded transition-colors"
                    >
                      <Trash2 size={14} className="text-white" />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-gray-400 text-sm mb-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-indigo-400 font-semibold">Quantité: {item.quantity}</span>
              </div>
            </div>
          ))}
          {equipment.length === 0 && (
            <div className="col-span-full text-center text-gray-400 py-8">
              Aucun équipement pour le moment
            </div>
          )}
        </div>
      </div>

      {/* Modal d'édition */}
      {editingEquipment && (
        <EquipmentForm
          equipment={editingEquipment.isNew ? null : editingEquipment}
          onSave={handleSave}
          onCancel={() => setEditingEquipment(null)}
        />
      )}
    </div>
  );
};

export default EquipmentPage;