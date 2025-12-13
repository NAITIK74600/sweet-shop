import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { sweetService, Sweet, CreateSweetData } from '../api/sweets';
import SweetCard from '../components/SweetCard';
import SweetForm from '../components/SweetForm';
import SearchBar from '../components/SearchBar';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { isAdmin } = useAuth();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);

  const loadSweets = async () => {
    try {
      setLoading(true);
      const data = await sweetService.getAll();
      setSweets(data);
      setError('');
    } catch (err: any) {
      setError('Failed to load sweets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSweets();
  }, []);

  const handleSearch = async (searchParams: any) => {
    try {
      setLoading(true);
      const data = await sweetService.search(searchParams);
      setSweets(data);
      setError('');
    } catch (err: any) {
      setError('Failed to search sweets');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSweet = async (data: CreateSweetData) => {
    try {
      await sweetService.create(data);
      await loadSweets();
      setShowForm(false);
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to create sweet');
    }
  };

  const handleUpdateSweet = async (id: number, data: Partial<CreateSweetData>) => {
    try {
      await sweetService.update(id, data);
      await loadSweets();
      setEditingSweet(null);
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to update sweet');
    }
  };

  const handleDeleteSweet = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) {
      return;
    }

    try {
      await sweetService.delete(id);
      await loadSweets();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete sweet');
    }
  };

  const handlePurchase = async (id: number, quantity: number) => {
    try {
      await sweetService.purchase(id, quantity);
      await loadSweets();
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to purchase sweet');
    }
  };

  const handleRestock = async (id: number, quantity: number) => {
    try {
      await sweetService.restock(id, quantity);
      await loadSweets();
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to restock sweet');
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Sweet Shop Dashboard</h1>
        {isAdmin && (
          <button
            className="add-button"
            onClick={() => {
              setShowForm(true);
              setEditingSweet(null);
            }}
          >
            + Add New Sweet
          </button>
        )}
      </div>

      <SearchBar onSearch={handleSearch} onReset={loadSweets} />

      {error && <div className="error-banner">{error}</div>}

      {(showForm || editingSweet) && (
        <SweetForm
          sweet={editingSweet}
          onSubmit={editingSweet ? (data) => handleUpdateSweet(editingSweet.id, data) : handleCreateSweet}
          onCancel={() => {
            setShowForm(false);
            setEditingSweet(null);
          }}
        />
      )}

      {loading ? (
        <div className="loading">Loading sweets...</div>
      ) : sweets.length === 0 ? (
        <div className="no-sweets">
          <p>No sweets found. {isAdmin && 'Add some sweets to get started!'}</p>
        </div>
      ) : (
        <div className="sweets-grid">
          {sweets.map((sweet) => (
            <SweetCard
              key={sweet.id}
              sweet={sweet}
              onEdit={isAdmin ? () => setEditingSweet(sweet) : undefined}
              onDelete={isAdmin ? () => handleDeleteSweet(sweet.id) : undefined}
              onPurchase={handlePurchase}
              onRestock={isAdmin ? handleRestock : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
