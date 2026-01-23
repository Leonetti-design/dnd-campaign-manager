import React, { useState } from 'react';

const EquipmentForm = ({ equipment, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    equipment || { name: '', description: '', quantity: 1 }
  );

  const handleSubmit = () => {
    onSave({ ...formData, id: equipment?.id || Date.now() });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-6">
          {equipment ? 'Modifier' : 'Nouvel'} Équipement
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Nom</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-900 text-white rounded-lg px-4 py-2 border border-gray-700 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full bg-gray-900 text-white rounded-lg px-4 py-2 border border-gray-700 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Quantité</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })
              }
              className="w-full bg-gray-900 text-white rounded-lg px-4 py-2 border border-gray-700 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Enregistrer
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentForm;