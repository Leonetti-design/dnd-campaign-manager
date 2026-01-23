import React, { useState } from 'react';

const SessionForm = ({ session, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    session || {
      title: '',
      date: new Date().toISOString().split('T')[0],
      mapUrl: '',
      notes: ''
    }
  );

  const handleSubmit = () => {
    onSave({ ...formData, id: session?.id || Date.now() });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full my-8">
        <h2 className="text-2xl font-bold text-white mb-6">
          {session ? 'Modifier' : 'Nouvelle'} Session
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Titre de la session</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-gray-900 text-white rounded-lg px-4 py-2 border border-gray-700 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-gray-900 text-white rounded-lg px-4 py-2 border border-gray-700 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">URL Carte</label>
            <input
              type="text"
              value={formData.mapUrl}
              onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
              className="w-full bg-gray-900 text-white rounded-lg px-4 py-2 border border-gray-700 focus:border-indigo-500 focus:outline-none"
              placeholder="https://..."
            />